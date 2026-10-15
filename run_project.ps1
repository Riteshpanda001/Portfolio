# Ritesh Kumar Panda — Portfolio Launcher
# Launches Spring Boot 3 Backend (Port 5000) and React Vite Frontend (Port 5173)

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "         Starting Full-Stack Developer Portfolio          " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$rootPath = $PSScriptRoot
if (-not $rootPath) { $rootPath = Get-Location }
$backendPath = Join-Path $rootPath "Backend"
$frontendPath = Join-Path $rootPath "Frontend"

# 1. Launch Spring Boot Backend
Write-Host "`n[1/2] Launching Spring Boot Backend (Port 5000)..." -ForegroundColor Yellow
$backendCmd = "Set-Location '$backendPath'; .\mvnw.cmd spring-boot:run"
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", $backendCmd
Write-Host "Spring Boot API server starting at http://localhost:5000" -ForegroundColor Green

# 2. Launch React Vite Frontend
Write-Host "`n[2/2] Launching React Vite Frontend (Port 5173)..." -ForegroundColor Yellow
$frontendCmd = "Set-Location '$frontendPath'; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd
Write-Host "Frontend application starting at http://localhost:5173" -ForegroundColor Green

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host " Portfolio application is running!" -ForegroundColor Cyan
Write-Host " - Frontend:   http://localhost:5173" -ForegroundColor Green
Write-Host " - Backend:    http://localhost:5000" -ForegroundColor Green
Write-Host " - H2 Console: http://localhost:5000/h2-console" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
