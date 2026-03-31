# API Reference

## ViewSpec Structure

The main configuration format for defining UI specifications.

### Root Schema

```typescript
interface ViewSpec {
  name: string;                    // Display name of the view
  type: 'dashboard' | 'form' | 'report';  // View type
  layout?: LayoutConfig;          // Layout configuration
  components: Component[];        // Array of components
  styling?: StyleConfig;          // Global styling
  version: string;                // Schema version
}
```

### Component Structure

```typescript
interface Component {
  id: string;                     // Unique identifier
  type: string;                   // Component type (e.g., 'chart', 'metric', 'table')
  props?: Record<string, any>;    // Component-specific properties
  children?: Component[];         // Nested components
  connectorId?: string;           // Optional data connector
}
```

### Layout Configuration

```typescript
interface LayoutConfig {
  type: 'grid' | 'flex' | 'absolute';
  columns?: number;               // For grid layout
  gap?: number;                   // Space between items
  responsive?: boolean;           // Enable responsive behavior
}
```



## Renderer API

### Render to HTML

```typescript
async function renderToHtml(spec: ViewSpec, options?: RenderOptions): Promise<string>
```

Transform a ViewSpec into HTML string with embedded CSS.

### Get Component Registry

```typescript
function getComponentRegistry(): ComponentRegistry
```

Access the global component registry.

## Validation API

### Validate Specification

```typescript
async function validateSpec(spec: unknown): Promise<ValidationResult>
```

Validate a specification against the schema.

## Connector API

### Create Connector Instance

```typescript
function createConnector(type: 'api' | 'database' | 'web-search', config: any): Connector
```

Create a connector for external data sources.

## CLI Commands

See [CLI Guide](./cli.md) for command-line usage.
