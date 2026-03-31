/**
 * HTML Utilities Tests
 */

import {
  escapeHtml,
  attrs,
  dataAttrs,
  classList,
  element,
  div,
  span,
  p,
  heading,
} from '../src/renderer/html-utils';

describe('HTML Utilities', () => {
  describe('escapeHtml', () => {
    test('should escape HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
    });

    test('should escape ampersands', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    test('should escape quotes', () => {
      expect(escapeHtml("It's a \"test\"")).toBe('It&#039;s a &quot;test&quot;');
    });

    test('should handle empty string', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('attrs', () => {
    test('should generate attributes string', () => {
      const result = attrs({ id: 'test', class: 'container' });
      expect(result).toContain('id="test"');
      expect(result).toContain('class="container"');
    });

    test('should handle boolean attributes', () => {
      const result = attrs({ disabled: true, readonly: false });
      expect(result).toContain('disabled');
      expect(result).not.toContain('readonly');
    });

    test('should filter undefined values', () => {
      const result = attrs({ id: 'test', title: undefined });
      expect(result).toContain('id="test"');
      expect(result).not.toContain('title');
    });

    test('should handle numbers', () => {
      const result = attrs({ tabindex: 0, 'data-count': 42 });
      expect(result).toContain('tabindex="0"');
      expect(result).toContain('data-count="42"');
    });
  });

  describe('dataAttrs', () => {
    test('should prefix keys with data-', () => {
      const result = dataAttrs({ component: 'metric', type: 'grid' });
      expect(result).toEqual({
        'data-component': 'metric',
        'data-type': 'grid',
      });
    });
  });

  describe('classList', () => {
    test('should join class names', () => {
      expect(classList('foo', 'bar', 'baz')).toBe('foo bar baz');
    });

    test('should filter falsy values', () => {
      expect(classList('foo', false, 'bar', undefined, 'baz')).toBe('foo bar baz');
    });

    test('should handle empty input', () => {
      expect(classList()).toBe('');
    });
  });

  describe('element', () => {
    test('should create element with attributes', () => {
      const result = element('div', { id: 'test' }, 'content');
      expect(result).toBe('<div id="test">content</div>');
    });

    test('should create self-closing tags', () => {
      const result = element('br', {});
      expect(result).toBe('<br />');
    });

    test('should handle elements without children', () => {
      const result = element('span', { class: 'empty' });
      expect(result).toBe('<span class="empty"></span>');
    });
  });

  describe('div', () => {
    test('should create div element', () => {
      const result = div({ class: 'container' }, 'content');
      expect(result).toBe('<div class="container">content</div>');
    });
  });

  describe('span', () => {
    test('should create span element', () => {
      const result = span({ class: 'label' }, 'text');
      expect(result).toBe('<span class="label">text</span>');
    });
  });

  describe('p', () => {
    test('should create paragraph element', () => {
      const result = p({}, 'paragraph text');
      expect(result).toBe('<p>paragraph text</p>');
    });
  });

  describe('heading', () => {
    test('should create heading elements', () => {
      expect(heading(1, {}, 'Title')).toBe('<h1>Title</h1>');
      expect(heading(2, {}, 'Subtitle')).toBe('<h2>Subtitle</h2>');
      expect(heading(6, {}, 'H6')).toBe('<h6>H6</h6>');
    });
  });
});
