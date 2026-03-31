# Data Contract Guide

## Overview

Adaptive UI uses a **ViewSpec data contract** to define how backends should structure data for visualization. This guide explains how to implement the contract in your backend.

## The Contract Principle

```
Backend creates structured data (ViewSpec)
         ↓
Adaptive UI validates it conforms to schema
         ↓
Adaptive UI renders it to an interactive dashboard
         ↓
Frontend displays it to users
```

**Key Point**: The ViewSpec is the contract. Both backend and frontend agree on this structure before they interact.

## ViewSpec: The Data Contract

A ViewSpec is a JSON object that describes:
- **What data to show** (metrics, charts, tables)
- **How to organize it** (layout, sections)
- **How to visualize it** (component types, styling hints)

### Basic Structure

```json
{
  "version": "1.0.0",
  "view": "dashboard",
  "title": "Engineering Dashboard",
  "description": "Real-time metrics",
  "metadata": {
    "id": "eng-dashboard-001",
    "createdAt": "2024-12-27T10:00:00Z",
    "refreshInterval": 30
  },
  "sections": [
    {
      "id": "key-metrics",
      "title": "Key Metrics",
      "layout": { "type": "grid", "columns": 4 },
      "components": [
        {
          "type": "metric-grid",
          "items": [
            {
              "label": "System Uptime",
              "value": "99.98%",
              "trend": {
                "direction": "up",
                "value": "0.02%"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## Backend Implementation Steps

### Step 1: Understand ViewSpec Components

Adaptive UI supports these component types for visualization:

| Component | Use Case | Data Format |
|-----------|----------|-------------|
| `metric-grid` | KPIs and gauge values | Arrays of {label, value, unit, trend} |
| `chart` | Time series, trends | {chartType, series with x,y data} |
| `table` | Tabular data | {columns, rows} |
| `text-block` | Descriptions, alerts | {content} |
| `list` | Sequential items | {items: []} |
| `timeline` | Chronological events | {events: [{time, content}]} |
| `log-view` | Logs, traces | {entries: [{timestamp, level, message}]} |

### Step 2: Query Your Data

Gather data from your database/APIs in your backend:

```python
# Python example
def get_engineering_metrics():
    # Query database
    uptime = db.query("SELECT uptime FROM metrics")
    response_time = db.query("SELECT response_time FROM metrics")
    deployments = db.query("SELECT count(*) FROM deployments")
    
    # Aggregate as needed
    return {
        "uptime": uptime,
        "response_time": response_time,
        "deployments": deployments
    }
