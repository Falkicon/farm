import { html } from 'lit';
import { API_CONFIG } from '../../../shared/config/api';

export const homePageTemplate = () => html`
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Application</h1>
    <div class="space-y-4">
      <app-card>
        <h2 slot="header">API Status</h2>
        <div slot="content">
          <p class="mb-4">API URL: ${API_CONFIG.BASE_URL}</p>
          <app-button
            @click=${async () => {
              const baseUrl = API_CONFIG.BASE_URL.replace(/\/api$/, '');
              const url = `${baseUrl}/api/health`;
              try {
                console.log('Making request to:', url);
                const response = await fetch(url);
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('API response:', data);
                alert(JSON.stringify(data, null, 2));
              } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Unknown error occurred';
                console.error('API error:', error);
                alert('Error connecting to API: ' + message + '\nURL: ' + url);
              }
            }}
          >
            API Health Check
          </app-button>
        </div>
      </app-card>
    </div>
  </div>
`;
