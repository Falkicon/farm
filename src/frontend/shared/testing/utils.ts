import net from 'net';

/**
 * Wait for a port to become available
 * @param port - Port number to check
 * @param timeout - Maximum time to wait in milliseconds
 * @returns Promise that resolves when port is available
 */
export function waitForPort(port: number, timeout: number): Promise<void> {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const socket = new net.Socket();

      const onError = () => {
        socket.destroy();

        if (Date.now() - startTime >= timeout) {
          reject(new Error(`Timeout waiting for port ${port}`));
          return;
        }

        // Try again in 100ms
        setTimeout(tryConnect, 100);
      };

      socket.once('error', onError);

      socket.connect(port, '127.0.0.1', () => {
        socket.destroy();
        resolve();
      });
    };

    tryConnect();
  });
}
