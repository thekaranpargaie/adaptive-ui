# Adaptive UI: Data Contract Protocol

## Executive Summary

Adaptive UI is a **data contract protocol** that standardizes how backends and frontends exchange data for visualization. Instead of each frontend building custom dashboards, backends provide structured data (ViewSpec), and Adaptive UI renders it into responsive, interactive dashboards automatically.

```
┌─────────────────────┐
│  BACKEND            │  
│  (Data Provider)    │  Query database/APIs, create ViewSpec
└──────────┬──────────┘
           │
           │ ViewSpec (JSON)
           │ Schema contract
           ▼
┌─────────────────────┐       ┌──────────────────┐
│  ADAPTIVE UI        │       │  FRONTEND        │
│  (Render Layer)     │──────▶│  (Display Layer) │
│                     │       │                  │
│ • Validate schema   │       │ • Show dashboard │
│ • Transform data    │       │ • Interactive UI │
│ • Render to HTML    │       │ • Chart.js       │
│ • Apply styles      │       │                  │
└─────────────────────┘       └──────────────────┘
```

## What is ViewSpec?

**ViewSpec** is the JSON data contract that describes:
- **What data** to visualize (metrics, charts, tables)
- **How to organize it** (layout, sections)
- **How to display it** (component types, styling hints)

**Example:**
```json
{
  "version": "1.0.0",
  "view": "dashboard",
  "title": "Engineering Dashboard",
  "sections": [{
    "id": "metrics",
    "title": "KPIs",
    "layout": { "type": "grid", "columns": 4 },
    "components": [{
      "type": "metric-grid",
      "items": [
        { "label": "Uptime", "value": "99.98%", "trend": { "direction": "up" } }
      ]
    }]
  }]
}
```

## Architecture Layers

### 1. Backend Layer
- Queries database/APIs
- Aggregates and transforms data
- Creates ViewSpec following schema
- Returns ViewSpec via API

**Example (Node.js):**
```javascript
app.get('/api/dashboard', (req, res) => {
  const metrics = await db.query('SELECT * FROM metrics');
  const viewspec = {
    version: '1.0.0',
    view: 'dashboard',
    sections: [/* transform metrics here */]
  };
  res.json(viewspec);  // Return ViewSpec
});
```

### 2. Adaptive UI Layer
- Validates ViewSpec against schema
- Transforms ViewSpec to HTML
- Generates responsive CSS
- Renders with Chart.js (charts)
- **No AI processing, no external dependencies**

**Capabilities:**
- Metric grids with KPIs
- Charts (line, bar, area, pie, scatter)
- Tables with sorting/filtering
- Lists and timelines
- Text blocks and logs
- Responsive layouts
- Dark mode support

### 3. Frontend Layer
- Fetches ViewSpec from backend
- Uses Adaptive UI to render
- Displays interactive dashboard
- Handles user interactions

**Example (HTML):**
```html
<script>
  fetch('/api/dashboard')
    .then(r => r.json())
    .then(viewspec => {
      const html = AdaptiveUI.renderToHtml(viewspec);
      document.body.innerHTML = html;
    });
</script>
```

## Key Differences from Traditional Approaches

### Traditional (Tightly Coupled)
```
Backend                 Frontend
  ↓                       ↓
API Design         +   HTML Templates
  ↓                       ↓
Data Models        +   CSS Styles
  ↓                     + JavaScript
Custom UI Code         
```
Problem: Frontend and backend must coordinate on custom code

### Adaptive UI (Contact-Based)
```
Backend                 Frontend
  ↓                       ↓
Query Data         +   Render ViewSpec
  ↓                       ↓
Create ViewSpec    +   Display Dashboard
  ↓                       ↓
Return JSON        ←──── Fetch & render
```
Benefit: Decoupled through standard contract (ViewSpec)

## ViewSpec Components

| Component | Use Case | Example |
|-----------|----------|---------|
| `metric-grid` | KPI dashboard with values and trends | System Uptime: 99.98% ↑ |
| `chart` | Time series, trends, distributions | Response time over 24h |
| `table` | Tabular data with columns | Service health status |
| `text-block` | Descriptions, alerts, summaries | "System operating normally" |
| `list` | Sequential items, logs | Deployment history |
| `timeline` | Chronological events | Incident log |
| `log-view` | Log entries with timestamps | Application logs |

## Implementation Workflow

### For Backend Developers

1. **Query your data**
   ```python
   uptime = db.query("SELECT uptime FROM metrics WHERE ...")
   response_time = db.query("SELECT avg(response_time) FROM api_logs")
   ```

2. **Structure as ViewSpec**
   ```python
   viewspec = {
     "version": "1.0.0",
     "view": "dashboard",
     "sections": [
       {
         "components": [
           { "type": "metric-grid", "items": [...] },
           { "type": "chart", "series": [...] }
         ]
       }
     ]
   }
   ```

3. **Return from API**
   ```python
   @app.route('/api/dashboard')
   def dashboard():
     return jsonify(viewspec)
   ```

### For Frontend Developers

1. **Fetch ViewSpec**
   ```javascript
   const response = await fetch('/api/dashboard');
   const viewspec = await response.json();
   ```

