# Stop on first error
$ErrorActionPreference = 'Stop'

# Suppress Node.js experimental warnings
$env:NODE_NO_WARNINGS = 1

Write-Host "Starting installation process..."

try {
  # Clean install
  Write-Host "Cleaning node_modules..."
  if (Test-Path node_modules) {
    Remove-Item -Recurse -Force node_modules
  }
  if (Test-Path package-lock.json) {
    Remove-Item -Force package-lock.json
  }

  # Install dependencies
  Write-Host "Installing dependencies..."
  $npmInstall = Start-Process `
    -FilePath "npm" `
    -ArgumentList "install" `
    -NoNewWindow `
    -PassThru `
    -Wait `
    -RedirectStandardOutput "npm-install.log" `
    -RedirectStandardError "npm-install-error.log"

  if ($npmInstall.ExitCode -ne 0) {
    $errorLog = Get-Content "npm-install-error.log" -Raw
    throw "npm install failed with exit code $($npmInstall.ExitCode)`n$errorLog"
  }

  # Run build
  Write-Host "Building project..."
  $npmBuild = Start-Process `
    -FilePath "npm" `
    -ArgumentList "run build" `
    -NoNewWindow `
    -PassThru `
    -Wait `
    -RedirectStandardOutput "npm-build.log" `
    -RedirectStandardError "npm-build-error.log"

  if ($npmBuild.ExitCode -ne 0) {
    $errorLog = Get-Content "npm-build-error.log" -Raw
    throw "npm build failed with exit code $($npmBuild.ExitCode)`n$errorLog"
  }

  Write-Host "Installation completed successfully!"

  # Clean up log files
  Remove-Item -ErrorAction SilentlyContinue "npm-*.log"
}
catch {
  Write-Error "Installation failed: $_"
  exit 1
}
finally {
  # Ensure logs are cleaned up even if script fails
  Remove-Item -ErrorAction SilentlyContinue "npm-*.log"
}
