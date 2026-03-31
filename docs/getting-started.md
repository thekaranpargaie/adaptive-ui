# Getting Started

Adaptive UI is a **data contract protocol** for visualizing backend data without AI overhead.

## What is Adaptive UI?

Instead of requiring frontend developers to write custom UI code for each dashboard, backends provide structured data (ViewSpec) that Adaptive UI automatically renders into beautiful, responsive dashboards.

```
Your Backend Data → ViewSpec (JSON) → Adaptive UI → Interactive Dashboard
```

## Installation

```bash
npm install
npm run build
```

## 5-Minute Tutorial

### 1. Understand the Contract

Adaptive UI uses a simple JSON contract called **ViewSpec**:

```json
{
  "version": "1.0.0",
  "view": "dashboard",
  "title": "My Dashboard",
  "sections": [
    {
      "id": "metrics",
      "title": "Key Metrics",
      "layout": { "type": "grid", "columns": 4 },
      "components": [
        {
          "type": "metric-grid",
          "items": [
            {
              "label": "System Uptime",
              "value": "99.98%",
              "trend": { "direction": "up", "value": "0.02%" }
            }
          ]
        }
      ]
    }
  ]
}
```

### 2. Prepare Your Data

In your **backend**, query the data:

```python
# Get data from your database
uptime = db.query("SELECT uptime FROM metrics")
```

### 3. Create ViewSpec

Transform your data into ViewSpec format (steps shown in [Data Contract Guide](./data-contract.md)):

```python
viewspec = {
    "version": "1.0.0",
    "view": "dashboard",
    "title": "My Dashboard",
    "sections": [...]
}
return jsonify(viewspec)
```

### 4. Render the Dashboard

**Option A: CLI (for static dashboards)**
```bash
npm run cli -- render my-data.json -o dashboard.html
```

**Option B: Programmatic (for dynamic dashboards)**
```javascript
const { renderToHtml } = require('adaptiveui');
const viewspec = require('./my-viewspec.json');
const html = renderToHtml(viewspec).html;
```

### 5. Display to Users

The rendered HTML is a complete, standalone dashboard:
- Responsive design
- Interactive charts (Chart.js)
- No runtime dependencies
- Works offline

## CLI Commands

### Validate Your Data Contract

Before deploying, validate your ViewSpec conforms to the schema:

```bash
npm run cli -- validate my-viewspec.json
```

### Render to HTML

Convert ViewSpec to an interactive HTML dashboard:

```bash
npm run cli -- render my-viewspec.json -o output.html
```

### Initialize a New Project

```bash
npm run cli -- init
```

## Architecture Overview

```
┌──────────────────┐
│  YOUR BACKEND    │  ← Queries database, creates ViewSpec
└────────┬─────────┘
         │
         │ Returns ViewSpec (JSON)
         │
┌────────▼──────────────────┐
│  ADAPTIVE UI               │  ← Validates & renders
│  (This project)            │
└────────┬───────────────────┘
         │
         │ Returns HTML
         │
┌────────▼──────────────────┐
│  FRONTEND / BROWSER        │  ← Shows dashboard
└───────────────────────────┘
```

## Example Workflow

### 1. Backend Node.js Server

```javascript
const express = require('express');
const app = express();

app.get('/api/dashboard', (req, res) => {
  // Step 1: Query data
  const metrics = {
    uptime: 99.98,
    responseTime: 145,
    activeDeployments: 23
  };
  
  // Step 2: Create ViewSpec
  const viewspec = {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Engineering Dashboard',
    sections: [{
      id: 'kpis',
      title: 'Key Performance Indicators',
      layout: { type: 'grid', columns: 3 },
      components: [{
        type: 'metric-grid',
        items: [
          { label: 'Uptime', value: metrics.uptime + '%' },
          { label: 'Response Time', value: metrics.responseTime, unit: 'ms' },
          { label: 'Deployments', value: metrics.activeDeployments }
        ]
      }]
    }]
  };
  
  // Step 3: Return ViewSpec
  res.json(viewspec);
});

app.listen(3000);
```

### 2. Frontend Integration

```html
<!DOCTYPE html>
<html>
<body>
  <div id="dashboard"></div>
  
  <script>
    // Fetch ViewSpec from backend
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(viewspec => {
        // Render it using Adaptive UI
        const html = AdaptiveUI.renderToHtml(viewspec);
        document.getElementById('dashboard').innerHTML = html;
      });
  </script>
</body>
</html>
```

## Key Principles

✅ **Backend provides data** - Your backend queries database/APIs  
✅ **Adaptive UI renders it** - No custom frontend code needed  
✅ **Frontend displays it** - Users see the dashboard  
✅ **No AI required** - Pure data transformation, no LLM calls  
✅ **Type-safe** - Use TypeScript for both backend and frontend  

## Next Steps

- **[Data Contract Guide](./data-contract.md)** - Detailed backend implementation guide
- **[Components](./components.md)** - Available visualization types
- **[API Reference](./api-reference.md)** - Complete API documentation
- **[Architecture](./architecture.md)** - System design details

## Examples

Check the `examples/` directory for complete examples:

```bash
# View available examples
ls examples/

# Render an example
npm run cli -- render examples/engineering-dashboard.json -o my-dashboard.html
```

## Support

- 📚 [Full Documentation](./README.md)
- 🛠️ [CLI Guide](./cli.md)
- 📋 [Schema Reference](../schema/viewspec-v1.schema.json)
