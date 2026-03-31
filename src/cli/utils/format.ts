/**
 * CLI Utilities - Formatters
 *
 * Format output for CLI display
 */

import { ValidationError } from '../../validation/validator.js';

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: ValidationError[]): string {
  if (!errors || errors.length === 0) {
    return 'No errors';
  }

  return errors
    .map((err) => {
      const path = err.path;
      return `  • ${path}: ${err.message}`;
    })
    .join('\n');
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Format duration
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Create a progress bar
 */
export function progressBar(
  current: number,
  total: number,
  width: number = 40,
): string {
  const percentage = Math.min(current / total, 1);
  const filled = Math.floor(width * percentage);
  const empty = width - filled;
  
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  const percent = (percentage * 100).toFixed(1);
  
  return `[${bar}] ${percent}%`;
}
