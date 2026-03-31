/**
 * List Component Renderer
 */

import { ListComponent, ListItem } from '../../types/viewspec.js';
import { RenderContext, ComponentRenderPlan } from '../types.js';
import { div, list, li, escapeHtml } from '../html-utils.js';

/**
 * Render list items recursively
 */
function renderListItems(items: ListItem[], listType: string): string {
  return items
    .map((item) => {
      const childrenHtml = item.children
        ? list(
            listType === 'ordered' ? 'ol' : 'ul',
            {},
            renderListItems(item.children, listType),
          )
        : '';

      return li({}, `${escapeHtml(item.content)}${childrenHtml ? `\n${childrenHtml}` : ''}`);
    })
    .join('\n');
}

/**
 * Render definition list
 */
function renderDefinitionList(items: ListItem[]): string {
  const dlContent = items
    .map((item) => {
      // For definition lists, we expect content to be in format "term: definition"
      const parts = item.content.split(':');
      const term = parts[0]?.trim() || '';
      const definition = parts.slice(1).join(':').trim() || '';

      return `
        <dt>${escapeHtml(term)}</dt>
        <dd>${escapeHtml(definition)}</dd>
      `.trim();
    })
    .join('\n');

  return list('dl', {}, dlContent);
}

/**
 * Render list component
 */
export function renderList(
  component: ListComponent,
  _context: RenderContext,
): ComponentRenderPlan {
  const title = component.title
    ? `<h3 class="adaptiveui-component-title">${escapeHtml(component.title)}</h3>`
    : '';

  let listHtml: string;
  if (component.listType === 'definition') {
    listHtml = renderDefinitionList(component.items);
  } else {
    const tag = component.listType === 'ordered' ? 'ol' : 'ul';
    listHtml = list(tag, {}, renderListItems(component.items, component.listType));
  }

  const html = div(
    {
      class: 'adaptiveui-component adaptiveui-list',
      'data-component': 'list',
    },
    `
      ${title}
      ${listHtml}
    `.trim(),
  );

  return {
    type: 'list',
    component,
    html,
    classes: ['adaptiveui-list'],
    dataAttributes: {
      component: 'list',
      'list-type': component.listType,
    },
  };
}
