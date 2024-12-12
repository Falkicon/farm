import { FastifyInstance } from 'fastify';
import { SystemMetricsService } from '../services/system-metrics';

export async function metricsRoutes(fastify: FastifyInstance) {
  fastify.log.info('Registering metrics routes...');
  const metricsService = SystemMetricsService.getInstance();

  // Get current metrics
  fastify.get('/metrics', async (request, reply) => {
    fastify.log.info({
      path: request.url,
      method: request.method,
      params: request.params,
      query: request.query
    }, 'Metrics request received');

    try {
      fastify.log.info('Starting metrics collection...');

      // Initialize metrics service
      if (!metricsService) {
        fastify.log.error('Metrics service not initialized');
        return reply.status(500).send({
          error: 'Metrics service not available',
          message: 'Internal service initialization error'
        });
      }

      // Collect metrics with timeout
      const metricsPromise = metricsService.getMetrics();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Metrics collection timeout')), 5000);
      });

      const metrics = await Promise.race([metricsPromise, timeoutPromise]);

      fastify.log.info('Successfully collected metrics');
      return reply.status(200).send(metrics);
    } catch (error) {
      fastify.log.error('Error collecting metrics:', error);

      // Determine if error is a timeout
      if (error instanceof Error && error.message === 'Metrics collection timeout') {
        return reply.status(504).send({
          error: 'Metrics collection timeout',
          message: 'The operation took too long to complete'
        });
      }

      // Handle systeminformation errors
      if (error instanceof Error && error.message.includes('not supported')) {
        return reply.status(501).send({
          error: 'Platform not supported',
          message: 'Some metrics are not available on this platform'
        });
      }

      return reply.status(500).send({
        error: 'Failed to collect metrics',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  });

  // Get metrics history (last hour)
  fastify.get('/metrics/history', async (_, reply) => {
    try {
      fastify.log.info('Fetching metrics history...');
      return reply.status(501).send({
        message: 'Metrics history not implemented yet'
      });
    } catch (error) {
      fastify.log.error('Error fetching metrics history:', error);
      return reply.status(500).send({
        error: 'Failed to fetch metrics history',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  /**
   * Get historical data for a specific metric
   *
   * @name GET /metrics/:metric/history
   * @summary Returns historical data for a specific metric
   * @description Retrieves historical data for a specified metric type.
   * Currently returns a 501 status as this feature is not yet implemented.
   *
   * @param {string} metric - The name of the metric to fetch history for
   * @throws {Error} 501 - Feature not implemented
   * @throws {Error} 500 - If an error occurs while fetching metric history
   *
   * @example
   * ```typescript
   * // Get CPU usage history
   * const response = await fetch('/metrics/cpu/history');
   * const cpuHistory = await response.json();
   * // Will currently return a 501 status
   * ```
   */
  fastify.get('/metrics/:metric/history', async (request, reply) => {
    const { metric } = request.params as { metric: string };
    try {
      fastify.log.info(`Fetching history for metric: ${metric}`);
      return reply.status(501).send({
        message: `History for ${metric} not implemented yet`
      });
    } catch (error) {
      fastify.log.error(`Error fetching history for metric ${metric}:`, error);
      return reply.status(500).send({
        error: `Failed to fetch history for metric ${metric}`,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
}
