/**
 * Zod Validation Schemas for ViewSpec
 *
 * Comprehensive validation schemas matching the TypeScript types.
 */

import { z } from 'zod';

/**
 * Metadata schema
 */
export const MetadataSchema = z.record(z.unknown()).optional();

/**
 * Spacing token schema
 */
export const SpacingTokenSchema = z.enum([
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
]);

/**
 * Responsive breakpoint schema
 */
export const ResponsiveBreakpointSchema = z.object({
  minWidth: z.number().positive().optional(),
  maxWidth: z.number().positive().optional(),
  columns: z.number().int().positive().optional(),
  direction: z.enum(['horizontal', 'vertical']).optional(),
});

/**
 * Base layout schema
 */
const BaseLayoutSchema = z.object({
  spacing: SpacingTokenSchema.optional(),
  padding: SpacingTokenSchema.optional(),
  responsive: z.record(ResponsiveBreakpointSchema).optional(),
});

/**
 * Grid layout schema
 */
export const GridLayoutSchema = BaseLayoutSchema.extend({
  type: z.literal('grid'),
  columns: z.number().int().positive().optional(),
  gap: SpacingTokenSchema.optional(),
  autoFlow: z.enum(['row', 'column', 'dense']).optional(),
});

/**
 * Stack layout schema
 */
export const StackLayoutSchema = BaseLayoutSchema.extend({
  type: z.literal('stack'),
  direction: z.enum(['horizontal', 'vertical']).optional(),
  align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
  justify: z
    .enum([
      'start',
      'center',
      'end',
      'space-between',
      'space-around',
      'space-evenly',
    ])
    .optional(),
});

/**
 * Flow layout schema
 */
export const FlowLayoutSchema = BaseLayoutSchema.extend({
  type: z.literal('flow'),
  maxWidth: z.string().optional(),
});

/**
 * Layout union schema
 */
export const LayoutSchema = z.discriminatedUnion('type', [
  GridLayoutSchema,
  StackLayoutSchema,
  FlowLayoutSchema,
]);

/**
 * Metric item schema
 */
export const MetricItemSchema = z.object({
  label: z.string().min(1),
  value: z.union([z.string(), z.number()]),
  unit: z.string().optional(),
  trend: z
    .object({
      direction: z.enum(['up', 'down', 'neutral']),
      value: z.union([z.string(), z.number()]).optional(),
      label: z.string().optional(),
    })
    .optional(),
  emphasis: z.enum(['low', 'medium', 'high', 'critical']).optional(),
});

/**
 * Metric Grid component schema
 */
export const MetricGridComponentSchema = z.object({
  type: z.literal('metric-grid'),
  items: z.array(MetricItemSchema).min(1),
  columns: z.number().int().positive().optional(),
  title: z.string().optional(),
});

/**
 * Chart data point schema
 */
export const ChartDataPointSchema = z.object({
  x: z.union([z.string(), z.number()]),
  y: z.number(),
  label: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Chart series schema
 */
export const ChartSeriesSchema = z.object({
  name: z.string().min(1),
  data: z.array(ChartDataPointSchema).min(1),
  color: z.string().optional(),
});

/**
 * Chart component schema
 */
export const ChartComponentSchema = z.object({
  type: z.literal('chart'),
  chartType: z.enum(['line', 'bar', 'pie', 'scatter', 'area']),
  title: z.string().optional(),
  series: z.array(ChartSeriesSchema).min(1),
  xAxis: z
    .object({
      label: z.string().optional(),
      type: z.enum(['linear', 'time', 'category']).optional(),
    })
    .optional(),
  yAxis: z
    .object({
      label: z.string().optional(),
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  height: z.number().positive().optional(),
  legend: z.boolean().optional(),
});

/**
 * Table column schema
 */
export const TableColumnSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  width: z.string().optional(),
  type: z.enum(['text', 'number', 'date', 'boolean']).optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  sortable: z.boolean().optional(),
});

/**
 * Table component schema
 */
export const TableComponentSchema = z.object({
  type: z.literal('table'),
  columns: z.array(TableColumnSchema).min(1),
  rows: z.array(z.record(z.unknown())),
  title: z.string().optional(),
  showHeader: z.boolean().optional(),
  striped: z.boolean().optional(),
  hover: z.boolean().optional(),
  compact: z.boolean().optional(),
});

/**
 * Log entry schema
 */
export const LogEntrySchema = z.object({
  timestamp: z.string(),
  level: z.enum(['debug', 'info', 'warn', 'error', 'critical']),
  message: z.string().min(1),
  source: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Log View component schema
 */
export const LogViewComponentSchema = z.object({
  type: z.literal('log-view'),
  entries: z.array(LogEntrySchema).min(1),
  title: z.string().optional(),
  maxEntries: z.number().int().positive().optional(),
  showTimestamp: z.boolean().optional(),
  showSource: z.boolean().optional(),
});

/**
 * Timeline event schema
 */
export const TimelineEventSchema = z.object({
  id: z.string().optional(),
  timestamp: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  milestone: z.boolean().optional(),
  status: z.enum(['pending', 'in-progress', 'completed', 'failed']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Timeline component schema
 */
export const TimelineComponentSchema = z.object({
  type: z.literal('timeline'),
  events: z.array(TimelineEventSchema).min(1),
  title: z.string().optional(),
  orientation: z.enum(['vertical', 'horizontal']).optional(),
  showLines: z.boolean().optional(),
});

/**
 * Text Block component schema
 */
export const TextBlockComponentSchema = z.object({
  type: z.literal('text-block'),
  content: z.string().min(1),
  format: z.enum(['plain', 'markdown']).optional(),
  emphasis: z.enum(['low', 'medium', 'high']).optional(),
  title: z.string().optional(),
});

/**
 * List item schema (recursive)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListItemSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    content: z.string().min(1),
    children: z.array(ListItemSchema).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
);

/**
 * List component schema
 */
export const ListComponentSchema = z.object({
  type: z.literal('list'),
  listType: z.enum(['ordered', 'unordered', 'definition']),
  items: z.array(ListItemSchema).min(1),
  title: z.string().optional(),
});

/**
 * Component union schema
 */
export const ComponentSchema = z.discriminatedUnion('type', [
  MetricGridComponentSchema,
  ChartComponentSchema,
  TableComponentSchema,
  LogViewComponentSchema,
  TimelineComponentSchema,
  TextBlockComponentSchema,
  ListComponentSchema,
]);

/**
 * Section schema
 */
export const SectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  layout: LayoutSchema.optional(),
  components: z.array(ComponentSchema).min(1),
  metadata: MetadataSchema,
});

/**
 * Complete ViewSpec schema
 */
export const ViewSpecSchema = z.object({
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'Version must be in semver format (e.g., 1.0.0)'),
  view: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  sections: z.array(SectionSchema).min(1),
  metadata: MetadataSchema,
});
