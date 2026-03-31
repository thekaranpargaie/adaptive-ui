/**
 * Timeline Component Renderer
 */

import type { TimelineComponent, TimelineEvent } from '../../types/viewspec.js';
import type { RenderContext, ComponentRenderPlan } from '../types.js';
import { div, escapeHtml, classList } from '../html-utils.js';

/**
 * Render a single timeline event
 */
function renderTimelineEvent(event: TimelineEvent): string {
  const classes = [
    'timeline-event',
    event.milestone && 'timeline-event-milestone',
    event.status && `timeline-event-status-${event.status}`,
  ];

  const statusBadge = event.status
    ? `<div class="timeline-event-status timeline-event-status-${event.status}">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: currentColor; margin-right: 4px;"></span>
        ${escapeHtml(event.status.replace('-', ' '))}
      </div>`
    : '';

  return div(
    {
      class: classList(...classes),
      'data-event-id': event.id || '',
      'data-milestone': event.milestone || false,
    },
    `
      <div class="timeline-event-header">
        <div class="timeline-event-meta">
          <div class="timeline-event-timestamp">${escapeHtml(event.timestamp)}</div>
          <h4 class="timeline-event-title">${escapeHtml(event.title)}</h4>
          ${event.category ? `<div class="timeline-event-category">${escapeHtml(event.category)}</div>` : ''}
        </div>
      </div>
      ${event.description ? `<div class="timeline-event-description">${escapeHtml(event.description)}</div>` : ''}
      ${statusBadge}
    `.trim()
  );
}

/**
 * Render timeline component
 */
export function renderTimeline(
  component: TimelineComponent,
  _context: RenderContext
): ComponentRenderPlan {
  const orientation = component.orientation || 'vertical';
  const eventsHtml = component.events.map(renderTimelineEvent).join('\n');

  const title = component.title
    ? `<h3 class="adaptiveui-component-title">${escapeHtml(component.title)}</h3>`
    : '';

  const html = div(
    {
      class: 'adaptiveui-component',
      'data-component': 'timeline',
    },
    `
      ${title}
      <div class="timeline timeline-${orientation}" role="list" aria-label="${component.title || 'Timeline'}">
        ${eventsHtml}
      </div>
    `.trim()
  );

  return {
    type: 'timeline',
    component,
    html,
    classes: ['timeline', `timeline-${orientation}`],
    dataAttributes: {
      component: 'timeline',
      orientation,
      events: String(component.events.length),
    },
  };
}
