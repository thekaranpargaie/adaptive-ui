/**
 * CLI Utilities - Logger
 *
 * Colored console output
 */

/**
 * ANSI color codes
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

/**
 * Check if colors should be enabled
 */
function shouldUseColor(): boolean {
  return (
    process.stdout.isTTY &&
    process.env.FORCE_COLOR !== '0' &&
    process.env.NO_COLOR === undefined
  );
}

const useColor = shouldUseColor();

/**
 * Colorize text
 */
function colorize(text: string, color: string): string {
  if (!useColor) {
    return text;
  }
  return `${color}${text}${colors.reset}`;
}

/**
 * Log success message
 */
export function success(message: string): void {
  console.log(colorize('✓ ', colors.green) + message);
}

/**
 * Log error message
 */
export function error(message: string): void {
  console.error(colorize('✗ ', colors.red) + colorize(message, colors.red));
}

/**
 * Log warning message
 */
export function warn(message: string): void {
  console.warn(colorize('⚠ ', colors.yellow) + colorize(message, colors.yellow));
}

/**
 * Log info message
 */
export function info(message: string): void {
  console.log(colorize('ℹ ', colors.blue) + message);
}

/**
 * Log debug message
 */
export function debug(message: string): void {
  console.log(colorize('[DEBUG] ', colors.dim) + colorize(message, colors.dim));
}
