declare module '@open-wc/testing' {
  import { TemplateResult } from 'lit';
  import { Assertion } from 'chai';

  export function fixture<T>(template: TemplateResult): Promise<T>;
  export function html(strings: TemplateStringsArray, ...values: any[]): TemplateResult;
  export function fixtureCleanup(): void;
  export function elementUpdated(element: HTMLElement): Promise<void>;

  interface ChaiExpectation extends Chai.ExpectStatic {
    (target: any, message?: string): Chai.Assertion & DOMAssertions;
  }

  interface DOMAssertions {
    shadowDom: Assertion;
    lightDom: Assertion;
  }

  export const expect: ChaiExpectation;
}

declare module 'jest-axe' {
  export interface AxeResults {
    violations: any[];
  }

  export function axe(element: Element): Promise<AxeResults>;
  export function toHaveNoViolations(results: AxeResults): {
    pass: boolean;
    message: string;
  };
}

declare global {
  namespace Chai {
    interface Assertion {
      shadowDom: Assertion;
      lightDom: Assertion;
      satisfy(matcher: (value: any) => boolean): void;
      exist: Assertion;
      toHaveNoViolations(): void;
    }

    interface AssertionPrototype {
      exist: boolean;
    }
  }

  namespace Vitest {
    interface Assertion<T = any> extends Chai.Assertion {
      toHaveNoViolations(): void;
    }
  }
}
