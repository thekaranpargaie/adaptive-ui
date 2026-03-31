/**
 * Validate Command
 *
 * Validates a ViewSpec file
 */

import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { validateViewSpec } from '../../validation/index.js';
import { formatValidationErrors } from '../utils/format.js';
import { success, error, info } from '../utils/logger.js';

export const validateCommand = new Command('validate')
  .description('Validate a ViewSpec file')
  .argument('<input>', 'Input ViewSpec JSON file')
  .option('-v, --verbose', 'Verbose output')
  .action(async (input, options) => {
    try {
      const inputPath = resolve(input);
      
      if (options.verbose) {
        info(`Reading ViewSpec from: ${inputPath}`);
      }

      // Read input file
      const fileContent = await readFile(inputPath, 'utf-8');
      const viewSpec = JSON.parse(fileContent);

      // Validate
      if (options.verbose) {
        info('Validating ViewSpec...');
      }

      const validation = validateViewSpec(viewSpec);
      
      if (!validation.valid) {
        error('Validation failed:');
        console.error(formatValidationErrors(validation.errors || []));
        process.exit(1);
      }

      success('✓ ViewSpec is valid');
      
      if (options.verbose) {
        info(`View: ${viewSpec.view}`);
        info(`Title: ${viewSpec.title}`);
        info(`Sections: ${viewSpec.sections.length}`);
        info(`Version: ${viewSpec.version}`);
      }
      
      process.exit(0);
    } catch (err) {
      error(`Validation failed: ${err instanceof Error ? err.message : String(err)}`);
      if (options.verbose && err instanceof Error) {
        console.error(err.stack);
      }
      process.exit(1);
    }
  });
