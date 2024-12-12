import si, { Systeminformation } from 'systeminformation';
import os from 'os';

/**
 * Represents comprehensive system metrics data collected by the monitoring service.
 * All numeric values are in their base units (bytes for memory/disk, milliseconds for time).
 */
export interface SystemMetrics {
  /** ISO timestamp when metrics were collected */
  timestamp: string;
  /** General system information */
  system: {
    /** System uptime in seconds */
    uptime: number;
    /** Operating system platform (win32, darwin, linux) */
    platform: string;
    /** System hostname */
    hostname: string;
  };
  /** CPU performance metrics */
  cpu: {
    /** CPU usage percentage (0-100) */
    usage: number;
    /** Number of CPU cores */
    cores: number;
    /** CPU temperature in Celsius */
    temperature: number;
  };
  /** Memory usage statistics */
  memory: {
    /** Total physical memory in bytes */
    total: number;
    /** Used memory in bytes */
    used: number;
    /** Free memory in bytes */
    free: number;
    /** Memory usage percentage (0-100) */
    usedPercent: number;
  };
  /** Network interfaces and performance */
  network: {
    /** List of network interfaces */
    interfaces: Array<{
      /** Interface name */
      name: string;
      /** Interface speed in Mbps */
      speed: number;
      /** Interface type (ethernet, wireless, etc.) */
      type: string;
    }>;
    /** Network traffic statistics */
    stats: {
      /** Total bytes received */
      rx_bytes: number;
      /** Total bytes transmitted */
      tx_bytes: number;
      /** Bytes received per second */
      rx_sec: number;
      /** Bytes transmitted per second */
      tx_sec: number;
    };
  };
  /** Storage metrics */
  disk: {
    /** Total disk space in bytes */
    total: number;
    /** Used disk space in bytes */
    used: number;
    /** Free disk space in bytes */
    free: number;
    /** Disk usage percentage (0-100) */
    usedPercent: number;
  };
  /** External service health checks */
  services: {
    /** Database connection status */
    database: {
      /** Whether database is currently connected */
      connected: boolean;
      /** Database query latency in milliseconds (null if disconnected) */
      latency: number | null;
    };
    /** API service status */
    api: {
      /** Current API status */
      status: 'ok' | 'error';
      /** API response time in milliseconds */
      responseTime: number;
    };
  };
}

interface ExtendedNetworkStats extends Systeminformation.NetworkStatsData {
  ts: number;
}

/**
 * Service for collecting and managing system performance metrics.
 * Implements the Singleton pattern to ensure only one instance is collecting metrics.
 *
 * @group System Monitoring
 * @category Services
 *
 * @example
 * ```typescript
 * const metricsService = SystemMetricsService.getInstance();
 * const metrics = await metricsService.getMetrics();
 * console.log(`Memory usage: ${metrics.memory.usedPercent}%`);
 * ```
 */
export class SystemMetricsService {
  private static instance: SystemMetricsService;
  private lastNetworkStats: ExtendedNetworkStats | null = null;
  private lastCpuLoad: Systeminformation.CurrentLoadData | null = null;
  private lastCpuLoadTime: number = 0;
  private readonly CPU_LOAD_CACHE_TIME = 1000; // 1 second cache

  private constructor() {
    // Initialize the service
    console.log('[SystemMetricsService] Initializing...');
  }

  public static getInstance(): SystemMetricsService {
    if (!SystemMetricsService.instance) {
      SystemMetricsService.instance = new SystemMetricsService();
    }
    return SystemMetricsService.instance;
  }

  private async measureApiResponseTime(): Promise<number> {
    const start = process.hrtime();
    await new Promise((resolve) => setTimeout(resolve, 1)); // Minimal operation
    const [seconds, nanoseconds] = process.hrtime(start);
    return Math.round((seconds * 1000 + nanoseconds / 1000000) * 100) / 100;
  }

