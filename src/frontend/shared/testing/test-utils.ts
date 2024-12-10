import { LitElement, TemplateResult } from 'lit';
import { fixture as _fixture, html } from '@open-wc/testing';

export async function createElementWithProps<T extends LitElement>(
    tag: string,
    props: Record<string, unknown> = {}
): Promise<T> {
    const propsString = Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

    const template = html`<${tag} ${propsString}></${tag}>` as unknown as TemplateResult;
    return _fixture<T>(template);
}

export function createEvent(type: string, detail?: unknown): CustomEvent {
    return new CustomEvent(type, {
        detail,
        bubbles: true,
        composed: true
    });
}

export async function waitForUpdate(element: LitElement): Promise<void> {
    await element.updateComplete;
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
} 