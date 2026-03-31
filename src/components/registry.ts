/**
 * Component Registry
 *
 * Central registry for all components and their renderers
 */

import { Component } from '../types/viewspec.js';
import { ComponentRenderer, RenderContext, ComponentRenderPlan } from '../renderer/types.js';
import {
  renderMetricGrid,
  renderTable,
  renderLogView,
  renderTimeline,
  renderTextBlock,
  renderList,
  renderChart,
} from '../renderer/components/index.js';

/**
 * Component metadata
 */
export interface ComponentMetadata {
  /** Component type identifier */
  type: string;
  /** Component name */
  name: string;
  /** Component version */
  version: string;
  /** Component description */
  description: string;
  /** Renderer function */
  renderer: ComponentRenderer;
}

/**
 * Component registry
 */
class ComponentRegistry {
  private components: Map<string, ComponentMetadata> = new Map();

  /**
   * Register a component
   */
  register(metadata: ComponentMetadata): void {
    if (this.components.has(metadata.type)) {
      throw new Error(`Component '${metadata.type}' is already registered`);
    }
    this.components.set(metadata.type, metadata);
  }

  /**
   * Get component metadata
   */
  get(type: string): ComponentMetadata | undefined {
    return this.components.get(type);
  }

  /**
   * Check if component is registered
   */
  has(type: string): boolean {
    return this.components.has(type);
  }

  /**
   * Get all registered components
   */
  getAll(): ComponentMetadata[] {
    return Array.from(this.components.values());
  }

  /**
   * Render a component
   */
  render(component: Component, context: RenderContext): ComponentRenderPlan {
    const metadata = this.components.get(component.type);
    if (!metadata) {
      throw new Error(`Unknown component type: ${component.type}`);
    }
    return metadata.renderer(component, context);
  }
}

// Create global registry instance
export const registry = new ComponentRegistry();

// Register all built-in components
registry.register({
  type: 'metric-grid',
  name: 'Metric Grid',
  version: '1.0.0',
  description: 'Display key metrics in a grid layout',
  renderer: renderMetricGrid as ComponentRenderer,
});

registry.register({
  type: 'table',
  name: 'Table',
  version: '1.0.0',
  description: 'Display tabular data',
  renderer: renderTable as ComponentRenderer,
});

registry.register({
  type: 'log-view',
  name: 'Log View',
  version: '1.0.0',
  description: 'Display log entries',
  renderer: renderLogView as ComponentRenderer,
});

registry.register({
  type: 'timeline',
  name: 'Timeline',
  version: '1.0.0',
  description: 'Display events in a timeline',
  renderer: renderTimeline as ComponentRenderer,
});

registry.register({
  type: 'text-block',
  name: 'Text Block',
  version: '1.0.0',
  description: 'Display text content with optional markdown',
  renderer: renderTextBlock as ComponentRenderer,
});

registry.register({
  type: 'list',
  name: 'List',
  version: '1.0.0',
  description: 'Display ordered, unordered, or definition lists',
  renderer: renderList as ComponentRenderer,
});

registry.register({
  type: 'chart',
  name: 'Chart',
  version: '1.0.0',
  description: 'Display data visualizations',
  renderer: renderChart as ComponentRenderer,
});
