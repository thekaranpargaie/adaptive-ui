# Architecture

## Data Contract Protocol

Adaptive UI operates as a **data contract** between backend and frontend systems:

```
┌─────────────────────────┐
│      BACKEND            │
│  (Data Provider)        │
│                         │
│  - Database queries     │
│  - API aggregation      │
│  - Business logic       │
└────────────┬────────────┘
             │
             │ Returns: ViewSpec (JSON)
             │ Defines: Data structure & visualization hints
             │
┌────────────▼────────────┐      ┌──────────────────────┐
│   ADAPTIVE UI           │      │   FRONTEND UI        │
│   (Data Contract Layer) │      │   (Display Layer)    │
│                         │      │                      │
│  1. Validate ViewSpec   │──────│  5. Render HTML      │
│  2. Transform data      │      │  6. Apply CSS        │
│  3. Generate HTML       │      │  7. Display to user  │
│  4. Output dashboard    │      │                      │
└─────────────────────────┘      └──────────────────────┘
```

## Core Layers

### 1. Schema Layer (`src/schema/`)
- Defines the **data contract** via JSON schema
- Specifies all valid ViewSpec structures
- Ensures consistency across backend and frontend
- File: `viewspec-v1.schema.json`

### 2. Validation Layer (`src/validation/`)
- Validates backend data against schema
- Ensures data conforms to contract
- Catches structure errors early

### 3. Rendering Engine (`src/renderer/`)
- **Pure data transformation**: Converts ViewSpec to HTML
- No AI or external dependencies
- Fast and deterministic
- Components:
  - **Layout**: Grid, stack, flow positioning
  - **Styles**: Responsive CSS generation
  - **Components**: Chart (Chart.js), Table, Metric Grid, etc.

### 4. Component Registry (`src/components/`)
- Available visualization types for backend developers
- Each component knows how to render its data
- Extensible for custom visualizations

### 5. CLI (`src/cli/`)
- `render`: Transform ViewSpec to HTML
- `validate`: Check data contract compliance
- `init`: Setup new projects

## Data Flow

**Backend** → **Adaptive UI** → **Frontend**

1. Backend queries database/API and structures data
2. Backend creates ViewSpec JSON following schema
3. Backend returns ViewSpec to frontend/client
4. Adaptive UI validates ViewSpec against schema
5. Adaptive UI renders ViewSpec to responsive HTML
6. Browser displays the dashboard
7. No runtime LLM processing, pure data rendering

## Type System

Full TypeScript support:
- `src/types/viewspec.ts` - Core data contract types
- `src/renderer/types.ts` - Rendering engine types
- Type-safe for both backend and frontend development

## Design Principles

- **Data-Driven**: All UI generation from data, not AI
- **Contract-First**: Schema is a formal agreement between backend and frontend
- **Zero Latency**: No external API calls or LLM processing
- **Deterministic**: Same input always produces same output
- **Extensible**: Add custom components while maintaining contract
