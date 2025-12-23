@echo off
echo Building Windows MSI for CogniScribe...

set VERSION=1.0.0
set MSI_NAME=CogniScribe_%VERSION%_x64.msi

REM Build Tauri app (MSI output)
cd ..\..
call npm run tauri:build

REM Create output directory
if not exist "installers\output\windows" mkdir installers\output\windows

REM Copy MSI to output directory
if not exist "src-tauri\target\release\bundle\msi\%MSI_NAME%" (
    echo ERROR: MSI not found at src-tauri\target\release\bundle\msi\%MSI_NAME%
    exit /b 1
)

copy /Y "src-tauri\target\release\bundle\msi\%MSI_NAME%" "installers\output\windows\%MSI_NAME%" >nul

echo.
echo ========================================
echo Build complete!
echo ========================================
echo.
echo Installer: installers\output\windows\%MSI_NAME%
echo.
echo Silent install: msiexec /i %MSI_NAME% /qn /norestart
echo.

pause
