/**
 * Adaptive UI Playground Server
 * 
 * Demonstrates how to use Adaptive UI as a package.
 * Uses REAL library functions from dist/
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Import from the compiled dist directory (this is how users will import)
const { renderViewSpec, validateViewSpec } = require('../dist/index.js');

const PORT = 3000;

// Example ViewSpecs - Comprehensive examples for all component types
const examples = {
  metrics: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Metric Grid - KPIs',
    description: 'Display key performance indicators with trends',
    sections: [
      {
        id: 'metrics-section',
        title: 'Business Metrics',
        layout: { type: 'grid', columns: 4 },
        components: [
          {
            type: 'metric-grid',
            items: [
              {
                label: 'Total Users',
                value: 24500,
                unit: 'users',
                trend: { direction: 'up', value: '12%' }
              },
              {
                label: 'Revenue',
                value: 145250,
                unit: 'USD',
                trend: { direction: 'up', value: '8%' }
              },
              {
                label: 'Conversion Rate',
                value: 3.24,
                unit: '%',
                trend: { direction: 'down', value: '0.5%' }
              },
              {
                label: 'Active Sessions',
                value: 892,
                unit: 'sessions',
                trend: { direction: 'up', value: '23%' }
              }
            ]
          }
        ]
      }
    ]
  },

  lineChart: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Line Chart - Trends',
    description: 'Visualize trends over time with line charts',
    sections: [
      {
        id: 'line-charts',
        title: 'Performance Trends',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'chart',
            chartType: 'line',
            title: 'User Growth Over Time',
            height: 400,
            series: [
              {
                name: 'Active Users',
                color: '#3b82f6',
                data: [
                  { x: 'Jan', y: 10000 },
                  { x: 'Feb', y: 15000 },
                  { x: 'Mar', y: 18000 },
                  { x: 'Apr', y: 22000 },
                  { x: 'May', y: 24500 },
                  { x: 'Jun', y: 28000 }
                ]
              },
              {
                name: 'New Users',
                color: '#10b981',
                data: [
                  { x: 'Jan', y: 2000 },
                  { x: 'Feb', y: 3200 },
                  { x: 'Mar', y: 3500 },
                  { x: 'Apr', y: 4200 },
                  { x: 'May', y: 4800 },
                  { x: 'Jun', y: 5200 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  barChart: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Bar Chart - Comparisons',
    description: 'Compare values across categories with bar charts',
    sections: [
      {
        id: 'bar-charts',
        title: 'Sales by Region',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'chart',
            chartType: 'bar',
            title: 'Revenue by Product Line',
            height: 400,
            series: [
              {
                name: 'Q1',
                color: '#3b82f6',
                data: [
                  { x: 'Product A', y: 50000 },
                  { x: 'Product B', y: 45000 },
                  { x: 'Product C', y: 30000 },
                  { x: 'Product D', y: 20250 },
                  { x: 'Product E', y: 15000 }
                ]
              },
              {
                name: 'Q2',
                color: '#10b981',
                data: [
                  { x: 'Product A', y: 60000 },
                  { x: 'Product B', y: 52000 },
                  { x: 'Product C', y: 38000 },
                  { x: 'Product D', y: 25000 },
                  { x: 'Product E', y: 18000 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  pieChart: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Pie Chart - Distribution',
    description: 'Show parts of a whole with pie charts',
    sections: [
      {
        id: 'pie-charts',
        title: 'Market Share',
        layout: { type: 'grid', columns: 2 },
        components: [
          {
            type: 'chart',
            chartType: 'pie',
            title: 'Revenue Distribution',
            height: 300,
            series: [
              {
                name: 'Revenue',
                data: [
                  { x: 'Product A', y: 35 },
                  { x: 'Product B', y: 28 },
                  { x: 'Product C', y: 22 },
                  { x: 'Product D', y: 15 }
                ]
              }
            ]
          },
          {
            type: 'chart',
            chartType: 'doughnut',
            title: 'User Distribution',
            height: 300,
            series: [
              {
                name: 'Users',
                data: [
                  { x: 'Free Tier', y: 45 },
                  { x: 'Pro Tier', y: 35 },
                  { x: 'Enterprise', y: 20 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  areaChart: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Area Chart - Cumulative',
    description: 'Display cumulative values with area charts',
    sections: [
      {
        id: 'area-charts',
        title: 'Cumulative Metrics',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'chart',
            chartType: 'area',
            title: 'Cumulative Revenue',
            height: 400,
            series: [
              {
                name: 'Revenue',
                color: '#10b981',
                data: [
                  { x: 'Jan', y: 50000 },
                  { x: 'Feb', y: 95000 },
                  { x: 'Mar', y: 145000 },
                  { x: 'Apr', y: 210000 },
                  { x: 'May', y: 290000 },
                  { x: 'Jun', y: 385000 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  table: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Table - Data Grid',
    description: 'Display structured data in table format',
    sections: [
      {
        id: 'table-section',
        title: 'Recent Transactions',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'table',
            title: 'Latest Orders',
            columns: [
              { key: 'id', label: 'Order ID' },
              { key: 'date', label: 'Date' },
              { key: 'customer', label: 'Customer' },
              { key: 'product', label: 'Product' },
              { key: 'amount', label: 'Amount', align: 'right' },
              { key: 'status', label: 'Status' }
            ],
            rows: [
              { id: '#1001', date: '2024-03-15', customer: 'John Doe', product: 'Pro Plan', amount: '$1,250', status: 'Complete' },
              { id: '#1002', date: '2024-03-14', customer: 'Jane Smith', product: 'Enterprise', amount: '$5,000', status: 'Complete' },
              { id: '#1003', date: '2024-03-13', customer: 'Bob Johnson', product: 'Starter', amount: '$290', status: 'Pending' },
              { id: '#1004', date: '2024-03-12', customer: 'Alice Williams', product: 'Pro Plan', amount: '$1,250', status: 'Complete' },
              { id: '#1005', date: '2024-03-11', customer: 'Charlie Brown', product: 'Basic', amount: '$50', status: 'Failed' }
            ]
          }
        ]
      }
    ]
  },

  timeline: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Timeline - Events',
    description: 'Display chronological events in a timeline',
    sections: [
      {
        id: 'timeline-section',
        title: 'Project Timeline',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'timeline',
            title: 'Release Schedule',
            events: [
              { date: '2024-01-15', title: 'Beta Launch', description: 'Initial beta release to early adopters', status: 'completed' },
              { date: '2024-02-01', title: 'Feature: Analytics', description: 'Added comprehensive analytics dashboard', status: 'completed' },
              { date: '2024-02-28', title: 'V1.0 Release', description: 'Public release of version 1.0', status: 'completed' },
              { date: '2024-03-15', title: 'Feature: API', description: 'RESTful API now available', status: 'in-progress' },
              { date: '2024-04-30', title: 'V1.5 Planned', description: 'Next major update with new features', status: 'planned' }
            ]
          }
        ]
      }
    ]
  },

  list: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'List - Items',
    description: 'Display organized list of items',
    sections: [
      {
        id: 'list-section',
        title: 'Team Members',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'list',
            title: 'Active Team Members',
            items: [
              { label: 'Sarah Anderson', description: 'Product Manager - New York' },
              { label: 'Mike Chen', description: 'Senior Engineer - San Francisco' },
              { label: 'Emma Rodriguez', description: 'UX Designer - Austin' },
              { label: 'James Wilson', description: 'DevOps Engineer - Seattle' },
              { label: 'Lisa Thompson', description: 'Marketing Lead - Boston' }
            ]
          }
        ]
      }
    ]
  },

  logView: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Log View - Logs',
    description: 'Display application logs in a readable format',
    sections: [
      {
        id: 'log-section',
        title: 'System Logs',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'log-view',
            title: 'Application Logs',
            logs: [
              { timestamp: '2024-03-15T14:35:22Z', level: 'error', message: 'Database connection timeout on shard-3', source: 'database.ts:142' },
              { timestamp: '2024-03-15T14:34:10Z', level: 'warn', message: 'High memory usage detected (85%)', source: 'memory.ts:56' },
              { timestamp: '2024-03-15T14:32:45Z', level: 'info', message: 'Cache cleared successfully', source: 'cache.ts:89' },
              { timestamp: '2024-03-15T14:30:12Z', level: 'info', message: 'Backup completed - 2.3GB transferred', source: 'backup.ts:234' },
              { timestamp: '2024-03-15T14:28:33Z', level: 'warn', message: 'Slow query detected: execution time 2.5s', source: 'query.ts:156' }
            ]
          }
        ]
      }
    ]
  },

  textBlock: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Text Block - Content',
    description: 'Display formatted text content and descriptions',
    sections: [
      {
        id: 'text-section',
        title: 'Documentation',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'text-block',
            title: 'Getting Started Guide',
            content: 'Welcome to Adaptive UI! This comprehensive guide will help you understand how to create dynamic, responsive dashboards and data visualizations. Our system supports multiple visualization types including charts, tables, timelines, and more. Each component is designed to be flexible and easy to integrate into your existing applications.'
          },
          {
            type: 'text-block',
            title: 'Key Features',
            content: '• Responsive design that works on all devices\n• Multiple chart types: line, bar, pie, area\n• Interactive tables with sorting and filtering\n• Timeline for chronological events\n• Log view for application monitoring\n• Metric grids for KPI display\n• Fully customizable styling with CSS variables'
          }
        ]
      }
    ]
  },

  combined: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Combined - Complete Example',
    description: 'Comprehensive dashboard with all component types',
    sections: [
      {
        id: 'kpis-section',
        title: 'Key Performance Indicators',
        layout: { type: 'grid', columns: 4 },
        components: [
          {
            type: 'metric-grid',
            items: [
              { label: 'Total Users', value: 24500, unit: 'users', trend: { direction: 'up', value: '12%' } },
              { label: 'Revenue', value: 145250, unit: 'USD', trend: { direction: 'up', value: '8%' } },
              { label: 'Conversion', value: 3.24, unit: '%', trend: { direction: 'down', value: '0.5%' } },
              { label: 'Active Now', value: 892, unit: 'sessions', trend: { direction: 'up', value: '23%' } }
            ]
          }
        ]
      },
      {
        id: 'charts-section',
        title: 'Analytics',
        layout: { type: 'grid', columns: 2 },
        components: [
          {
            type: 'chart',
            chartType: 'line',
            title: 'User Growth',
            height: 300,
            series: [
              {
                name: 'Users',
                color: '#3b82f6',
                data: [
                  { x: 'Jan', y: 10000 },
                  { x: 'Feb', y: 15000 },
                  { x: 'Mar', y: 18000 },
                  { x: 'Apr', y: 22000 },
                  { x: 'May', y: 24500 }
                ]
              }
            ]
          },
          {
            type: 'chart',
            chartType: 'bar',
            title: 'Revenue by Product',
            height: 300,
            series: [
              {
                name: 'Revenue',
                color: '#10b981',
                data: [
                  { x: 'Product A', y: 50000 },
                  { x: 'Product B', y: 45000 },
                  { x: 'Product C', y: 30000 },
                  { x: 'Product D', y: 20250 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'table-section',
        title: 'Recent Transactions',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'table',
            title: 'Latest Orders',
            columns: [
              { key: 'id', label: 'Order ID' },
              { key: 'customer', label: 'Customer' },
              { key: 'amount', label: 'Amount', align: 'right' },
              { key: 'status', label: 'Status' }
            ],
            rows: [
              { id: '#1234', customer: 'John Doe', amount: '$1,250', status: 'Complete' },
              { id: '#1235', customer: 'Jane Smith', amount: '$2,100', status: 'Complete' },
              { id: '#1236', customer: 'Bob Johnson', amount: '$890', status: 'Pending' }
            ]
          }
        ]
      }
    ]
  }
};

/**
 * API Handler
 */
