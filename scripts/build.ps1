# Navigate to repo root (from scripts\)
Set-Location (Join-Path $PSScriptRoot "..")

# Clean build folder
Remove-Item -Recurse -Force .\build -ErrorAction SilentlyContinue
New-Item -ItemType Directory .\build | Out-Null

Write-Host "=== Building API ==="
Set-Location .\apps\api
Remove-Item -Recurse -Force .\publish -ErrorAction SilentlyContinue
dotnet publish Api.csproj -c Release -o .\publish
Copy-Item .\publish\* ..\..\build -Recurse -Force

Write-Host "=== Building Web Client ==="
Set-Location ..\web
Remove-Item -Recurse -Force .\dist -ErrorAction SilentlyContinue
npm run build
New-Item -ItemType Directory ..\..\build\wwwroot -Force | Out-Null
Copy-Item .\dist\* ..\..\build\wwwroot -Recurse -Force

Set-Location ..\..\
Write-Host "Build completed. Output in .\build"

# ---- ZIP the build folder ----
# Read version from scripts/version.txt
$versionFile = ".\scripts\version.txt"
$version = Get-Content $versionFile | Select-Object -First 1

# Fallback if empty
if ([string]::IsNullOrWhiteSpace($version)) {
  $version = "0"
}

$zipFile = ".\build-v$version.zip"

if (Test-Path $zipFile) {
  Remove-Item $zipFile -Force
}

Write-Host "Zipping build directory..."
Compress-Archive -Path .\build\* -DestinationPath $zipFile

Write-Host "ZIP complete: build.zip"
