# Adaptive UI

A **data contract protocol** that bridges backends and frontends for adaptive data visualization. Backends provide structured data; Adaptive UI renders it into visually compelling, responsive dashboards without requiring LLM processing.

## Why Adaptive UI?

- **Data-First Architecture**: Backend defines data structure once, frontend visualizes it many ways
- **Zero AI Overhead**: Pure data rendering - no LLM dependencies, no latency
- **Contract-Based**: Clear contract between backend and frontend using JSON schemas
- **Extensible Components**: Build custom visualizations for your specific needs
- **Type-Safe**: Full TypeScript support for both backend and frontend developers

## Key Concepts

- **Backend Role**: Provide data in structured ViewSpec format
- **Adaptive UI Role**: Transform ViewSpec into responsive HTML/CSS dashboards
- **Frontend Role**: Integrate Adaptive UI to render data provided by backend

## Quick Start

```bash
# Install
npm install
npm run build

# Start the interactive playground
npm run playground

# Or use the CLI directly
npm run cli -- render data.json -o output.html
npm run cli -- validate schema.json
```

## Try It Out

**Interactive Playground**: Start a server that demonstrates real package integration:

```bash
npm run playground
```

Open http://localhost:3000 to:
- Edit ViewSpec JSON live
- See dashboards render in real-time
- Learn the data contract format
- Understand how to integrate Adaptive UI

The playground uses the **actual Adaptive UI library functions** (`renderViewSpec()` and `validateViewSpec()` from dist/) so you can see exactly how external integrations work.

See [playground/README.md](./playground/README.md) for details.

## Documentation

- [Getting Started](./docs/getting-started.md) - 5-minute tutorial
- [Data Contract Guide](./docs/data-contract.md) - How backends create ViewSpec
- [Architecture](./docs/architecture.md) - System design and layers
- [API Reference](./docs/api-reference.md) - Complete API documentation
- [Components](./docs/components.md) - Available visualization types
- [CLI Guide](./docs/cli.md) - Command-line tools
- [Playground Guide](./playground/README.md) - Interactive learning tool

## Project Structure

```
src/
├── cli/            # Command-line interface
├── components/     # UI component definitions
├── renderer/       # HTML rendering engine
├── schema/         # JSON schema definitions
├── types/          # TypeScript type definitions
└── validation/     # Validation logic
```

## License

See [LICENSE](./LICENSE) file for details.
