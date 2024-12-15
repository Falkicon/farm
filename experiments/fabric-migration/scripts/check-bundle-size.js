const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const BUNDLE_SIZE_LIMITS = {
  'fabric-web': 500 * 1024, // 500KB
  'fluent-web': 500 * 1024, // 500KB
  'fast-element': 100 * 1024, // 100KB
  'shared': 50 * 1024, // 50KB
  'main': 200 * 1024, // 200KB
  'total': 2 * 1024 * 1024 // 2MB
};

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function checkBundleSize() {
  const distPath = path.join(__dirname, '../dist');
  const experimentDistPath = path.join(__dirname, '../dist/experiments');

  if (!fs.existsSync(distPath)) {
    console.error(chalk.red('Error: dist directory not found'));
    process.exit(1);
  }

  let totalSize = 0;
  const bundles = {};

  // Function to recursively get file sizes
  function getFileSizes(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        getFileSizes(filePath);
      } else if (file.endsWith('.js')) {
        const size = stat.size;
        totalSize += size;

        // Categorize bundle by name
        Object.keys(BUNDLE_SIZE_LIMITS).forEach(bundleName => {
          if (file.includes(bundleName)) {
            bundles[bundleName] = (bundles[bundleName] || 0) + size;
          }
        });
      }
    });
  }

  getFileSizes(distPath);
  if (fs.existsSync(experimentDistPath)) {
    getFileSizes(experimentDistPath);
  }

  // Check against limits
  let hasWarnings = false;
  let hasErrors = false;

  console.log(chalk.bold('\nBundle Size Report:'));
  console.log('==================\n');

  Object.entries(bundles).forEach(([name, size]) => {
    const limit = BUNDLE_SIZE_LIMITS[name];
    const formattedSize = formatSize(size);
    const formattedLimit = formatSize(limit);

    if (size > limit) {
      console.log(chalk.red(`✘ ${name}: ${formattedSize} (limit: ${formattedLimit})`));
      hasErrors = true;
    } else if (size > limit * 0.8) {
      console.log(chalk.yellow(`⚠ ${name}: ${formattedSize} (limit: ${formattedLimit})`));
      hasWarnings = true;
    } else {
      console.log(chalk.green(`✓ ${name}: ${formattedSize} (limit: ${formattedLimit})`));
    }
  });

  console.log(chalk.bold('\nTotal Size:'), formatSize(totalSize));
  console.log(chalk.bold('Size Limit:'), formatSize(BUNDLE_SIZE_LIMITS.total));

  if (totalSize > BUNDLE_SIZE_LIMITS.total) {
    console.log(chalk.red('\n✘ Total bundle size exceeds limit'));
    hasErrors = true;
  }

  if (hasErrors) {
    console.log(chalk.red('\n✘ Bundle size check failed'));
    process.exit(1);
  } else if (hasWarnings) {
    console.log(chalk.yellow('\n⚠ Bundle size check passed with warnings'));
  } else {
    console.log(chalk.green('\n✓ Bundle size check passed'));
  }
}

checkBundleSize();
