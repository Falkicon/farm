import { apiClient } from './client';
import type { SystemMetrics } from '../../../backend/services/system-metrics';

export const metricsApi = {
  getCurrentMetrics(): Promise<SystemMetrics> {
    return apiClient.get<SystemMetrics>('/api/metrics');
  },

  getMetricsHistory(): Promise<SystemMetrics[]> {
    return apiClient.get<SystemMetrics[]>('/api/metrics/history');
  },

  getMetricHistory(metric: string): Promise<SystemMetrics[]> {
    return apiClient.get<SystemMetrics[]>(`/api/metrics/${metric}/history`);
  },
};
