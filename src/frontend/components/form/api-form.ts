import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FrontendAPI } from '../../core/api/frontend-api';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

interface FormConfig {
  endpoint: string;
  method: 'POST' | 'PUT' | 'PATCH';
  fields: FormField[];
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}

@customElement('api-form')
export class ApiForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 500;
    }

    input, select, textarea {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: #4338ca;
    }

    button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .error {
      color: #dc2626;
      padding: 0.5rem;
      border: 1px solid #dc2626;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .success {
      color: #059669;
      padding: 0.5rem;
      border: 1px solid #059669;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .loading {
      opacity: 0.7;
      pointer-events: none;
    }
  `;

  @property({ type: Object })
  config!: FormConfig;

  @state()
  private formData: Record<string, string> = {};

  @state()
  private errors: Record<string, string> = {};

  @state()
  private loading = false;

  @state()
  private success = false;

  @state()
  private error: string | null = null;

  private api = FrontendAPI.getInstance();

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.formData = {
      ...this.formData,
      [target.name]: target.value,
    };
    // Clear field error when user starts typing
    if (this.errors[target.name]) {
      const { [target.name]: _, ...rest } = this.errors;
      this.errors = rest;
    }
  }

  private validateField(field: FormField, value: string): string | null {
    if (field.required && !value) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { pattern, minLength, maxLength, min, max } = field.validation;

      if (pattern && !new RegExp(pattern).test(value)) {
        return `${field.label} is invalid`;
      }

      if (minLength && value.length < minLength) {
        return `${field.label} must be at least ${minLength} characters`;
      }

      if (maxLength && value.length > maxLength) {
        return `${field.label} must be at most ${maxLength} characters`;
      }

      if (field.type === 'number') {
        const numValue = Number(value);
        if (min !== undefined && numValue < min) {
          return `${field.label} must be at least ${min}`;
        }
        if (max !== undefined && numValue > max) {
          return `${field.label} must be at most ${max}`;
        }
      }
    }

    return null;
  }

  private validate(): boolean {
    const errors: Record<string, string> = {};

    this.config.fields.forEach(field => {
      const value = this.formData[field.name] || '';
      const error = this.validateField(field, value);
      if (error) {
        errors[field.name] = error;
      }
    });

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();

    if (!this.validate()) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const method = this.config.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
      await this.api[method](
        this.config.endpoint,
        this.formData
      );

      this.success = true;
      this.formData = {};

      // Emit success event
      this.dispatchEvent(new CustomEvent('submit-success', {
        detail: { data: this.formData }
      }));
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Submission failed';

      // Emit error event
      this.dispatchEvent(new CustomEvent('submit-error', {
        detail: { error }
      }));
    } finally {
      this.loading = false;
    }
  }

  protected override render() {
    return html`
      <form
        @submit=${this.handleSubmit}
        class=${this.loading ? 'loading' : ''}
      >
        ${this.error ? html`
          <div class="error">
            ${this.config.errorMessage || this.error}
          </div>
        ` : ''}

        ${this.success ? html`
          <div class="success">
            ${this.config.successMessage || 'Form submitted successfully'}
          </div>
        ` : ''}

        ${this.config.fields.map(field => html`
          <div class="field">
            <label for=${field.name}>${field.label}</label>

            ${field.type === 'select' ? html`
              <select
                id=${field.name}
                name=${field.name}
                ?required=${field.required}
                @input=${this.handleInput}
                .value=${this.formData[field.name] || ''}
              >
                <option value="">Select ${field.label}</option>
                ${field.options?.map(option => html`
                  <option value=${option.value}>${option.label}</option>
                `)}
              </select>
            ` : field.type === 'textarea' ? html`
              <textarea
                id=${field.name}
                name=${field.name}
                ?required=${field.required}
                @input=${this.handleInput}
                .value=${this.formData[field.name] || ''}
              ></textarea>
            ` : html`
              <input
                type=${field.type}
                id=${field.name}
                name=${field.name}
                ?required=${field.required}
                @input=${this.handleInput}
                .value=${this.formData[field.name] || ''}
                pattern=${field.validation?.pattern || ''}
                minlength=${field.validation?.minLength || ''}
                maxlength=${field.validation?.maxLength || ''}
                min=${field.validation?.min || ''}
                max=${field.validation?.max || ''}
              />
            `}

            ${this.errors[field.name] ? html`
              <span class="error">${this.errors[field.name]}</span>
            ` : ''}
          </div>
        `)}

        <button
          type="submit"
          ?disabled=${this.loading}
        >
          ${this.loading ? 'Submitting...' : this.config.submitLabel || 'Submit'}
        </button>
      </form>
    `;
  }
}
