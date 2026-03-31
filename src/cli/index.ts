#!/usr/bin/env node

/**
 * AdaptiveUI CLI
 *
 * Command-line interface for AdaptiveUI
 */

import { Command } from 'commander';
import { renderCommand } from './commands/render.js';
import { validateCommand } from './commands/validate.js';
import { initCommand } from './commands/init.js';

const program = new Command();

program
  .name('adaptiveui')
  .description('Transform ViewSpec into deterministic, adaptive HTML')
  .version('1.0.0');

// Register commands
program.addCommand(renderCommand);
program.addCommand(validateCommand);
program.addCommand(initCommand);

// Parse arguments
program.parse(process.argv);
