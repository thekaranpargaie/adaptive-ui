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

// Example ViewSpecs
const examples = {
  simple: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Simple Dashboard',
    description: 'A basic dashboard with metrics',
    sections: [
      {
        id: 'metrics',
        title: 'KPIs',
        layout: { type: 'grid', columns: 3 },
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
              }
            ]
          }
        ]
      }
    ]
  },
  
  charts: {
    version: '1.0.0',
    view: 'dashboard',
    title: 'Charts & Tables',
    description: 'Interactive charts and data tables',
    sections: [
      {
        id: 'charts',
        title: 'Performance Metrics',
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
        id: 'tables',
        title: 'Recent Orders',
        layout: { type: 'grid', columns: 1 },
        components: [
          {
            type: 'table',
            title: 'Latest Transactions',
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
