# Components Reference

Available UI components for building adaptive interfaces.

## Layout Components

### Frame
Container for grouping other components.

```json
{
  "type": "frame",
  "props": {
    "layout": "flex",
    "direction": "row",
    "gap": 16
  }
}
```

## Data Display Components

### Chart
Render interactive charts (bar, line, pie, etc.).

```json
{
  "type": "chart",
  "props": {
    "chartType": "bar",
    "title": "Sales Data",
    "xAxis": "month",
    "yAxis": "revenue"
  }
}
```

### Table
Display tabular data with sorting and filtering.

```json
{
  "type": "table",
  "props": {
    "columns": ["id", "name", "status"],
    "striped": true,
    "sortable": true
  }
}
```

### Metric
Show key performance indicators.

```json
{
  "type": "metric",
  "props": {
    "label": "Total Revenue",
    "value": "$1,234,567",
    "trend": "+12%"
  }
}
```

### List
Render lists of items.

```json
{
  "type": "list",
  "props": {
    "items": ["item1", "item2"],
    "style": "bullets"
  }
}
```

## Media Components

### Image
Display images.

```json
{
  "type": "image",
  "props": {
    "src": "/path/to/image.png",
    "alt": "Description",
    "width": 300,
    "height": 200
  }
}
```

## Text Components

### Text
Display text content.

```json
{
  "type": "text",
  "props": {
    "content": "Your text here",
    "fontSize": 16,
    "color": "#333"
  }
}
```

### Heading
Display headings.

```json
{
  "type": "heading",
  "props": {
    "level": 1,
    "content": "Section Title"
  }
}
```

## Input Components

### Input
Text input field.

```json
{
  "type": "input",
  "props": {
    "placeholder": "Enter text...",
    "type": "text"
  }
}
```

### Button
Clickable button.

```json
{
  "type": "button",
  "props": {
    "label": "Click Me",
    "variant": "primary"
  }
}
```

## Component Properties

All components support:
- `id`: Unique identifier
- `className`: CSS class names
- `style`: Inline styles
- `visible`: Show/hide component
- `disabled`: Enable/disable interaction

## Custom Components

Register custom components in the component registry for use in specifications.
