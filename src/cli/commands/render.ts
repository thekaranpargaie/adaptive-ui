/**
 * Render Command
 *
 * Renders a ViewSpec file to HTML
 */

import { Command } from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { validateViewSpec } from '../../validation/index.js';
import { renderToHtml } from '../../renderer/index.js';
import { formatValidationErrors } from '../utils/format.js';
import { success, error, info } from '../utils/logger.js';

export const renderCommand = new Command('render')
  .description('Render a ViewSpec file to HTML')
  .argument('<input>', 'Input ViewSpec JSON file')
  .option('-o, --output <file>', 'Output HTML file')
  .option('--validate-only', 'Only validate without rendering')
  .option('--no-inline-css', 'Use external CSS instead of inline')
  .option('--css-path <path>', 'Path to external CSS file', '/styles/adaptiveui.css')
  .option('--dark-mode', 'Enable dark mode')
  .option('--base-url <url>', 'Base URL for assets')
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

      if (options.verbose) {
        success('ViewSpec is valid');
      }

      // Exit if validate-only
      if (options.validateOnly) {
        success('Validation complete');
        process.exit(0);
      }

      // Render
      if (options.verbose) {
        info('Rendering ViewSpec to HTML...');
      }

      const output = renderToHtml(viewSpec, {
        inlineCss: options.inlineCss,
        externalCss: !options.inlineCss,
        cssPath: options.cssPath,
        darkMode: options.darkMode,
        baseUrl: options.baseUrl,
      });

      // Determine output path
      const outputPath = options.output || input.replace(/\.json$/, '.html');
      const resolvedOutputPath = resolve(outputPath);

      // Write HTML
      await writeFile(resolvedOutputPath, output.html, 'utf-8');

      if (options.verbose) {
        info(`HTML written to: ${resolvedOutputPath}`);
      }

      // Write external CSS if needed
      if (!options.inlineCss && output.css) {
        const cssOutputPath = resolve(options.cssPath);
        await writeFile(cssOutputPath, output.css, 'utf-8');
        
        if (options.verbose) {
          info(`CSS written to: ${cssOutputPath}`);
        }
      }

      success(`Rendered successfully: ${resolvedOutputPath}`);
    } catch (err) {
      error(`Render failed: ${err instanceof Error ? err.message : String(err)}`);
      if (options.verbose && err instanceof Error) {
        console.error(err.stack);
      }
      process.exit(1);
    }
  });
