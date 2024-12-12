import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Feature } from '../../core/feature-registry/types';
import { FeatureRegistry } from '../../core/feature-registry/feature-registry';
import '../../components/data-table/data-table';

@customElement('users-list')
export class UsersList extends LitElement {
  private tableConfig = {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    ],
    endpoint: '/api/users',
    pageSize: 10,
  };

  render() {
    return html`
      <h1>Users</h1>
      <data-table .config=${this.tableConfig}></data-table>
    `;
  }
}

// Register the feature
export class UsersFeature implements Feature {
  name = 'users';
  routes = [
    {
      path: '/users',
      action: () => html`<users-list></users-list>`,
    },
  ];

  async initialize(): Promise<void> {
    // Register any API endpoints or additional configuration
    console.log('Users feature initialized');
  }
}

// Auto-register the feature
FeatureRegistry.getInstance().registerFeature(new UsersFeature());
