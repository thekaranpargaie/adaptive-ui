/**
 * Chart Component Renderer
 *
 * Renders charts using Chart.js library
 */

import { ChartComponent } from '../../types/viewspec.js';
import { RenderContext, ComponentRenderPlan } from '../types.js';
import { div, escapeHtml } from '../html-utils.js';

/**
 * Generate unique ID for chart canvas
 */
function generateChartId(): string {
  return `chart-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Convert chart type to Chart.js compatible type
 */
function getChartType(type: string): string {
  const typeMap: Record<string, string> = {
    'line': 'line',
    'bar': 'bar',
    'area': 'line',
    'pie': 'pie',
    'doughnut': 'doughnut',
  };
  return typeMap[type] || 'line';
}

/**
 * Generate Chart.js configuration
 */
function generateChartConfig(component: ChartComponent): string {
  const chartType = getChartType(component.chartType);
  const labels = component.series[0]?.data.map((d) => d.x) || [];
  
  const datasets = component.series.map((series) => ({
    label: series.name,
    data: series.data.map((d) => d.y),
    borderColor: series.color,
    backgroundColor: series.color + '33', // Add transparency
    fill: component.chartType === 'area',
    tension: 0.3,
    pointRadius: 3,
    pointHoverRadius: 5,
  }));

  const config = {
    type: chartType,
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: component.legend !== false,
          position: 'top',
        },
        title: {
          display: !!component.title,
          text: component.title,
        },
      },
      scales: component.chartType !== 'pie' ? {
        x: {
          title: {
            display: !!component.xAxis?.label,
            text: component.xAxis?.label,
          },
        },
        y: {
          title: {
            display: !!component.yAxis?.label,
            text: component.yAxis?.label,
          },
          min: component.yAxis?.min,
        },
      } : {},
    },
  };

  return JSON.stringify(config);
}

/**
 * Render chart component using Chart.js
 */
export function renderChart(
  component: ChartComponent,
  _context: RenderContext,
): ComponentRenderPlan {
  const height = component.height || 300;
  const canvasId = generateChartId();
  const configJson = generateChartConfig(component);
  
  const title = component.title
    ? `<h3 class="adaptiveui-component-title">${escapeHtml(component.title)}</h3>`
    : '';

  const html = div(
    {
      class: 'adaptiveui-component',
      'data-component': 'chart',
      'data-chart-id': canvasId,
      'data-chart-config': configJson,
    },
    `
      ${title}
      <div class="chart-container" style="position: relative; height: ${height}px; width: 100%;">
        <canvas id="${canvasId}" style="width: 100%; height: 100%;"></canvas>
      </div>
    `.trim(),
  );

  return {
    type: 'chart',
    component,
    html,
    classes: ['chart-container'],
    dataAttributes: {
      component: 'chart',
      'chart-type': component.chartType,
      'chart-id': canvasId,
      'chart-config': configJson,
      series: String(component.series.length),
    },
  };
}
