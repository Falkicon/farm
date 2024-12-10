@echo off

:: Create core directories
mkdir "src\frontend\core\feature-registry" 2>nul
mkdir "src\frontend\core\router" 2>nul

:: Create feature directories
mkdir "src\frontend\features\home\components" 2>nul
mkdir "src\frontend\features\home\templates" 2>nul

:: Create shared directories
mkdir "src\frontend\shared\components" 2>nul
mkdir "src\frontend\shared\utils" 2>nul
mkdir "src\frontend\shared\types" 2>nul

:: Create test directories
mkdir "src\frontend\shared\components\__tests__" 2>nul
mkdir "src\frontend\features\home\__tests__" 2>nul

:: Create/move core files
type nul > "src\frontend\core\feature-registry\types.ts"
type nul > "src\frontend\core\feature-registry\feature-registry.ts"
type nul > "src\frontend\core\router\router-service.ts"

:: Create/move feature files
type nul > "src\frontend\features\home\index.ts"
type nul > "src\frontend\features\home\templates\home-page.ts"

:: Create shared component files
type nul > "src\frontend\shared\components\app-button.ts"
type nul > "src\frontend\shared\components\app-card.ts"
type nul > "src\frontend\shared\components\app-input.ts"
type nul > "src\frontend\shared\components\index.ts"

:: Create styles directory and file
mkdir "src\frontend\styles" 2>nul
type nul > "src\frontend\styles\tailwind.css"

:: Create docs
mkdir "docs" 2>nul
type nul > "docs\ARCHITECTURE.md"

:: Remove old directories if empty
if exist "src\frontend\components" rd /s /q "src\frontend\components" 