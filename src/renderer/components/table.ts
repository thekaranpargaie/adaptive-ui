/**
 * Table Component Renderer
 */

import { TableComponent, TableColumn, TableRow } from '../../types/viewspec.js';
import { RenderContext, ComponentRenderPlan } from '../types.js';
import { div, table, element, escapeHtml, classList } from '../html-utils.js';

/**
 * Render table header
 */
function renderTableHeader(columns: TableColumn[]): string {
  const ths = columns
    .map((col) => {
      const alignClass = col.align ? `table-align-${col.align}` : '';
      const style = col.width ? `width: ${col.width}` : undefined;
      
      return element(
        'th',
        {
          class: alignClass,
          style,
          'data-key': col.key,
          'data-sortable': col.sortable || false,
        },
        escapeHtml(col.label),
      );
    })
    .join('\n      ');

  return `
    <thead>
      <tr>
        ${ths}
      </tr>
    </thead>
  `.trim();
}

/**
 * Format cell value based on column type
 */
function formatCellValue(value: unknown, type?: string): string {
  if (value === null || value === undefined) {
    return '';
  }

  switch (type) {
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : String(value);
    case 'date':
      return typeof value === 'string' || value instanceof Date
        ? new Date(value).toLocaleDateString()
        : String(value);
    case 'boolean':
      return value ? '✓' : '✗';
    default:
      return escapeHtml(String(value));
  }
}

/**
 * Render table body
 */
function renderTableBody(columns: TableColumn[], rows: TableRow[]): string {
  const trs = rows
    .map((row) => {
      const tds = columns
        .map((col) => {
          const value = row[col.key];
          const formattedValue = formatCellValue(value, col.type);
          const alignClass = col.align ? `table-align-${col.align}` : '';

          return element(
            'td',
            {
              class: alignClass,
              'data-key': col.key,
            },
            formattedValue,
          );
        })
        .join('\n        ');

      return `
        <tr>
          ${tds}
        </tr>
      `.trim();
    })
    .join('\n      ');

  return `
    <tbody>
      ${trs}
    </tbody>
  `.trim();
}

/**
 * Render table component
 */
export function renderTable(
  component: TableComponent,
  _context: RenderContext,
): ComponentRenderPlan {
  const classes = [
    'adaptiveui-table',
    component.striped && 'adaptiveui-table-striped',
    component.hover && 'adaptiveui-table-hover',
    component.compact && 'adaptiveui-table-compact',
  ].filter((c): c is string => typeof c === 'string');

  const tableHtml = table(
    {
      class: classList(...classes),
      role: 'table',
      'aria-label': component.title || 'Data table',
    },
    `
      ${component.showHeader !== false ? renderTableHeader(component.columns) : ''}
      ${renderTableBody(component.columns, component.rows)}
    `.trim(),
  );

  const title = component.title
    ? `<h3 class="adaptiveui-component-title">${escapeHtml(component.title)}</h3>`
    : '';

  const html = div(
    {
      class: 'adaptiveui-component',
      'data-component': 'table',
    },
    `
      ${title}
      ${tableHtml}
    `.trim(),
  );

  return {
    type: 'table',
    component,
    html,
    classes,
    dataAttributes: {
      component: 'table',
      rows: String(component.rows.length),
      columns: String(component.columns.length),
    },
  };
}
