import server from './server';
import { config } from 'dotenv';
import { networkInterfaces } from 'os';
import { createStartupBanner } from './utils/banner';

// Load environment variables
config();

const PORT = 8000;
const HOST = '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_PORT = 3000;

// Get local IP address
const getLocalIP = () => {
  try {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name] ?? []) {
        // Skip internal and non-IPv4 addresses
        if (!net.internal && net.family === 'IPv4') {
          return net.address;
        }
      }
    }
    return '127.0.0.1';
  } catch (error) {
    console.error('Error getting local IP:', error);
    return '127.0.0.1';
  }
};

// Start the server
const start = async () => {
  try {
    // Configure server
    server.log.info('Configuring server...');

    // Add error handlers
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled rejection:', err);
      process.exit(1);
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught exception:', err);
      process.exit(1);
    });

    // Start server silently
    server.log.info(`Starting server on ${HOST}:${PORT}...`);
    await server.listen({
      port: PORT,
      host: HOST,
      listenTextResolver: () => ''
    });

    // Display startup banner
    createStartupBanner({
      mode: NODE_ENV,
      backendPort: PORT,
      frontendPort: FRONTEND_PORT,
      localIP: getLocalIP()
    });

    // Log startup message directly to stdout
    process.stdout.write('Server started successfully\n\n');
  } catch (err) {
    console.error('Failed to start server:', err);
    server.log.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  try {
    console.log('\nShutting down server...');
    await server.close();
    console.log('Server shutdown complete');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    server.log.error('Error during shutdown:', err);
    process.exit(1);
  }
};

// Register shutdown handlers
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start server
start().catch((err) => {
  console.error('Fatal error during startup:', err);
  process.exit(1);
});
