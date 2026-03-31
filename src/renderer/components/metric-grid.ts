/**
 * Metric Grid Component Renderer
 */

import { MetricGridComponent, MetricItem } from '../../types/viewspec.js';
import { RenderContext, ComponentRenderPlan } from '../types.js';
import { div, escapeHtml, classList } from '../html-utils.js';

/**
 * Render a single metric item
 */
function renderMetricItem(item: MetricItem): string {
  const emphasisClass = item.emphasis ? `metric-emphasis-${item.emphasis}` : '';
  
  const trendHtml = item.trend
    ? div(
        {
          class: `metric-trend metric-trend-${item.trend.direction}`,
          'aria-label': `Trend: ${item.trend.direction}`,
        },
        `
          <span class="metric-trend-indicator">${getTrendSymbol(item.trend.direction)}</span>
          ${item.trend.value !== undefined ? `<span class="metric-trend-value">${escapeHtml(String(item.trend.value))}</span>` : ''}
          ${item.trend.label ? `<span class="metric-trend-label">${escapeHtml(item.trend.label)}</span>` : ''}
        `.trim(),
      )
    : '';

  return div(
    {
      class: classList('metric-item', emphasisClass),
      role: 'article',
      'aria-label': `Metric: ${item.label}`,
    },
    `
      <div class="metric-label">${escapeHtml(item.label)}</div>
      <div class="metric-value">
        ${escapeHtml(String(item.value))}
        ${item.unit ? `<span class="metric-unit">${escapeHtml(item.unit)}</span>` : ''}
      </div>
      ${trendHtml}
    `.trim(),
  );
}

/**
 * Get trend symbol
 */
function getTrendSymbol(direction: 'up' | 'down' | 'neutral'): string {
  switch (direction) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    case 'neutral':
      return '→';
  }
}

/**
 * Render metric grid component
 */
export function renderMetricGrid(
  component: MetricGridComponent,
  _context: RenderContext,
): ComponentRenderPlan {
  const columns = component.columns || Math.min(component.items.length, 4);
  const itemsHtml = component.items.map(renderMetricItem).join('\n');

  const title = component.title
    ? `<h3 class="adaptiveui-component-title">${escapeHtml(component.title)}</h3>`
    : '';

  const html = div(
    {
      class: 'adaptiveui-component',
      'data-component': 'metric-grid',
    },
    `
      ${title}
      <div class="metric-grid metric-grid-${columns}-col">
        ${itemsHtml}
      </div>
    `.trim(),
  );

  return {
    type: 'metric-grid',
    component,
    html,
    classes: ['metric-grid', `metric-grid-${columns}-col`],
    dataAttributes: {
      component: 'metric-grid',
      columns: String(columns),
    },
  };
}
