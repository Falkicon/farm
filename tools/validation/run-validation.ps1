# Run the validation and capture all output
$output = npm run validate:specs -- $args[0] 2>&1

# Get the last line which should be our log file path
$logFile = $output | Select-Object -Last 1

Write-Host "Log file: $logFile"

# If we have a log file path and it exists
if ($logFile -and (Test-Path $logFile)) {
    Write-Host "`nValidation Results:"
    Write-Host "==================`n"
    Get-Content $logFile
} else {
    Write-Host "Error: Could not find log file"
    Write-Host "Raw output:"
    Write-Host $output
}
