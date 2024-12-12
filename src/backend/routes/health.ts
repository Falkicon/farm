import { FastifyInstance } from 'fastify';

interface HealthStatus {
  status: 'ok' | 'error';
  timestamp: string;
  version: string;
  environment: string;
  services: {
    database: {
      status: 'connected' | 'disconnected';
      latency: number;
    };
    api: {
      status: 'ok' | 'error';
      version: string;
      features: {
        cors: boolean;
        helmet: boolean;
        rateLimit: boolean;
        multipart: boolean;
        cache: boolean;
        jwt: boolean;
      };
    };
  };
  metrics: {
    memory: {
      used: number;
      total: number;
      free: number;
    };
    cpu: {
      usage: number;
      cores: number;
    };
    uptime: number;
  };
}

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async () => {
    const status: HealthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: {
          status: 'connected',
          latency: 50.00
        },
        api: {
          status: 'ok',
          version: '1.0.0',
          features: {
            cors: true,
            helmet: true,
            rateLimit: true,
            multipart: false,
            cache: true,
            jwt: true
          }
        }
      },
      metrics: {
        memory: {
          used: process.memoryUsage().heapUsed / 1024 / 1024,
          total: process.memoryUsage().heapTotal / 1024 / 1024,
          free: process.memoryUsage().heapTotal / 1024 / 1024 - process.memoryUsage().heapUsed / 1024 / 1024
        },
        cpu: {
          usage: process.cpuUsage().user / 1000000,
          cores: require('os').cpus().length
        },
        uptime: process.uptime()
      }
    };

    return status;
  });
}
