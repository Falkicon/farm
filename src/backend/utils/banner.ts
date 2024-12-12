import chalk from 'chalk';

/**
 * Color configuration for banner elements
 * @group Console Output
 * @category Types
 */
type BannerColors = {
  /** Primary banner color */
  primary: typeof chalk.cyan;
  /** Success status color */
  success: typeof chalk.green;
  /** Warning or highlight color */
  warning: typeof chalk.yellow;
  /** Link or URL color */
  link: typeof chalk.blue;
  /** Heading or label color */
  heading: typeof chalk.bold;
  /** Dimmed text color */
  dim: typeof chalk.dim;
};

/** Banner color scheme */
const colors: BannerColors = {
  primary: chalk.cyan,
  success: chalk.green,
  warning: chalk.yellow,
  link: chalk.blue,
  heading: chalk.bold,
  dim: chalk.dim
};

/**
 * Server information interface for banner display
 * @group Console Output
 * @category Types
 */
interface ServerInfo {
  /** Server environment mode (development, production, etc.) */
  mode: string;
  /** Backend server port number */
  backendPort: number;
  /** Frontend development server port number */
  frontendPort: number;
  /** Local network IP address */
  localIP: string;
}

/**
 * Creates and displays a stylized startup banner in the console
 * Shows server status, ports, URLs, and enabled features
 *
 * @group Console Output
 * @category Functions
 *
 * @example
 * ```ts
 * // Display startup banner
 * createStartupBanner({
 *   mode: 'development',
 *   backendPort: 8000,
 *   frontendPort: 3000,
 *   localIP: '192.168.1.100'
 * });
 * ```
 *
 * @remarks
 * The banner includes:
 * - Server status and mode
 * - Backend and frontend URLs (local and network)
 * - Enabled features and security settings
 * - Rate limit information
 *
 * @param info - Server information for display
 */
export function createStartupBanner(info: ServerInfo): void {
  // Clear console for clean display
  console.clear();

  const banner = [
    '',
    colors.primary('╔═════════════════════╗'),
    colors.primary('║  Fabricmill Server  ║'),
    colors.primary('╚═════════════════════╝'),
    '',
    colors.heading('  Status    : ') + colors.success('Ready'),
    colors.heading('  Mode      : ') + colors.warning(info.mode),
    '',
    colors.heading('  Backend'),
    `  ├── Local   : ${colors.link(`http://localhost:${info.backendPort}`)}`,
    `  ├── Network : ${colors.link(`http://${info.localIP}:${info.backendPort}`)}`,
    '  ├── Health  : /health',
    '  └── API     : /api',
    '',
    colors.heading('  Frontend'),
    `  ├── Local   : ${colors.link(`http://localhost:${info.frontendPort}`)}`,
    `  └── Network : ${colors.link(`http://${info.localIP}:${info.frontendPort}`)}`,
    '',
    colors.heading('  Features'),
    '  ├── API     : ' + colors.success('✓') + ' TypeBox, CORS, Helmet',
    '  ├── Auth    : ' + colors.success('✓') + ' JWT, Rate Limit',
    '  ├── Upload  : ' + colors.success('✓') + ' Multipart',
    '  └── Cache   : ' + colors.success('✓') + ' Response Cache',
    '',
    colors.heading('  Security'),
    '  ├── CORS    : ' + colors.success('Enabled'),
    '  ├── Helmet  : ' + colors.success('Enabled'),
    '  └── Rate    : ' + colors.warning('100 req/min'),
    '',
    colors.dim('  Press Ctrl+C to stop'),
    '',
    ''  // Extra newline at the end
  ].join('\n');

  // Direct console output for banner with proper line ending
  process.stdout.write(banner + '\n');
}
