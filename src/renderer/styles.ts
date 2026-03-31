/**
 * Styling System
 *
 * CSS design tokens and base styles
 */

/**
 * Design tokens
 */
export const tokens = {
  // Colors
  colors: {
    primary: '#0066cc',
    primaryHover: '#0052a3',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#17a2b8',
    
    text: '#212529',
    textMuted: '#6c757d',
    textLight: '#ffffff',
    
    background: '#ffffff',
    backgroundAlt: '#f8f9fa',
    border: '#dee2e6',
    borderLight: '#e9ecef',
    
    // Dark mode
    darkBackground: '#1a1a1a',
    darkBackgroundAlt: '#2d2d2d',
    darkText: '#e9ecef',
    darkTextMuted: '#adb5bd',
    darkBorder: '#495057',
    
    // Severity levels
    debugLevel: '#6c757d',
    infoLevel: '#17a2b8',
    warnLevel: '#ffc107',
    errorLevel: '#dc3545',
    criticalLevel: '#bd2130',
    
    // Trend indicators
    trendUp: '#28a745',
    trendDown: '#dc3545',
    trendNeutral: '#6c757d',
    
    // Emphasis
    emphasisLow: '#6c757d',
    emphasisMedium: '#0066cc',
    emphasisHigh: '#ffc107',
    emphasisCritical: '#dc3545',
  },

  // Typography
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Spacing
  spacing: {
    none: '0',
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

/**
 * Generate base CSS
 */
export function generateBaseCSS(): string {
  return `
/* AdaptiveUI Base Styles */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-primary: ${tokens.colors.primary};
  --color-text: ${tokens.colors.text};
  --color-text-muted: ${tokens.colors.textMuted};
  --color-background: ${tokens.colors.background};
  --color-background-alt: ${tokens.colors.backgroundAlt};
  --color-border: ${tokens.colors.border};
  
  --font-family: ${tokens.typography.fontFamily};
  --font-family-mono: ${tokens.typography.fontFamilyMono};
  --font-size-base: ${tokens.typography.fontSize.base};
  --line-height-normal: ${tokens.typography.lineHeight.normal};
  
  --spacing-xs: ${tokens.spacing.xs};
  --spacing-sm: ${tokens.spacing.sm};
  --spacing-md: ${tokens.spacing.md};
  --spacing-lg: ${tokens.spacing.lg};
  --spacing-xl: ${tokens.spacing.xl};
  --spacing-2xl: ${tokens.spacing['2xl']};
  
  --border-radius: ${tokens.borderRadius.base};
  --shadow-base: ${tokens.shadows.base};
}

[data-theme="dark"] {
  --color-text: ${tokens.colors.darkText};
  --color-text-muted: ${tokens.colors.darkTextMuted};
  --color-background: ${tokens.colors.darkBackground};
  --color-background-alt: ${tokens.colors.darkBackgroundAlt};
  --color-border: ${tokens.colors.darkBorder};
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text);
  background-color: var(--color-background);
}

/* AdaptiveUI Container */
.adaptiveui-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.adaptiveui-header {
  margin-bottom: var(--spacing-xl);
}

.adaptiveui-title {
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.adaptiveui-description {
  font-size: ${tokens.typography.fontSize.lg};
  color: var(--color-text-muted);
  line-height: ${tokens.typography.lineHeight.relaxed};
}

/* Section Styles */
.adaptiveui-section {
  margin-bottom: var(--spacing-2xl);
}

.adaptiveui-section-header {
  margin-bottom: var(--spacing-lg);
}

.adaptiveui-section-title {
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.semibold};
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
}

.adaptiveui-section-description {
  color: var(--color-text-muted);
}

/* Component Base */
.adaptiveui-component {
  background: var(--color-background);
  border-radius: var(--border-radius);
}

.adaptiveui-component-title {
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

/* Utility Classes */
.spacing-none { gap: ${tokens.spacing.none}; }
.spacing-xs { gap: ${tokens.spacing.xs}; }
.spacing-sm { gap: ${tokens.spacing.sm}; }
.spacing-md { gap: ${tokens.spacing.md}; }
.spacing-lg { gap: ${tokens.spacing.lg}; }
.spacing-xl { gap: ${tokens.spacing.xl}; }
.spacing-2xl { gap: ${tokens.spacing['2xl']}; }

.padding-none { padding: ${tokens.spacing.none}; }
.padding-xs { padding: ${tokens.spacing.xs}; }
.padding-sm { padding: ${tokens.spacing.sm}; }
.padding-md { padding: ${tokens.spacing.md}; }
.padding-lg { padding: ${tokens.spacing.lg}; }
.padding-xl { padding: ${tokens.spacing.xl}; }
.padding-2xl { padding: ${tokens.spacing['2xl']}; }
`.trim();
}

/**
 * Generate component-specific CSS
 */
export function generateComponentCSS(): string {
  return `
/* Metric Grid Component */
.metric-grid {
  display: grid;
  gap: var(--spacing-md);
}

.metric-grid-1-col { grid-template-columns: repeat(1, 1fr); }
.metric-grid-2-col { grid-template-columns: repeat(2, 1fr); }
.metric-grid-3-col { grid-template-columns: repeat(3, 1fr); }
.metric-grid-4-col { grid-template-columns: repeat(4, 1fr); }
.metric-grid-5-col { grid-template-columns: repeat(5, 1fr); }
.metric-grid-6-col { grid-template-columns: repeat(6, 1fr); }

.metric-item {
  padding: var(--spacing-md);
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.metric-label {
  font-size: ${tokens.typography.fontSize.sm};
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-value {
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: var(--color-text);
}

.metric-unit {
  font-size: ${tokens.typography.fontSize.lg};
  color: var(--color-text-muted);
  margin-left: var(--spacing-xs);
}

.metric-trend {
  margin-top: var(--spacing-xs);
  font-size: ${tokens.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.metric-trend-up { color: ${tokens.colors.trendUp}; }
.metric-trend-down { color: ${tokens.colors.trendDown}; }
.metric-trend-neutral { color: ${tokens.colors.trendNeutral}; }

.metric-emphasis-low { border-left: 3px solid ${tokens.colors.emphasisLow}; }
.metric-emphasis-medium { border-left: 3px solid ${tokens.colors.emphasisMedium}; }
.metric-emphasis-high { border-left: 3px solid ${tokens.colors.emphasisHigh}; }
.metric-emphasis-critical { border-left: 3px solid ${tokens.colors.emphasisCritical}; }

/* Table Component */
.adaptiveui-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-base);
}

.adaptiveui-table thead {
  background: var(--color-background-alt);
}

.adaptiveui-table th {
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
  font-weight: ${tokens.typography.fontWeight.semibold};
  font-size: ${tokens.typography.fontSize.sm};
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.adaptiveui-table td {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.adaptiveui-table tbody tr:last-child td {
  border-bottom: none;
}

.adaptiveui-table-striped tbody tr:nth-child(even) {
  background: var(--color-background-alt);
}

.adaptiveui-table-hover tbody tr:hover {
  background: var(--color-background-alt);
}

.adaptiveui-table-compact th,
.adaptiveui-table-compact td {
  padding: var(--spacing-xs) var(--spacing-sm);
}

.table-align-left { text-align: left; }
.table-align-center { text-align: center; }
.table-align-right { text-align: right; }

/* Log View Component */
.log-view {
  font-family: var(--font-family-mono);
  font-size: ${tokens.typography.fontSize.sm};
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  max-height: 500px;
  overflow-y: auto;
}

.log-entry {
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  gap: var(--spacing-md);
}

.log-entry:last-child {
  border-bottom: none;
}

.log-timestamp {
  color: var(--color-text-muted);
  flex-shrink: 0;
  width: 180px;
}

.log-level {
  font-weight: ${tokens.typography.fontWeight.semibold};
  text-transform: uppercase;
  flex-shrink: 0;
  width: 80px;
}

.log-level-debug { color: ${tokens.colors.debugLevel}; }
.log-level-info { color: ${tokens.colors.infoLevel}; }
.log-level-warn { color: ${tokens.colors.warnLevel}; }
.log-level-error { color: ${tokens.colors.errorLevel}; }
.log-level-critical { color: ${tokens.colors.criticalLevel}; }

.log-source {
  color: var(--color-text-muted);
  flex-shrink: 0;
  width: 120px;
}

.log-message {
  flex: 1;
  color: var(--color-text);
  word-break: break-word;
}

/* Timeline Component */
.timeline {
  position: relative;
  padding: var(--spacing-md) 0;
}

.timeline-vertical {
  padding-left: var(--spacing-xl);
}

.timeline-vertical::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.timeline-event {
  position: relative;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.timeline-vertical .timeline-event {
  margin-left: var(--spacing-lg);
}

.timeline-event::before {
  content: '';
  position: absolute;
  left: -26px;
  top: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${tokens.colors.primary};
  border: 2px solid var(--color-background);
}

.timeline-event-milestone::before {
  width: 16px;
  height: 16px;
  left: -28px;
  background: ${tokens.colors.warning};
}

.timeline-event-header {
  margin-bottom: var(--spacing-sm);
}

.timeline-event-timestamp {
  font-size: ${tokens.typography.fontSize.sm};
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.timeline-event-title {
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: var(--color-text);
}

.timeline-event-description {
  color: var(--color-text-muted);
}

.timeline-event-status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: ${tokens.borderRadius.base};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  margin-top: var(--spacing-xs);
}

.timeline-event-status-pending { background: ${tokens.colors.secondary}; color: white; }
.timeline-event-status-in-progress { background: ${tokens.colors.info}; color: white; }
.timeline-event-status-completed { background: ${tokens.colors.success}; color: white; }
.timeline-event-status-failed { background: ${tokens.colors.danger}; color: white; }

/* Text Block Component */
.text-block {
  padding: var(--spacing-md);
}

.text-block-content {
  color: var(--color-text);
  line-height: ${tokens.typography.lineHeight.relaxed};
}

.text-block-emphasis-low .text-block-content {
  color: var(--color-text-muted);
}

.text-block-emphasis-medium .text-block-content {
  font-weight: ${tokens.typography.fontWeight.medium};
}

.text-block-emphasis-high .text-block-content {
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.emphasisHigh};
}

/* List Component */
.adaptiveui-list {
  padding: var(--spacing-md);
}

.adaptiveui-list ul,
.adaptiveui-list ol {
  padding-left: var(--spacing-lg);
}

.adaptiveui-list li {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.adaptiveui-list dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-sm) var(--spacing-md);
}

.adaptiveui-list dt {
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: var(--color-text);
}

.adaptiveui-list dd {
  color: var(--color-text-muted);
}

/* Chart Component */
.chart-container {
  padding: var(--spacing-md);
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border: 2px dashed var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-text-muted);
  font-style: italic;
  min-height: 300px;
}

/* Layout Components */
.layout-grid {
  display: grid;
}

.layout-stack {
  display: flex;
}

.layout-stack-horizontal {
  flex-direction: row;
}

.layout-stack-vertical {
  flex-direction: column;
}

.layout-flow {
  display: block;
}

.align-start { align-items: flex-start; }
.align-center { align-items: center; }
.align-end { align-items: flex-end; }
.align-stretch { align-items: stretch; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-space-between { justify-content: space-between; }
.justify-space-around { justify-content: space-around; }
.justify-space-evenly { justify-content: space-evenly; }

/* Responsive */
@media (max-width: ${tokens.breakpoints.md}) {
  .metric-grid-2-col,
  .metric-grid-3-col,
  .metric-grid-4-col,
  .metric-grid-5-col,
  .metric-grid-6-col {
    grid-template-columns: repeat(1, 1fr);
  }
  
  .layout-stack-horizontal {
    flex-direction: column;
  }
}

@media (max-width: ${tokens.breakpoints.sm}) {
  .adaptiveui-container {
    padding: var(--spacing-md);
  }
  
  .log-timestamp {
    width: auto;
  }
  
  .log-source {
    display: none;
  }
}
`.trim();
}

/**
 * Generate complete CSS
 */
export function generateCSS(): string {
  return `${generateBaseCSS()}\n\n${generateComponentCSS()}`;
}