2. **Render with Adaptive UI**
   ```javascript
   const { renderToHtml } = require('adaptiveui');
   const html = renderToHtml(viewspec).html;
   ```

3. **Display to users**
   ```javascript
   document.getElementById('dashboard').innerHTML = html;
   ```

## Benefits

### For Product Teams
✅ **Reusable dashboards** - One backend API can serve web, mobile, apps  
✅ **Consistent UI** - All customers see the same professional design  
✅ **Easy updates** - Change visualization without backend changes  
✅ **Faster to market** - No custom dashboard code needed  

### For Data Teams
✅ **Clear contract** - Know exactly what data structure to provide  
✅ **Type-safe** - Use TypeScript for validation  
✅ **Performance** - No LLM processing, pure data rendering  
✅ **Scalability** - Serve unlimited frontend apps from one backend  

### For Frontend Teams
✅ **No custom code** - Adaptive UI handles all visualization  
✅ **Consistency** - All dashboards look professional and responsive  
✅ **Fast loading** - Pure HTML/CSS/JS, no runtime processing  
✅ **Accessibility** - Built-in ARIA labels and semantic HTML  

### For DevOps
✅ **Stateless** - No session management needed  
✅ **Caching** - ViewSpec is JSON, easy to cache at CDN  
✅ **Monitoring** - Simple JSON schema to validate  
✅ **Versioning** - Semantic versioning of ViewSpec contracts  

## Deployment Patterns

### Pattern 1: Server-Side Rendering
```
User Request → Backend API → ViewSpec → Adaptive UI Renders → Sends HTML
```
Best for: Static dashboards, server-heavy architectures

### Pattern 2: Client-Side Rendering
```
User Request → Frontend → Backend API → ViewSpec → Browser Renders HTML
```
Best for: SPAs, real-time dashboards, offline support

### Pattern 3: Hybrid
```
Initial Load: Server renders HTML
Updates: Browser fetches new ViewSpec and re-renders
```
Best for: Performance and interactivity

## Scaling Considerations

### Caching ViewSpec
```javascript
// Cache for 5 minutes
app.get('/api/dashboard', cacheMiddleware(300), (req, res) => {
  const viewspec = createViewSpec();
  res.json(viewspec);
});
```

### Database Query Optimization
```python
# Use prepared statements
@app.route('/api/dashboard')
def dashboard():
  # Use indexes on frequently queried columns
  metrics = db.query(
    "SELECT uptime FROM metrics WHERE timestamp > NOW() - INTERVAL 24h",
    indexes=['timestamp', 'metric_type']
  )
  return viewspec(metrics)
```

### Handling Large Datasets
```python
# Paginate if needed
@app.route('/api/dashboard/table')
def table_data():
  limit = request.args.get('limit', 100)
  offset = request.args.get('offset', 0)
  rows = db.query(f"... LIMIT {limit} OFFSET {offset}")
  return viewspec_table(rows)
```

## Type Safety with TypeScript

### Backend (Node.js)
```typescript
import { ViewSpec, MetricItem, ChartComponent } from 'adaptiveui/types';

function createDashboard(): ViewSpec {
  return {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Engineering Dashboard',
    sections: [{
      components: [{
        type: 'metric-grid',
        items: [
          // TypeScript validates this structure
        ] as MetricItem[]
      }]
    }]
  };
}
```

### Frontend (Rendering)
```typescript
import { renderToHtml, ViewSpec } from 'adaptiveui';

const viewspec: ViewSpec = await fetch('/api/dashboard').then(r => r.json());
const html = renderToHtml(viewspec).html;  // Type-safe
```

## Versioning Your Contract

As requirements evolve:

```json
{
  "version": "2.0.0",
  "view": "dashboard",
  "sections": [
    {
      "components": [
        {
          "type": "metric-grid",
          "newFeature": "custom_styling"  // New in 2.0.0
        }
      ]
    }
  ]
}
```

Rules:
- **PATCH** (1.0.1): Bug fixes, no structure changes
- **MINOR** (1.1.0): Add new optional fields
- **MAJOR** (2.0.0): Breaking changes, remove fields

## Real-World Examples

See `examples/` directory:
- `engineering-dashboard.json` - Full featured dashboard
- `simple-dashboard.json` - Minimal example
- `executive-summary.json` - Executive dashboard
- `backend_example.py` - Python backend
- `backend_example.js` - Node.js backend

## Next Steps

1. **Read Data Contract Guide** - `docs/data-contract.md`
2. **Review Examples** - `examples/` directory
3. **Run Backend Example** - `python examples/backend_example.py`
4. **Create Your ViewSpec** - Follow getting-started guide
5. **Render Dashboard** - `npm run cli -- render my-data.json -o dashboard.html`

## Summary

Adaptive UI provides a **clean contract** between backends and frontends:
- ✅ Backends focus on data query and structure
- ✅ Adaptive UI handles all visualization logic
- ✅ Frontends display without custom code
- ✅ No AI/LLM overhead
- ✅ Type-safe, reusable, scalable

This separation of concerns makes it easier to:
- 🚀 Build dashboards faster
- 🎨 Design consistently
- 📈 Scale across multiple apps
- 🔄 Maintain and evolve independently
- 🛡️ Ensure data quality and security
