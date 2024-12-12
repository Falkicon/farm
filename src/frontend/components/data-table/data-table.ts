import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FrontendAPI } from '../../core/api/frontend-api';

interface DataItem {
  id: number;
  [key: string]: unknown;
}

interface TableConfig {
  columns: Array<{
    key: string;
    label: string;
  }>;
  endpoint: string;
  pageSize?: number;
}

interface TableResponse {
  items: DataItem[];
  total: number;
}

@customElement('data-table')
export class DataTable extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }

    th,
    td {
      padding: 0.5rem;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
    }

    .pagination {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .loading {
      opacity: 0.5;
      pointer-events: none;
    }

    .error {
      color: red;
      padding: 1rem;
      border: 1px solid red;
      margin: 1rem 0;
    }
  `;

  @property({ type: Object })
  config!: TableConfig;

  @state()
  private data: DataItem[] = [];

  @state()
  private loading = false;

  @state()
  private error: string | null = null;

  @state()
  private currentPage = 1;

  @state()
  private totalPages = 1;

  private api = FrontendAPI.getInstance();

  override async connectedCallback() {
    super.connectedCallback();
    await this.loadData();
  }

  private async loadData() {
    this.loading = true;
    this.error = null;

    try {
      const response = await this.api.get<TableResponse>(this.config.endpoint, {
        query: {
          page: this.currentPage,
          pageSize: this.config.pageSize || 10,
        },
      });

      this.data = response.data.items;
      this.totalPages = Math.ceil(response.data.total / (this.config.pageSize || 10));
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to load data';
    } finally {
      this.loading = false;
    }
  }

  private async handlePageChange(newPage: number) {
    if (newPage === this.currentPage || newPage < 1 || newPage > this.totalPages) {
      return;
    }

    this.currentPage = newPage;
    await this.loadData();
  }

  protected override render() {
    return html`
      ${this.error ? html`<div class="error">${this.error}</div>` : ''}

      <div class="${this.loading ? 'loading' : ''}">
        <table>
          <thead>
            <tr>
              ${this.config.columns.map((column) => html`<th>${column.label}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              (item) => html`
                <tr>
                  ${this.config.columns.map((column) => html`<td>${item[column.key]}</td>`)}
                </tr>
              `
            )}
          </tbody>
        </table>

        <div class="pagination">
          <button
            ?disabled=${this.currentPage === 1}
            @click=${() => this.handlePageChange(this.currentPage - 1)}
          >
            Previous
          </button>
          <span>Page ${this.currentPage} of ${this.totalPages}</span>
          <button
            ?disabled=${this.currentPage === this.totalPages}
            @click=${() => this.handlePageChange(this.currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    `;
  }
}
