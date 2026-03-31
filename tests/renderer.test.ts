/**
 * Renderer Tests
 */

import { renderToHtml, renderViewSpec } from '../src/renderer';
import { ViewSpec } from '../src/types/viewspec';

describe('Renderer', () => {
  describe('renderViewSpec', () => {
    test('should render minimal ViewSpec', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'dashboard',
        title: 'Test Dashboard',
        sections: [],
      };

      const plan = renderViewSpec(viewSpec);
      
      expect(plan.title).toBe('Test Dashboard');
      expect(plan.view).toBe('dashboard');
      expect(plan.sections).toHaveLength(0);
      expect(plan.html).toContain('Test Dashboard');
    });

    test('should render ViewSpec with sections', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'dashboard',
        title: 'Test',
        sections: [
          {
            title: 'Section 1',
            components: [],
          },
          {
            title: 'Section 2',
            description: 'Section description',
            components: [],
          },
        ],
      };

      const plan = renderViewSpec(viewSpec);
      
      expect(plan.sections).toHaveLength(2);
      expect(plan.sections[0]?.title).toBe('Section 1');
      expect(plan.sections[1]?.description).toBe('Section description');
    });

    test('should generate CSS', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [],
      };

      const plan = renderViewSpec(viewSpec);
      
      expect(plan.css).toBeDefined();
      expect(plan.css).toContain('adaptiveui-container');
      expect(plan.css).toContain(':root');
    });
  });

  describe('renderToHtml', () => {
    test('should generate complete HTML document', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'dashboard',
        title: 'Test Dashboard',
        sections: [],
      };

      const output = renderToHtml(viewSpec);
      
      expect(output.html).toContain('<!DOCTYPE html>');
      expect(output.html).toContain('<html');
      expect(output.html).toContain('</html>');
      expect(output.html).toContain('Test Dashboard');
    });

    test('should include inline CSS by default', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [],
      };

      const output = renderToHtml(viewSpec);
      
      expect(output.html).toContain('<style>');
      expect(output.css).toBeUndefined();
    });

    test('should support external CSS', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [
          {
            components: [
              {
                type: 'text-block',
                content: 'Test',
              },
            ],
          },
        ],
      };

      const output = renderToHtml(viewSpec, {
        inlineCss: false,
        externalCss: true,
        cssPath: '/styles/app.css',
      });
      
      expect(output.html).not.toContain('<style>');
      expect(output.html).toContain('/styles/app.css');
      expect(output.css).toBeDefined();
    });

    test('should support dark mode', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [],
      };

      const output = renderToHtml(viewSpec, {
        darkMode: true,
      });
      
      expect(output.html).toContain('data-theme="dark"');
    });
  });

  describe('Component Rendering', () => {
    test('should render metric-grid component', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [
          {
            components: [
              {
                type: 'metric-grid',
                items: [
                  {
                    label: 'Users',
                    value: 1234,
                    unit: 'active',
                  },
                ],
              },
            ],
          },
        ],
      };

      const plan = renderViewSpec(viewSpec);
      
      expect(plan.html).toContain('metric-grid');
      expect(plan.html).toContain('Users');
      expect(plan.html).toContain('1234');
      expect(plan.html).toContain('active');
    });

    test('should render table component', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [
          {
            components: [
              {
                type: 'table',
                columns: [
                  { key: 'id', label: 'ID' },
                  { key: 'name', label: 'Name' },
                ],
                rows: [
                  { id: 1, name: 'Alice' },
                  { id: 2, name: 'Bob' },
                ],
              },
            ],
          },
        ],
      };

      const plan = renderViewSpec(viewSpec);
      
      expect(plan.html).toContain('<table');
      expect(plan.html).toContain('ID');
      expect(plan.html).toContain('Name');
      expect(plan.html).toContain('Alice');
      expect(plan.html).toContain('Bob');
    });
  });

  describe('Layout Rendering', () => {
    test('should render grid layout', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [
          {
            layout: {
              type: 'grid',
              columns: 3,
            },
            components: [],
          },
        ],
      };

      const plan = renderViewSpec(viewSpec);
      
      expect(plan.html).toContain('layout-grid');
      expect(plan.html).toContain('data-columns="3"');
    });

    test('should render stack layout', () => {
      const viewSpec: ViewSpec = {
        version: '1.0.0',
        view: 'test',
        title: 'Test',
        sections: [
          {
            layout: {
              type: 'stack',
              direction: 'horizontal',
            },
            components: [],
          },
        ],
      };

      const plan = renderViewSpec(viewSpec);
      
      expect(plan.html).toContain('layout-stack');
      expect(plan.html).toContain('layout-stack-horizontal');
    });
  });
});