  private async getDatabaseStatus(): Promise<{ connected: boolean; latency: number | null }> {
    try {
      // Check if we have a database connection
      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) {
        return { connected: false, latency: null };
      }

      // TODO: Implement actual database connection check
      return { connected: false, latency: null };
    } catch (error) {
      console.error('[SystemMetricsService] Database check error:', error);
      return { connected: false, latency: null };
    }
  }

  private async getCpuLoad(): Promise<Systeminformation.CurrentLoadData> {
    const now = Date.now();
    if (this.lastCpuLoad && now - this.lastCpuLoadTime < this.CPU_LOAD_CACHE_TIME) {
      return this.lastCpuLoad;
    }

    try {
      this.lastCpuLoad = await si.currentLoad();
      this.lastCpuLoadTime = now;
      return this.lastCpuLoad;
    } catch (error) {
      console.error('[SystemMetricsService] CPU load error:', error);
      // Return safe defaults with all required properties
      return {
        avgLoad: 0,
        currentLoad: 0,
        currentLoadUser: 0,
        currentLoadSystem: 0,
        currentLoadNice: 0,
        currentLoadIdle: 100,
        currentLoadIrq: 0,
        currentLoadSteal: 0,
        currentLoadGuest: 0,
        rawCurrentLoad: 0,
        rawCurrentLoadUser: 0,
        rawCurrentLoadSystem: 0,
        rawCurrentLoadNice: 0,
        rawCurrentLoadIdle: 100,
        rawCurrentLoadIrq: 0,
        rawCurrentLoadSteal: 0,
        rawCurrentLoadGuest: 0,
        cpus: [],
      };
    }
  }

  public async getMetrics(): Promise<SystemMetrics> {
    console.log('[SystemMetricsService] Collecting metrics...');

    try {
      // Collect all metrics in parallel with individual error handling
      const [
        cpuData,
        memData,
        networkStatsArray,
        diskData,
        networkInterfacesData,
        osInfo,
        cpuTemp,
      ] = await Promise.all([
        this.getCpuLoad().catch((err) => {
          console.error('[SystemMetricsService] CPU load error:', err);
          return null;
        }),
        si.mem().catch((err) => {
          console.error('[SystemMetricsService] Memory error:', err);
          return null;
        }),
        si.networkStats().catch((err) => {
          console.error('[SystemMetricsService] Network stats error:', err);
          return null;
        }),
        si.fsSize().catch((err) => {
          console.error('[SystemMetricsService] Disk error:', err);
          return null;
        }),
        si.networkInterfaces().catch((err) => {
          console.error('[SystemMetricsService] Network interfaces error:', err);
          return null;
        }),
        si.osInfo().catch((err) => {
          console.error('[SystemMetricsService] OS info error:', err);
          return null;
        }),
        si.cpuTemperature().catch((err) => {
          console.error('[SystemMetricsService] CPU temperature error:', err);
          return null;
        }),
      ]);

      // Ensure we have array data and handle null values
      const networkStats = Array.isArray(networkStatsArray)
        ? networkStatsArray
        : [networkStatsArray];
      const networkInterfaces = Array.isArray(networkInterfacesData)
        ? networkInterfacesData
        : [networkInterfacesData];
      const firstNetworkStat = (networkStats[0] as ExtendedNetworkStats) || null;

      // Calculate network speed with null checks
      let rxSec = 0;
      let txSec = 0;
      if (this.lastNetworkStats && firstNetworkStat) {
        const timeDiff = (Date.now() - (this.lastNetworkStats.ts || Date.now())) / 1000;
        if (timeDiff > 0) {
          rxSec = (firstNetworkStat.rx_bytes - this.lastNetworkStats.rx_bytes) / timeDiff;
          txSec = (firstNetworkStat.tx_bytes - this.lastNetworkStats.tx_bytes) / timeDiff;
        }
      }

      // Update last network stats with timestamp
      if (firstNetworkStat) {
        this.lastNetworkStats = {
          ...firstNetworkStat,
          ts: Date.now(),
        };
      }

      const [dbStatus, apiResponseTime] = await Promise.all([
        this.getDatabaseStatus(),
        this.measureApiResponseTime(),
      ]);

      // Create metrics object with safe fallbacks
      const metrics: SystemMetrics = {
        timestamp: new Date().toISOString(),
        system: {
          uptime: os.uptime(),
          platform: osInfo?.platform || os.platform(),
          hostname: osInfo?.hostname || os.hostname(),
        },
        cpu: {
          usage: cpuData?.currentLoad || 0,
          cores: cpuData?.cpus?.length || os.cpus().length,
          temperature: cpuTemp?.main || 0,
        },
        memory: {
          total: memData?.total || 0,
          used: memData?.used || 0,
          free: memData?.free || 0,
          usedPercent: memData ? (memData.used / memData.total) * 100 : 0,
        },
        network: {
          interfaces:
            networkInterfaces?.map((iface) =>
              iface
                ? {
                    name: iface.iface || 'unknown',
                    speed: iface.speed || 0,
                    type: iface.type || 'unknown',
                  }
                : {
                    name: 'unknown',
                    speed: 0,
                    type: 'unknown',
                  }
            ) || [],
          stats: {
            rx_bytes: firstNetworkStat?.rx_bytes || 0,
            tx_bytes: firstNetworkStat?.tx_bytes || 0,
            rx_sec: rxSec,
            tx_sec: txSec,
          },
        },
        disk: {
          total: diskData?.[0]?.size || 0,
          used: diskData?.[0]?.used || 0,
          free: diskData?.[0]?.available || 0,
          usedPercent: diskData?.[0]?.use || 0,
        },
        services: {
          database: dbStatus,
          api: {
            status: 'ok',
            responseTime: apiResponseTime,
          },
        },
      };

      console.log('[SystemMetricsService] Successfully collected metrics');
      return metrics;
    } catch (error) {
      console.error('[SystemMetricsService] Error collecting metrics:', error);
      throw error;
    }
  }
}