function handleRequest(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, 'http://' + req.headers.host);
  const pathname = url.pathname;

  if (pathname === '/api/examples') {
    handleGetExamples(res);
  } else if (pathname === '/api/render') {
    handleRender(req, res);
  } else if (pathname === '/api/validate') {
    handleValidate(req, res);
  } else if (pathname === '/playground.html' || pathname === '/') {
    servePlayground(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
}

/**
 * Get example ViewSpecs
 */
function handleGetExamples(res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    examples: Object.keys(examples).map(key => ({
      id: key,
      title: examples[key].title,
      description: examples[key].description
    })),
    data: examples
  }));
}

/**
 * Render ViewSpec using actual library function
 */
function handleRender(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const viewSpec = JSON.parse(body);
      
      // Validate first
      const validation = validateViewSpec(viewSpec);
      if (!validation.valid) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid ViewSpec', errors: validation.errors }));
        return;
      }
      
      // Render using actual library function
      const renderPlan = renderViewSpec(validation.data, {
        inlineCss: true,
        darkMode: false
      });
      
      // Return the HTML and CSS
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        html: renderPlan.html,
        css: renderPlan.css
      }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
}

/**
 * Validate ViewSpec using actual library function
 */
function handleValidate(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const viewSpec = JSON.parse(body);
      
      // Validate using actual library function
      const result = validateViewSpec(viewSpec);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        valid: false,
        error: error.message
      }));
    }
  });
}

/**
 * Serve the playground HTML
 */
function servePlayground(res) {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

// Start server
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log('');
  console.log('🎨 Adaptive UI Playground');
  console.log('='.repeat(50));
  console.log('');
  console.log('Server running at: http://localhost:' + PORT);
  console.log('');
  console.log('This playground demonstrates how to use Adaptive UI');
  console.log('as an integrated package using the actual library functions:');
  console.log('');
  console.log('  • renderViewSpec() - Real rendering from dist/');
  console.log('  • validateViewSpec() - Real validation from dist/');
  console.log('');
  console.log('Open http://localhost:' + PORT + ' in your browser');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});
