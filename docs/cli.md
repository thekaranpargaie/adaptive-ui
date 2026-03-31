# CLI Guide

Command-line interface for Adaptive UI data contract validation and rendering.

## Installation

```bash
npm install
npm run build
```

## Usage

The CLI provides three core commands for working with ViewSpec data contracts:

## Commands

### init

Initialize a new ViewSpec dashboard template.

```bash
npm run cli -- init [options]
```

**Options:**
- `--name <name>` - Dashboard name
- `--template <type>` - Template type (simple, dashboard)
- `--output <path>` - Output file path

**Example:**
```bash
npm run cli -- init --name "My Dashboard" --output dashboard.json
```

### validate

Validate a ViewSpec configuration file against the schema.

```bash
npm run cli -- validate <file.json>
```

**Options:**
- `--strict` - Enable strict validation mode

**Example:**
```bash
npm run cli -- validate dashboard.json --strict
```

Output:
```
✓ ✓ ViewSpec is valid
```

### render

Render a ViewSpec to an interactive HTML dashboard.

```bash
npm run cli -- render <spec.json> -o <output.html>
```

**Options:**
- `--output <path>` or `-o <path>` - Output HTML file path (required)
- `--pretty` - Pretty-print HTML output

**Example:**
```bash
npm run cli -- render dashboard.json -o index.html
npm run cli -- render dashboard.json -o dashboard.html --pretty
```

Output:
```
✓ Rendered successfully: /path/to/output.html
```

## Workflow Example

### Step 1: Create a ViewSpec

Create a JSON file describing your dashboard:

```json
{
  "version": "1.0.0",
  "view": "dashboard",
  "title": "My Dashboard",
  "sections": [{
    "id": "metrics",
    "title": "Key Metrics",
    "layout": { "type": "grid", "columns": 3 },
    "components": [{
      "type": "metric-grid",
      "items": [
        { "label": "Users", "value": 1234 },
        { "label": "Revenue", "value": "$45K" },
        { "label": "Growth", "value": "+12%" }
      ]
    }]
  }]
}
```

### Step 2: Validate Your ViewSpec

```bash
npm run cli -- validate dashboard.json
```

### Step 3: Render to HTML

```bash
npm run cli -- render dashboard.json -o dashboard.html
```

### Step 4: View in Browser

Open `dashboard.html` in your browser to see the rendered dashboard.

## Tips

- **Validate early**: Always validate ViewSpec before rendering to catch errors
- **Start with init**: Use `init` command to generate a template
- **Iterate locally**: Render and check output locally before deploying
- **Version your specs**: Keep versions of your ViewSpec as your data evolves
```

## Exit Codes

- `0` - Success
- `1` - General error
- `2` - Invalid schema
- `3` - Validation error
- `4` - Render error

## Examples

### Create and Render a Dashboard

```bash
# Create config
npm run cli -- init --name "Analytics" --template dashboard

# Validate spec
npm run cli -- validate analytics.json

# Render to HTML
npm run cli -- render analytics.json -o dashboard.html
```

### Get Agent Suggestions

```bash
npm run cli -- ask "Create a table showing monthly sales" \
  --context sales-spec.json \
  --format json
```
