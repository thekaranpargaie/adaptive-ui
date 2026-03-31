/**
 * AdaptiveUI - Main Export
 *
 * Public API exports
 */

// Types
export * from './types/viewspec.js';
export * from './renderer/types.js';

// Validation
export { validateViewSpec, type ValidationResult } from './validation/index.js';

// Rendering
export { renderToHtml, renderViewSpec } from './renderer/index.js';

// Component Registry
export { registry } from './components/registry.js';
export type { ComponentMetadata } from './components/registry.js';

// Styles
export { generateCSS, tokens } from './renderer/styles.js';

// Schema
export * from './schema/schemas.js';
