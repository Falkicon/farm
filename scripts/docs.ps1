# Documentation Management Script
param(
    [Parameter()]
    [ValidateSet('serve', 'build', 'deploy', 'clean')]
    [string]$Command = 'serve',
    [switch]$Help
)

# Help text
$helpText = @"
Documentation Management Script

Usage:
    .\docs.ps1 [-Command <command>] [-Help]

Commands:
    serve   - Start the documentation server (default)
    build   - Build the documentation
    deploy  - Deploy to GitHub Pages
    clean   - Clean the documentation build

Options:
    -Help   - Show this help message

Examples:
    .\docs.ps1                 # Starts the docs server
    .\docs.ps1 -Command build  # Builds the docs
    .\docs.ps1 -Command deploy # Deploys to GitHub Pages
"@

# Show help if requested
if ($Help) {
    Write-Host $helpText
    exit 0
}

# Function to check if Python is installed
function Test-Python {
    try {
        python --version
        return $true
    }
    catch {
        Write-Host "Python is not installed or not in PATH. Please install Python first." -ForegroundColor Red
        return $false
    }
}

# Function to check if MkDocs is installed
function Test-MkDocs {
    try {
        python -m mkdocs --version
        return $true
    }
    catch {
        Write-Host "MkDocs is not installed. Installing required packages..." -ForegroundColor Yellow
        python -m pip install mkdocs mkdocs-dracula-theme mkdocs-minify-plugin
        return $true
    }
}

# Check requirements
if (-not (Test-Python)) { exit 1 }
if (-not (Test-MkDocs)) { exit 1 }

# Execute command
switch ($Command) {
    'serve' {
        Write-Host "Starting documentation server..." -ForegroundColor Green
        python -m mkdocs serve
    }
    'build' {
        Write-Host "Building documentation..." -ForegroundColor Green
        python -m mkdocs build
    }
    'deploy' {
        Write-Host "Deploying documentation to GitHub Pages..." -ForegroundColor Green
        python -m mkdocs gh-deploy
    }
    'clean' {
        Write-Host "Cleaning documentation build..." -ForegroundColor Green
        if (Test-Path "site") {
            Remove-Item -Recurse -Force "site"
        }
        Write-Host "Documentation build cleaned." -ForegroundColor Green
    }
}
