/**
 * ViewSpec Validation Functions
 *
 * Provides validation utilities with helpful error messages.
 */

import { ZodError } from 'zod';
import { ViewSpecSchema } from '../schema/schemas';
import type { ViewSpec } from '../types';

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  success: boolean;
  data?: ViewSpec;
  errors?: ValidationError[];
}

/**
 * Validation error
 */
export interface ValidationError {
  path: string;
  message: string;
  code: string;
}

/**
 * Validate a ViewSpec document
 *
 * @param data - The data to validate
 * @returns Validation result with either parsed data or errors
 */
export function validateViewSpec(data: unknown): ValidationResult {
  try {
    const parsed = ViewSpecSchema.parse(data);
    return {
      valid: true,
      success: true,
      data: parsed,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        valid: false,
        success: false,
        errors: formatZodErrors(error),
      };
    }

    // Unexpected error
    return {
      valid: false,
      success: false,
      errors: [
        {
          path: '',
          message:
            error instanceof Error ? error.message : 'Unknown validation error',
          code: 'UNKNOWN_ERROR',
        },
      ],
    };
  }
}

/**
 * Validate a ViewSpec document (safe parse - doesn't throw)
 *
 * @param data - The data to validate
 * @returns Validation result
 */
export function safeValidateViewSpec(data: unknown): ValidationResult {
  const result = ViewSpecSchema.safeParse(data);

  if (result.success) {
    return {
      valid: true,
      success: true,
      data: result.data,
    };
  }

  return {
    valid: false,
    success: false,
    errors: formatZodErrors(result.error),
  };
}

/**
 * Format Zod errors into user-friendly error messages
 *
 * @param error - ZodError instance
 * @returns Array of formatted validation errors
 */
export function formatZodErrors(error: ZodError): ValidationError[] {
  return error.issues.map((issue) => {
    const path = issue.path.join('.');
    const message = formatErrorMessage(issue);

    return {
      path: path || 'root',
      message,
      code: issue.code,
    };
  });
}

/**
 * Format a single Zod issue into a helpful message
 */
function formatErrorMessage(issue: ZodError['issues'][0]): string {
  switch (issue.code) {
    case 'invalid_type':
      return `Expected ${issue.expected}, but received ${issue.received}`;

    case 'invalid_string':
      if (issue.validation === 'regex') {
        return `Invalid format: ${issue.message}`;
      }
      return issue.message;

    case 'too_small':
      if (issue.type === 'array') {
        return `Array must contain at least ${issue.minimum} element(s)`;
      }
      if (issue.type === 'string') {
        return `String must contain at least ${issue.minimum} character(s)`;
      }
      if (issue.type === 'number') {
        return `Number must be greater than or equal to ${issue.minimum}`;
      }
      return issue.message;

    case 'too_big':
      if (issue.type === 'array') {
        return `Array must contain at most ${issue.maximum} element(s)`;
      }
      if (issue.type === 'string') {
        return `String must contain at most ${issue.maximum} character(s)`;
      }
      if (issue.type === 'number') {
        return `Number must be less than or equal to ${issue.maximum}`;
      }
      return issue.message;

    case 'invalid_union':
      return 'Invalid value for this field';

    case 'invalid_enum_value':
      return `Invalid value. Expected one of: ${issue.options.join(', ')}`;

    case 'invalid_literal':
      return `Expected literal value: ${String(issue.expected)}`;

    default:
      return issue.message;
  }
}

/**
 * Format validation errors for display
 *
 * @param errors - Array of validation errors
 * @param options - Formatting options
 * @returns Formatted error string
 */
export function formatValidationErrors(
  errors: ValidationError[],
  options: { color?: boolean; verbose?: boolean } = {}
): string {
  const { color = false, verbose = false } = options;

  if (errors.length === 0) {
    return '';
  }

  const lines: string[] = [];

  if (verbose) {
    lines.push(`Found ${errors.length} validation error(s):\n`);
  }

  errors.forEach((error, index) => {
    const prefix = verbose ? `${index + 1}. ` : '  - ';
    const pathStr = error.path ? `${error.path}: ` : '';
    const message = `${prefix}${pathStr}${error.message}`;

    if (color) {
      // Add ANSI color codes for terminal output
      lines.push(`\x1b[31m${message}\x1b[0m`);
    } else {
      lines.push(message);
    }

    if (verbose && error.code) {
      lines.push(`   Code: ${error.code}`);
    }
  });

  return lines.join('\n');
}

/**
 * Check if data is a valid ViewSpec without full validation
 * Quick structural check for performance-sensitive contexts
 *
 * @param data - Data to check
 * @returns True if data appears to be a ViewSpec
 */
export function isViewSpecLike(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.version === 'string' &&
    typeof obj.view === 'string' &&
    typeof obj.title === 'string' &&
    Array.isArray(obj.sections)
  );
}
