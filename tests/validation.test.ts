/**
 * Validation Tests
 */

import { validateViewSpec } from '../src/validation';
import { ViewSpec } from '../src/types/viewspec';

describe('ViewSpec Validation', () => {
  describe('Valid ViewSpecs', () => {
    test('should validate minimal ViewSpec', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'dashboard',
        title: 'Test Dashboard',
        sections: [
          {
            components: [
              {
                type: 'text-block',
                content: 'Test content',
              },
            ],
          },
        ],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    test('should validate ViewSpec with metric-grid component', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'dashboard',
        title: 'Metrics Dashboard',
        sections: [
          {
            title: 'Key Metrics',
            components: [
              {
                type: 'metric-grid',
                items: [
                  {
                    label: 'Users',
                    value: 1234,
                    trend: {
                      direction: 'up',
                      value: '+10%',
                    },
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(true);
    });

    test('should validate ViewSpec with all component types', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'comprehensive',
        title: 'All Components',
        sections: [
          {
            components: [
              {
                type: 'metric-grid',
                items: [{ label: 'Test', value: 100 }],
              },
              {
                type: 'table',
                columns: [{ key: 'id', label: 'ID' }],
                rows: [{ id: 1 }],
              },
              {
                type: 'chart',
                chartType: 'line',
                series: [{ name: 'Series 1', data: [{ x: 1, y: 2 }] }],
              },
              {
                type: 'log-view',
                entries: [
                  {
                    timestamp: '2024-01-01',
                    level: 'info',
                    message: 'Test',
                  },
                ],
              },
              {
                type: 'timeline',
                events: [
                  { timestamp: '2024-01-01', title: 'Event' },
                ],
              },
              {
                type: 'text-block',
                content: 'Test content',
              },
              {
                type: 'list',
                listType: 'unordered',
                items: [{ content: 'Item 1' }],
              },
            ],
          },
        ],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(true);
    });
  });

  describe('Invalid ViewSpecs', () => {
    test('should fail on missing required fields', () => {
      const viewSpec = {
        version: '1.0.0',
        // Missing 'view' and 'title'
        sections: [],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    test('should fail on invalid version', () => {
      const viewSpec = {
        version: 'invalid',
        view: 'dashboard',
        title: 'Test',
        sections: [],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(false);
    });

    test('should fail on unknown component type', () => {
      const viewSpec = {
        version: '1.0.0',
        view: 'dashboard',
        title: 'Test',
        sections: [
          {
            components: [
              {
                type: 'unknown-component',
                data: {},
              },
            ],
          },
        ],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(false);
    });

    test('should fail on invalid metric-grid item', () => {
      const viewSpec = {
        version: '1.0.0',
        view: 'dashboard',
        title: 'Test',
        sections: [
          {
            components: [
              {
                type: 'metric-grid',
                items: [
                  {
                    // Missing required 'label' and 'value'
                    unit: 'ms',
                  },
                ],
              },
            ],
          },
        ],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    test('should require at least one section', () => {
      const viewSpec = {
        version: '1.0.0',
        view: 'empty',
        title: 'Empty',
        sections: [],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    test('should require at least one component per section', () => {
      const viewSpec = {
        version: '1.0.0',
        view: 'empty',
        title: 'Empty',
        sections: [
          {
            title: 'Empty Section',
            components: [],
          },
        ],
      };

      const result = validateViewSpec(viewSpec);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });
});
