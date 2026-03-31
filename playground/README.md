# Adaptive UI Playground

An interactive web-based editor for learning and experimenting with ViewSpec - the data contract protocol.

## ✨ Key Feature

This playground **uses the actual Adaptive UI library functions** (`renderViewSpec()` and `validateViewSpec()` from the compiled `dist/`) to demonstrate how to integrate Adaptive UI as a package in your projects.

## Quick Start

```bash
npm run playground
```

This will:
- Compile your TypeScript code
- Start a local server on http://localhost:3000  
- Open the playground in your browser

The server uses the real Adaptive UI functions from `dist/`, showing how external users would integrate it.

## Features

✨ **Live Preview**: Edit ViewSpec JSON on the left, see dashboards render in real-time on the right

📝 **Pre-built Examples**:
- Simple Dashboard
- Charts & Tables
- Engineering Dashboard

🔍 **Real-time Validation**: Using the actual `validateViewSpec()` function

📊 **Live Rendering**: Using the actual `renderViewSpec()` function

## How It Works

### The Real Integration Pattern

```
Your JSON Editor
       ↓
  POST /api/validate
       ↓
validateViewSpec() [from dist/]
       ↓
  POST /api/render
       ↓
renderViewSpec() [from dist/]
       ↓
Browser Preview with Chart.js
```

This is exactly how your users will integrate Adaptive UI - by calling those same functions.

## Backend Integration Example

### Node.js/Express

```typescript
import { renderViewSpec, validateViewSpec } from 'adaptiveui';

app.post('/api/dashboard', (req, res) => {
  const viewSpec = { /* your dashboard structure */ };
  
  // Validate
  const validation = validateViewSpec(viewSpec);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }
  
  // Render
  const renderPlan = renderViewSpec(validation.data, {
    inlineCss: true,
    darkMode: false
  });
  
  // Send HTML to frontend
  res.send(renderPlan.html);
});
```

### Python

```python
from adaptiveui import render_viewspec, validate_viewspec

@app.route('/api/dashboard')
def get_dashboard():
    view_spec = { /* your dashboard */ }
    
    validation = validate_viewspec(view_spec)
    if not validation['valid']:
        return {'errors': validation['errors']}, 400
    
    result = render_viewspec(validation['data'])
    return result['html']
```

The playground shows this same pattern in action.

## Try It Out

### Simple Edit
1. Load the "Simple Dashboard" example
2. Change a metric value: `"value": 24500` → `"value": 50000`
3. Click Format to clean up JSON
4. See the preview update instantly
5. Real validation confirms it's correct

### Change Component Type
1. Load the "Charts & Tables" example
2. Change `"chartType": "line"` → `"chartType": "bar"`
3. The chart re-renders immediately

### Add New Metric
1. In the metrics section, add:
```json
{
  "label": "New Metric",
  "value": 999,
  "trend": { "direction": "up", "value": "5%" }
}
```

## ViewSpec Component Types

### metric-grid
```json
{
  "type": "metric-grid",
  "items": [
    {
      "label": "Users",
      "value": 1234,
      "unit": "people",
      "trend": { "direction": "up", "value": "+5%" }
    }
  ]
}
```

### chart
```json
{
  "type": "chart",
  "chartType": "line|bar|area|pie|scatter",
  "title": "My Chart",
  "series": [{
    "name": "Data",
    "color": "#3b82f6",
    "data": [
      { "x": "Jan", "y": 100 },
      { "x": "Feb", "y": 200 }
    ]
  }]
}
```

### table
```json
{
  "type": "table",
  "columns": [
    { "key": "name", "label": "Name" },
    { "key": "value", "label": "Value", "align": "right" }
  ],
  "rows": [
    { "name": "Row 1", "value": "123" }
  ]
}
```

## Tips

💡 **Format JSON**: Click "Format JSON" button  
💡 **Copy JSON**: Click "Copy JSON" to copy the spec for your backend  
💡 **Error Messages**: Red errors show what's wrong  
💡 **Real Library**: All rendering uses actual compiled functions  

## Troubleshooting

**Server won't start?**
- Make sure port 3000 is free
- Run `npm run build` first
- Check for TypeScript compiler errors

**Preview blank?**
- Check the error panel (red section at bottom)
- Ensure your JSON is valid
- Try the Format button

**Chart not showing?**
- Verify `series` array has data
- Check data points have `x` and `y` fields
- Try changing to a different chart type

## Learn More

- [Data Contract Guide](./docs/data-contract.md)
- [API Reference](./docs/api-reference.md)  
- [Architecture](./docs/architecture.md)
- [Getting Started](./docs/getting-started.md)
