/**
 * Renderer Type Definitions
 *
 * Core types for the rendering engine
 */

import { Component, Layout } from '../types/viewspec.js';

/**
 * Rendering context passed through the rendering pipeline
 */
export interface RenderContext {
  /** Base URL for assets */
  baseUrl?: string;
  /** Inline CSS flag */
  inlineCss?: boolean;
  /** Dark mode flag */
  darkMode?: boolean;
  /** Additional custom data */
  custom?: Record<string, unknown>;
}

/**
 * Render plan for a component
 */
export interface ComponentRenderPlan {
  /** Component type */
  type: string;
  /** Component data */
  component: Component;
  /** Generated HTML string */
  html: string;
  /** Component-specific CSS classes */
  classes: string[];
  /** Data attributes */
  dataAttributes: Record<string, string>;
}

/**
 * Render plan for a section
 */
export interface SectionRenderPlan {
  /** Section ID */
  id?: string;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Layout configuration */
  layout?: Layout;
  /** Rendered components */
  components: ComponentRenderPlan[];
  /** Generated HTML string */
  html: string;
  /** Section CSS classes */
  classes: string[];
}

/**
 * Complete render plan for a ViewSpec
 */
export interface RenderPlan {
  /** ViewSpec version */
  version: string;
  /** View type */
  view: string;
  /** View title */
  title: string;
  /** View description */
  description?: string;
  /** Rendered sections */
  sections: SectionRenderPlan[];
  /** Complete HTML output */
  html: string;
  /** CSS string */
  css: string;
  /** Render context used */
  context: RenderContext;
}

/**
 * Component renderer function signature
 */
export type ComponentRenderer<T extends Component = Component> = (
  component: T,
  context: RenderContext,
) => ComponentRenderPlan;

/**
 * Layout renderer function signature
 */
export type LayoutRenderer = (
  layout: Layout,
  children: string,
  context: RenderContext,
) => string;

/**
 * Render options
 */
export interface RenderOptions {
  /** Include inline CSS */
  inlineCss?: boolean;
  /** Include external CSS link */
  externalCss?: boolean;
  /** CSS file path (for external CSS) */
  cssPath?: string;
  /** Enable dark mode */
  darkMode?: boolean;
  /** Base URL for assets */
  baseUrl?: string;
  /** Custom context data */
  custom?: Record<string, unknown>;
}

/**
 * HTML output format
 */
export interface HtmlOutput {
  /** Complete HTML document */
  html: string;
  /** CSS string (if not inlined) */
  css?: string;
  /** Render plan used */
  plan: RenderPlan;
}
