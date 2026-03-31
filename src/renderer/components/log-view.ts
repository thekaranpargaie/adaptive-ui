/**
 * Log View Component Renderer
 */

import { LogViewComponent, LogEntry } from '../../types/viewspec.js';
import { RenderContext, ComponentRenderPlan } from '../types.js';
import { div, escapeHtml } from '../html-utils.js';

/**
 * Render a single log entry
 */
function renderLogEntry(
  entry: LogEntry,
  showTimestamp: boolean,
  showSource: boolean,
): string {
  return div(
    {
      class: 'log-entry',
      'data-level': entry.level,
    },
    `
      ${showTimestamp ? `<span class="log-timestamp">${escapeHtml(entry.timestamp)}</span>` : ''}
      <span class="log-level log-level-${entry.level}">${entry.level.toUpperCase()}</span>
      ${showSource && entry.source ? `<span class="log-source">${escapeHtml(entry.source)}</span>` : ''}
      <span class="log-message">${escapeHtml(entry.message)}</span>
    `.trim(),
  );
}

/**
 * Render log view component
 */
export function renderLogView(
  component: LogViewComponent,
  _context: RenderContext,
): ComponentRenderPlan {
  const showTimestamp = component.showTimestamp !== false;
  const showSource = component.showSource !== false;
  const entries = component.maxEntries
    ? component.entries.slice(0, component.maxEntries)
    : component.entries;

  const entriesHtml = entries
    .map((entry) => renderLogEntry(entry, showTimestamp, showSource))
    .join('\n');

  const title = component.title
    ? `<h3 class="adaptiveui-component-title">${escapeHtml(component.title)}</h3>`
    : '';

  const html = div(
    {
      class: 'adaptiveui-component',
      'data-component': 'log-view',
    },
    `
      ${title}
      <div class="log-view" role="log" aria-label="${component.title || 'Log entries'}">
        ${entriesHtml}
      </div>
    `.trim(),
  );

  return {
    type: 'log-view',
    component,
    html,
    classes: ['log-view'],
    dataAttributes: {
      component: 'log-view',
      entries: String(entries.length),
    },
  };
}
