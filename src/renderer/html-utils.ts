/**
 * HTML Generation Utilities
 *
 * Safe HTML generation and manipulation utilities
 */

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Generate HTML attributes string
 */
export function attrs(attributes: Record<string, string | boolean | number | undefined>): string {
  return Object.entries(attributes)
    .filter(([_, value]) => value !== undefined && value !== false)
    .map(([key, value]) => {
      if (value === true) {
        return key;
      }
      return `${key}="${escapeHtml(String(value))}"`;
    })
    .join(' ');
}

/**
 * Generate data attributes
 */
export function dataAttrs(data: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    result[`data-${key}`] = value;
  }
  return result;
}

/**
 * Generate class list string
 */
export function classList(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Create an HTML element
 */
export function element(
  tag: string,
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  const attrStr = attrs(attributes);
  const opening = attrStr ? `<${tag} ${attrStr}>` : `<${tag}>`;
  
  // Self-closing tags
  if (['br', 'hr', 'img', 'input', 'meta', 'link'].includes(tag)) {
    return opening.replace('>', ' />');
  }
  
  return `${opening}${children || ''}</${tag}>`;
}

/**
 * Create a div element
 */
export function div(
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  return element('div', attributes, children);
}

/**
 * Create a span element
 */
export function span(
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  return element('span', attributes, children);
}

/**
 * Create a paragraph element
 */
export function p(
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  return element('p', attributes, children);
}

/**
 * Create a heading element
 */
export function heading(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  return element(`h${level}`, attributes, children);
}

/**
 * Create a table element
 */
export function table(
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  return element('table', attributes, children);
}

/**
 * Create a list element
 */
export function list(
  type: 'ul' | 'ol' | 'dl',
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  return element(type, attributes, children);
}

/**
 * Create a list item
 */
export function li(
  attributes: Record<string, string | boolean | number | undefined>,
  children?: string,
): string {
  return element('li', attributes, children);
}

/**
 * Wrap content in a container with ARIA attributes
 */
export function ariaContainer(
  role: string,
  label: string | undefined,
  content: string,
  additionalAttrs: Record<string, string | boolean | number | undefined> = {},
): string {
  return div(
    {
      role,
      'aria-label': label,
      ...additionalAttrs,
    },
    content,
  );
}

/**
 * Generate a complete HTML document
 */
export function htmlDocument(
  title: string,
  body: string,
  options: {
    css?: string;
    inlineCss?: boolean;
    externalCssPath?: string;
    meta?: Record<string, string>;
  } = {},
): string {
  const metaTags = Object.entries(options.meta || {})
    .map(([name, content]) => `<meta name="${escapeHtml(name)}" content="${escapeHtml(content)}" />`)
    .join('\n    ');

  const cssLink = options.externalCssPath
    ? `<link rel="stylesheet" href="${escapeHtml(options.externalCssPath)}" />`
    : '';

  const styleTag = options.inlineCss && options.css
    ? `<style>\n${options.css}\n  </style>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    ${metaTags}
    ${cssLink}
    ${styleTag}
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
  </head>
  <body>
    ${body}
  </body>
</html>`;
}
