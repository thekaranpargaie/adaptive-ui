/**
 * Component Registry Tests
 */

import { registry } from '../src/components/registry';
import { RenderContext } from '../src/renderer/types';

describe('Component Registry', () => {
  describe('Built-in Components', () => {
    test('should have all built-in components registered', () => {
      const componentTypes = [
        'metric-grid',
        'table',
        'log-view',
        'timeline',
        'text-block',
        'list',
        'chart',
      ];

      componentTypes.forEach((type) => {
        expect(registry.has(type)).toBe(true);
      });
    });

    test('should get component metadata', () => {
      const metadata = registry.get('metric-grid');
      
      expect(metadata).toBeDefined();
      expect(metadata?.type).toBe('metric-grid');
      expect(metadata?.name).toBe('Metric Grid');
      expect(metadata?.version).toBe('1.0.0');
      expect(metadata?.renderer).toBeDefined();
    });

    test('should list all components', () => {
      const allComponents = registry.getAll();
      
      expect(allComponents.length).toBeGreaterThanOrEqual(7);
      expect(allComponents.every(c => c.renderer)).toBe(true);
    });
  });

  describe('Rendering', () => {
    const context: RenderContext = {
      inlineCss: true,
      darkMode: false,
    };

    test('should render metric-grid component', () => {
      const component = {
        type: 'metric-grid' as const,
        items: [
          {
            label: 'Test Metric',
            value: 100,
          },
        ],
      };

      const plan = registry.render(component, context);
      
      expect(plan.type).toBe('metric-grid');
      expect(plan.html).toContain('Test Metric');
      expect(plan.html).toContain('100');
    });

    test('should throw error for unknown component type', () => {
      const component: any = {
        type: 'unknown-component',
        items: [],
      };

      expect(() => registry.render(component, context)).toThrow('Unknown component type');
    });
  });
});
