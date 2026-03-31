/**
 * Init Command
 *
 * Initialize a new ViewSpec file from a template
 */

import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { success, error, info } from '../utils/logger.js';

const TEMPLATE_SIMPLE = {
  version: '1.0.0',
  view: 'dashboard',
  title: 'My Dashboard',
  description: 'A simple dashboard example',
  sections: [
    {
      title: 'Metrics',
      layout: {
        type: 'grid',
        columns: 3,
      },
      components: [
        {
          type: 'metric-grid',
          items: [
            {
              label: 'Total Users',
              value: 1234,
              trend: {
                direction: 'up',
                value: '+12%',
              },
            },
            {
              label: 'Revenue',
              value: '$45.2K',
              unit: 'USD',
              emphasis: 'high',
            },
            {
              label: 'Active Sessions',
              value: 89,
            },
          ],
        },
      ],
    },
    {
      title: 'Recent Activity',
      components: [
        {
          type: 'log-view',
          entries: [
            {
              timestamp: '2024-01-15 10:30:00',
              level: 'info',
              message: 'User logged in',
              source: 'auth',
            },
            {
              timestamp: '2024-01-15 10:29:45',
              level: 'warn',
              message: 'High memory usage detected',
              source: 'system',
            },
          ],
        },
      ],
    },
  ],
};

export const initCommand = new Command('init')
  .description('Initialize a new ViewSpec file from a template')
  .argument('[output]', 'Output file path', 'viewspec.json')
  .option('--template <type>', 'Template type (simple)', 'simple')
  .option('-v, --verbose', 'Verbose output')
  .action(async (output, options) => {
    try {
      const outputPath = resolve(output);
      
      if (options.verbose) {
        info(`Creating ViewSpec from template: ${options.template}`);
      }

      let template;
      switch (options.template) {
        case 'simple':
          template = TEMPLATE_SIMPLE;
          break;
        default:
          error(`Unknown template: ${options.template}`);
          process.exit(1);
      }

      // Write template
      await writeFile(
        outputPath,
        JSON.stringify(template, null, 2),
        'utf-8',
      );

      success(`Created ViewSpec: ${outputPath}`);
      
      if (options.verbose) {
        info('You can now edit the file and render it with:');
        info(`  adaptiveui render ${output}`);
      }
    } catch (err) {
      error(`Init failed: ${err instanceof Error ? err.message : String(err)}`);
      if (options.verbose && err instanceof Error) {
        console.error(err.stack);
      }
      process.exit(1);
    }
  });