```

### Step 3: Structure Data as ViewSpec

Transform your data into ViewSpec format:

```python
def create_viewspec(data):
    return {
        "version": "1.0.0",
        "view": "dashboard",
        "title": "Engineering Dashboard",
        "sections": [
            {
                "id": "key-metrics",
                "title": "Key Performance Indicators",
                "layout": {"type": "grid", "columns": 4},
                "components": [
                    {
                        "type": "metric-grid",
                        "items": [
                            {
                                "label": "System Uptime",
                                "value": f"{data['uptime']:.2f}%",
                                "trend": {
                                    "direction": "up",
                                    "value": "0.02%",
                                    "label": "+0.02% from last month"
                                }
                            },
                            {
                                "label": "API Response Time",
                                "value": int(data['response_time']),
                                "unit": "ms",
                                "trend": {
                                    "direction": "down",
                                    "value": 12,
                                    "label": "-12ms improvement"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
```

### Step 4: Return ViewSpec from API

Expose an endpoint that returns the ViewSpec:

```python
# FastAPI/Flask example
@app.get("/api/dashboard/engineering")
def get_engineering_dashboard():
    data = get_engineering_metrics()
    viewspec = create_viewspec(data)
    return viewspec  # Returns JSON
```

### Step 5: Validate Against Schema

Before returning, validate your ViewSpec:

```bash
npm run cli -- validate dashboard.json
```

This ensures it conforms to the contract.

## Complete Backend Workflow Example

### Node.js/Express Example

```javascript
const express = require('express');
const app = express();

// Step 1: Query data
async function getMetrics() {
  const db = await connectDB();
  return {
    uptime: 99.98,
    responseTime: 145,
    activeDeployments: 23,
    errorRate: 0.08,
    timeSeries: [
      { time: '00:00', value: 142 },
      { time: '04:00', value: 138 },
      // ... more data
    ]
  };
}

// Step 2: Transform to ViewSpec
function toViewSpec(data) {
  return {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Engineering Dashboard',
    sections: [
      {
        id: 'metrics',
        title: 'KPIs',
        layout: { type: 'grid', columns: 4 },
        components: [
          {
            type: 'metric-grid',
            items: [
              {
                label: 'System Uptime',
                value: `${data.uptime}%`,
                trend: { direction: 'up', value: '0.02%' }
              },
              {
                label: 'API Response Time',
                value: data.responseTime,
                unit: 'ms',
                trend: { direction: 'down', value: 12 }
              },
              {
                label: 'Active Deployments',
                value: data.activeDeployments,
                trend: { direction: 'up', value: 5 }
              },
              {
                label: 'Error Rate',
                value: `${data.errorRate}%`,
                trend: { direction: 'up', value: '0.03%' }
              }
            ]
          }
        ]
      },
      {
        id: 'trends',
        title: 'Performance Trends',
        layout: { type: 'grid', columns: 2 },
        components: [
          {
            type: 'chart',
            chartType: 'line',
            title: 'API Response Time (24h)',
            height: 300,
            legend: true,
            series: [
              {
                name: 'Response Time',
                color: '#3b82f6',
                data: data.timeSeries
              }
            ]
          }
        ]
      }
    ]
  };
}

// Step 3: Expose endpoint
app.get('/api/dashboard/engineering', async (req, res) => {
  const metrics = await getMetrics();
  const viewspec = toViewSpec(metrics);
  res.json(viewspec);  // Send ViewSpec to frontend
});

app.listen(3000);
```

### Frontend/Client Integration

```html
<!-- Frontend just needs to fetch and render -->
<script>
  async function loadDashboard() {
    // 1. Fetch ViewSpec from backend
    const response = await fetch('/api/dashboard/engineering');
    const viewspec = await response.json();
    
    // 2. Use adaptiveui to render it
    const html = AdaptiveUI.render(viewspec);
    
    // 3. Insert into page
    document.getElementById('dashboard').innerHTML = html;
  }
  
  loadDashboard();
</script>
```

## Data Contract Benefits

### For Backends
✅ Clear definition of what to return
✅ No UI logic required
✅ Can serve multiple frontend apps with same endpoint
✅ Type-safe with TypeScript

### For Frontends
✅ No custom parsing logic
✅ Consistent visualizations
✅ Easy to update designs (just change schema)
✅ Works offline once data is cached

## Versioning Your Contract

As your backend evolves, version your ViewSpec:

```json
{
  "version": "2.0.0",  // Increment when adding new fields
  "view": "dashboard",
  // ... rest of spec
}
```

This allows you to maintain backward compatibility while adding features.

## Common Patterns

### Pattern 1: Dynamic Lists from Query Results

```python
def create_table_viewspec(users):
    return {
        "type": "table",
        "columns": [
            {"key": "name", "label": "Name"},
            {"key": "email", "label": "Email"},
            {"key": "status", "label": "Status"}
        ],
        "rows": [
            {"name": user.name, "email": user.email, "status": user.status}
            for user in users
        ]
    }
```

### Pattern 2: Time Series Charts

```python
def create_chart_viewspec(time_series_data):
    return {
        "type": "chart",
        "chartType": "line",
        "title": "Daily Active Users",
        "series": [
            {
                "name": "Users",
                "color": "#3b82f6",
                "data": [
                    {"x": entry["date"], "y": entry["count"]}
                    for entry in time_series_data
                ]
            }
        ]
    }
```

### Pattern 3: Multi-Metric Dashboard

```python
def create_metrics_viewspec(metrics_dict):
    return {
        "type": "metric-grid",
        "columns": len(metrics_dict),
        "items": [
            {
                "label": label,
                "value": data["value"],
                "unit": data.get("unit"),
                "trend": {
                    "direction": "up" if data["change"] > 0 else "down",
                    "value": abs(data["change"])
                }
            }
            for label, data in metrics_dict.items()
        ]
    }
```

## Testing Your Contract

Validate that your ViewSpec conforms to the schema:

```bash
# Install adaptiveui in your backend project
npm install adaptiveui

# Validate a ViewSpec file
npm run cli -- validate ./my-viewspec.json

# Validate in code (JavaScript)
const { validateViewSpec } = require('adaptiveui/validation');
const viewspec = require('./my-viewspec.json');
const result = validateViewSpec(viewspec);

if (!result.valid) {
  console.error('Invalid ViewSpec:', result.errors);
}
```

## Next Steps

1. **Schema Reference**: Read [ViewSpec Schema](../schema/viewspec-v1.schema.json)
2. **Component Types**: See [Components Guide](./components.md)
3. **Examples**: Check [examples directory](../examples/)
4. **API Reference**: Full details in [API Reference](./api-reference.md)

## Summary

The data contract approach provides:
- **Separation of concerns**: Backend handles data, frontend handles display
- **Scalability**: One backend endpoint can serve multiple frontends
- **Consistency**: All frontends display data the same way
- **Simplicity**: No runtime AI processing, pure data transformation
- **Type safety**: Both backend and frontend can be typed
