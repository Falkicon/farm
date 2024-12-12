import chalk from 'chalk';

interface ServerInfo {
  mode: string;
  backendPort: number;
  frontendPort: number;
  localIP: string;
}

export function createStartupBanner(info: ServerInfo): void {
  // Clear console for clean display
  console.clear();

  const banner = [
    '',
    chalk.cyan('╔═════════════════════╗'),
    chalk.cyan('║  Fabricmill Server  ║'),
    chalk.cyan('╚═════════════════════╝'),
    '',
    chalk.bold('  Status    : ') + chalk.green('Ready'),
    chalk.bold('  Mode      : ') + chalk.yellow(info.mode),
    '',
    chalk.bold('  Backend'),
    `  ├── Local   : ${chalk.blue(`http://localhost:${info.backendPort}`)}`,
    `  ├── Network : ${chalk.blue(`http://${info.localIP}:${info.backendPort}`)}`,
    '  ├── Health  : /health',
    '  └── API     : /api',
    '',
    chalk.bold('  Frontend'),
    `  ├── Local   : ${chalk.blue(`http://localhost:${info.frontendPort}`)}`,
    `  └── Network : ${chalk.blue(`http://${info.localIP}:${info.frontendPort}`)}`,
    '',
    chalk.bold('  Features'),
    '  ├── API     : ' + chalk.green('✓') + ' TypeBox, CORS, Helmet',
    '  ├── Auth    : ' + chalk.green('✓') + ' JWT, Rate Limit',
    '  ├── Upload  : ' + chalk.green('✓') + ' Multipart',
    '  └── Cache   : ' + chalk.green('✓') + ' Response Cache',
    '',
    chalk.bold('  Security'),
    '  ├── CORS    : ' + chalk.green('Enabled'),
    '  ├── Helmet  : ' + chalk.green('Enabled'),
    '  └── Rate    : ' + chalk.yellow('100 req/min'),
    '',
    chalk.dim('  Press Ctrl+C to stop'),
    '',
    ''  // Extra newline at the end
  ].join('\n');

  // Direct console output for banner with proper line ending
  process.stdout.write(banner + '\n');
}
