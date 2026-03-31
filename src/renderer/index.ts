/**
 * Main Renderer
 *
 * Core rendering pipeline: ViewSpec → RenderPlan → HTML
 */

import { ViewSpec, Section, Component } from '../types/viewspec.js';
import {
  RenderContext,
  RenderPlan,
  SectionRenderPlan,
  ComponentRenderPlan,
  RenderOptions,
  HtmlOutput,
} from './types.js';
import { registry } from '../components/registry.js';
import { renderLayout } from './layout.js';
import { div, heading, p, escapeHtml, htmlDocument } from './html-utils.js';
import { generateCSS } from './styles.js';

/**
 * Create render context from options
 */
function createRenderContext(options: RenderOptions = {}): RenderContext {
  return {
    baseUrl: options.baseUrl,
    inlineCss: options.inlineCss !== false,
    darkMode: options.darkMode || false,
    custom: options.custom,
  };
}

/**
 * Render a single component
 */
function renderComponent(
  component: Component,
  context: RenderContext,
): ComponentRenderPlan {
  return registry.render(component, context);
}

/**
 * Render a section
 */
function renderSection(
  section: Section,
  context: RenderContext,
): SectionRenderPlan {
  // Render all components
  const componentPlans = section.components.map((comp) =>
    renderComponent(comp, context),
  );

  // Combine component HTML
  const componentsHtml = componentPlans.map((plan) => plan.html).join('\n');

  // Apply layout
  const contentHtml = renderLayout(section.layout, componentsHtml, context);

  // Build section header
  const header =
    section.title || section.description
      ? div(
          { class: 'adaptiveui-section-header' },
          `
      ${section.title ? heading(2, { class: 'adaptiveui-section-title' }, escapeHtml(section.title)) : ''}
      ${section.description ? p({ class: 'adaptiveui-section-description' }, escapeHtml(section.description)) : ''}
    `.trim(),
        )
      : '';

  // Build complete section HTML
  const html = div(
    {
      class: 'adaptiveui-section',
      id: section.id,
      'data-section-id': section.id,
    },
    `
    ${header}
    ${contentHtml}
  `.trim(),
  );

  return {
    id: section.id,
    title: section.title,
    description: section.description,
    layout: section.layout,
    components: componentPlans,
    html,
    classes: ['adaptiveui-section'],
  };
}

/**
 * Render ViewSpec to RenderPlan
 */
export function renderViewSpec(
  viewSpec: ViewSpec,
  options: RenderOptions = {},
): RenderPlan {
  const context = createRenderContext(options);

  // Render all sections
  const sectionPlans = viewSpec.sections.map((section) =>
    renderSection(section, context),
  );

  // Build header
  const header = div(
    { class: 'adaptiveui-header' },
    `
    ${heading(1, { class: 'adaptiveui-title' }, escapeHtml(viewSpec.title))}
    ${viewSpec.description ? p({ class: 'adaptiveui-description' }, escapeHtml(viewSpec.description)) : ''}
  `.trim(),
  );

  // Combine section HTML
  const sectionsHtml = sectionPlans.map((plan) => plan.html).join('\n');

  // Build complete HTML
  const bodyHtml = div(
    {
      class: 'adaptiveui-container',
      'data-view': viewSpec.view,
      'data-version': viewSpec.version,
      'data-theme': context.darkMode ? 'dark' : 'light',
    },
    `
    ${header}
    ${sectionsHtml}
  `.trim(),
  );

  // Generate CSS
  const css = generateCSS();

  return {
    version: viewSpec.version,
    view: viewSpec.view,
    title: viewSpec.title,
    description: viewSpec.description,
    sections: sectionPlans,
    html: bodyHtml,
    css,
    context,
  };
}

/**
 * Render ViewSpec to complete HTML document
 */
export function renderToHtml(
  viewSpec: ViewSpec,
  options: RenderOptions = {},
): HtmlOutput {
  const plan = renderViewSpec(viewSpec, options);

  const html = htmlDocument(plan.title, plan.html, {
    css: plan.css,
    inlineCss: options.inlineCss !== false,
    externalCssPath: options.externalCss ? options.cssPath : undefined,
    meta: {
      'generator': 'AdaptiveUI',
      'view-type': plan.view,
      'view-version': plan.version,
    },
  });

  return {
    html,
    css: options.inlineCss !== false ? undefined : plan.css,
    plan,
  };
}
