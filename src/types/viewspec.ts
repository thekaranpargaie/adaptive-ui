/**
 * ViewSpec Type Definitions
 *
 * Core TypeScript interfaces for the AdaptiveUI ViewSpec protocol.
 * Version: 1.0.0
 */

/**
 * Metadata attached to any ViewSpec or component
 */
export interface Metadata {
  /** Unique identifier for the view or component */
  id?: string;
  /** Creation timestamp */
  createdAt?: string;
  /** Last updated timestamp */
  updatedAt?: string;
  /** Semantic version of the ViewSpec schema */
  version?: string;
  /** Custom key-value pairs */
  [key: string]: unknown;
}

/**
 * Spacing and padding tokens
 */
export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveBreakpoint {
  /** Minimum width in pixels */
  minWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Columns for grid layouts at this breakpoint */
  columns?: number;
  /** Layout direction at this breakpoint */
  direction?: 'horizontal' | 'vertical';
}

/**
 * Layout configuration base
 */
export interface BaseLayout {
  type: 'grid' | 'stack' | 'flow';
  spacing?: SpacingToken;
  padding?: SpacingToken;
  responsive?: Record<string, ResponsiveBreakpoint>;
}

/**
 * Grid layout configuration
 */
export interface GridLayout extends BaseLayout {
  type: 'grid';
  /** Number of columns */
  columns?: number;
  /** Gap between grid items */
  gap?: SpacingToken;
  /** Auto-fit or auto-fill behavior */
  autoFlow?: 'row' | 'column' | 'dense';
}

/**
 * Stack layout configuration (vertical or horizontal)
 */
export interface StackLayout extends BaseLayout {
  type: 'stack';
  /** Stack direction */
  direction?: 'horizontal' | 'vertical';
  /** Alignment of items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify content */
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

/**
 * Flow layout configuration (natural document flow)
 */
export interface FlowLayout extends BaseLayout {
  type: 'flow';
  /** Maximum width for content */
  maxWidth?: string;
}

export type Layout = GridLayout | StackLayout | FlowLayout;

/**
 * Metric item for metric-grid component
 */
export interface MetricItem {
  /** Label for the metric */
  label: string;
  /** Numeric or string value */
  value: string | number;
  /** Optional unit (%, ms, MB, etc.) */
  unit?: string;
  /** Trend indicator */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value?: string | number;
    label?: string;
  };
  /** Emphasis level */
  emphasis?: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Metric Grid Component
 */
export interface MetricGridComponent {
  type: 'metric-grid';
  /** List of metrics to display */
  items: MetricItem[];
  /** Number of columns for the grid */
  columns?: number;
  /** Optional component title */
  title?: string;
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  /** X-axis value (timestamp, category, etc.) */
  x: string | number;
  /** Y-axis value */
  y: number;
  /** Optional label */
  label?: string;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Chart series
 */
export interface ChartSeries {
  /** Series name */
  name: string;
  /** Data points */
  data: ChartDataPoint[];
  /** Series color */
  color?: string;
}

/**
 * Chart Component
 */
export interface ChartComponent {
  type: 'chart';
  /** Chart type */
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'area';
  /** Chart title */
  title?: string;
  /** Data series */
  series: ChartSeries[];
  /** X-axis configuration */
  xAxis?: {
    label?: string;
    type?: 'linear' | 'time' | 'category';
  };
  /** Y-axis configuration */
  yAxis?: {
    label?: string;
    min?: number;
    max?: number;
  };
  /** Chart height in pixels */
  height?: number;
  /** Show legend */
  legend?: boolean;
}

/**
 * Table column definition
 */
export interface TableColumn {
  /** Column key */
  key: string;
  /** Column header label */
  label: string;
  /** Column width (CSS value or 'auto') */
  width?: string;
  /** Data type for proper formatting */
  type?: 'text' | 'number' | 'date' | 'boolean';
  /** Alignment */
  align?: 'left' | 'center' | 'right';
  /** Is sortable */
  sortable?: boolean;
}

/**
 * Table row data
 */
export type TableRow = Record<string, unknown>;

/**
 * Table Component
 */
export interface TableComponent {
  type: 'table';
  /** Column definitions */
  columns: TableColumn[];
  /** Row data */
  rows: TableRow[];
  /** Table title */
  title?: string;
  /** Show header */
  showHeader?: boolean;
  /** Enable striped rows */
  striped?: boolean;
  /** Enable hover effect */
  hover?: boolean;
  /** Compact mode */
  compact?: boolean;
}

/**
 * Log entry
 */
export interface LogEntry {
  /** Timestamp */
  timestamp: string;
  /** Severity level */
  level: 'debug' | 'info' | 'warn' | 'error' | 'critical';
  /** Log message */
  message: string;
  /** Optional source/logger name */
  source?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Log View Component
 */
export interface LogViewComponent {
  type: 'log-view';
  /** Log entries */
  entries: LogEntry[];
  /** Component title */
  title?: string;
  /** Maximum number of entries to display */
  maxEntries?: number;
  /** Show timestamps */
  showTimestamp?: boolean;
  /** Show source */
  showSource?: boolean;
}

/**
 * Timeline event
 */
export interface TimelineEvent {
  /** Event ID */
  id?: string;
  /** Event timestamp */
  timestamp: string;
  /** Event title */
  title: string;
  /** Event description */
  description?: string;
  /** Event type/category */
  category?: string;
  /** Is milestone */
  milestone?: boolean;
  /** Event status */
  status?: 'pending' | 'in-progress' | 'completed' | 'failed';
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Timeline Component
 */
export interface TimelineComponent {
  type: 'timeline';
  /** Timeline events */
  events: TimelineEvent[];
  /** Component title */
  title?: string;
  /** Timeline orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Show connecting lines */
  showLines?: boolean;
}

/**
 * Text Block Component
 */
export interface TextBlockComponent {
  type: 'text-block';
  /** Text content */
  content: string;
  /** Content format */
  format?: 'plain' | 'markdown';
  /** Emphasis level */
  emphasis?: 'low' | 'medium' | 'high';
  /** Optional title */
  title?: string;
}

/**
 * List item
 */
export interface ListItem {
  /** Item content */
  content: string;
  /** Nested items */
  children?: ListItem[];
  /** Item metadata */
  metadata?: Record<string, unknown>;
}

/**
 * List Component
 */
export interface ListComponent {
  type: 'list';
  /** List type */
  listType: 'ordered' | 'unordered' | 'definition';
  /** List items */
  items: ListItem[];
  /** Component title */
  title?: string;
}

/**
 * Union type of all component types
 */
export type Component =
  | MetricGridComponent
  | ChartComponent
  | TableComponent
  | LogViewComponent
  | TimelineComponent
  | TextBlockComponent
  | ListComponent;

/**
 * Section within a ViewSpec
 */
export interface Section {
  /** Section ID */
  id?: string;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Layout configuration */
  layout?: Layout;
  /** Components within this section */
  components: Component[];
  /** Section metadata */
  metadata?: Metadata;
}

/**
 * Complete ViewSpec document
 */
export interface ViewSpec {
  /** ViewSpec schema version */
  version: string;
  /** View type identifier */
  view: string;
  /** View title */
  title: string;
  /** View description */
  description?: string;
  /** Sections containing components */
  sections: Section[];
  /** Global metadata */
  metadata?: Metadata;
}
