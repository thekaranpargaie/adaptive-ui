/**
 * Layout Engine
 *
 * Handles layout planning and rendering
 */

import { Layout, GridLayout, StackLayout, FlowLayout } from '../types/viewspec.js';
import { RenderContext } from './types.js';
import { div, classList } from './html-utils.js';

/**
 * Render a grid layout
 */
function renderGridLayout(
  layout: GridLayout,
  children: string,
  _context: RenderContext,
): string {
  const columns = layout.columns || 3;
  const classes = [
    'layout-grid',
    layout.spacing && `spacing-${layout.spacing}`,
    layout.padding && `padding-${layout.padding}`,
  ];

  const styles = [
    `grid-template-columns: repeat(${columns}, 1fr)`,
    layout.gap && `gap: var(--spacing-${layout.gap})`,
  ].filter(Boolean).join('; ');

  return div(
    {
      class: classList(...classes),
      style: styles,
      'data-layout': 'grid',
      'data-columns': columns,
    },
    children,
  );
}

/**
 * Render a stack layout
 */
function renderStackLayout(
  layout: StackLayout,
  children: string,
  _context: RenderContext,
): string {
  const direction = layout.direction || 'vertical';
  const classes = [
    'layout-stack',
    `layout-stack-${direction}`,
    layout.spacing && `spacing-${layout.spacing}`,
    layout.padding && `padding-${layout.padding}`,
    layout.align && `align-${layout.align}`,
    layout.justify && `justify-${layout.justify}`,
  ];

  return div(
    {
      class: classList(...classes),
      'data-layout': 'stack',
      'data-direction': direction,
    },
    children,
  );
}

/**
 * Render a flow layout
 */
function renderFlowLayout(
  layout: FlowLayout,
  children: string,
  _context: RenderContext,
): string {
  const classes = [
    'layout-flow',
    layout.spacing && `spacing-${layout.spacing}`,
    layout.padding && `padding-${layout.padding}`,
  ];

  const styles = layout.maxWidth ? `max-width: ${layout.maxWidth}` : undefined;

  return div(
    {
      class: classList(...classes),
      style: styles,
      'data-layout': 'flow',
    },
    children,
  );
}

/**
 * Render a layout with children
 */
export function renderLayout(
  layout: Layout | undefined,
  children: string,
  context: RenderContext,
): string {
  if (!layout) {
    // Default to flow layout if none specified
    return renderFlowLayout({ type: 'flow' }, children, context);
  }

  switch (layout.type) {
    case 'grid':
      return renderGridLayout(layout, children, context);
    case 'stack':
      return renderStackLayout(layout, children, context);
    case 'flow':
      return renderFlowLayout(layout, children, context);
    default:
      return children;
  }
}
