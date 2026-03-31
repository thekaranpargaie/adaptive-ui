/**
 * Text Block Component Renderer
 */

import { TextBlockComponent } from '../../types/viewspec.js';
import { RenderContext, ComponentRenderPlan } from '../types.js';
import { div, p, escapeHtml, classList } from '../html-utils.js';

/**
 * Render text content based on format
 */
function renderTextContent(content: string, format?: string): string {
  if (!content) {
    return '';
  }
  
  if (format === 'markdown') {
    // Simple markdown rendering (basic implementation)
    // For production, consider using a library like marked
    return simpleMarkdown(content);
  }
  
  // Plain text - preserve line breaks
  return content
    .split('\n')
    .map((line) => p({}, escapeHtml(line)))
    .join('\n');
}

/**
 * Simple markdown renderer (basic implementation)
 */
function simpleMarkdown(content: string): string {
  let html = escapeHtml(content);
  
  // Bold: **text** or __text__
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // Italic: *text* or _text_
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Code: `code`
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br />');
  
  return html;
}

/**
 * Render text block component
 */
export function renderTextBlock(
  component: TextBlockComponent,
  _context: RenderContext,
): ComponentRenderPlan {
  const classes = [
    'text-block',
    component.emphasis && `text-block-emphasis-${component.emphasis}`,
  ].filter((c): c is string => typeof c === 'string');

  const title = component.title
    ? `<h3 class="adaptiveui-component-title">${escapeHtml(component.title)}</h3>`
    : '';

  const contentHtml = renderTextContent(component.content, component.format);

  const html = div(
    {
      class: classList('adaptiveui-component', ...classes),
      'data-component': 'text-block',
    },
    `
      ${title}
      <div class="text-block-content">
        ${contentHtml}
      </div>
    `.trim(),
  );

  return {
    type: 'text-block',
    component,
    html,
    classes,
    dataAttributes: {
      component: 'text-block',
      format: component.format || 'plain',
    },
  };
}
