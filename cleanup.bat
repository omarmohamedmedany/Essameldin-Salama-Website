@echo off
echo Cleaning up unused SSG and Node.js files...

rmdir /s /q node_modules
rmdir /s /q dist
rmdir /s /q partials
rmdir /s /q others

del /q package.json
del /q package-lock.json
del /q _headers

echo Cleanup complete! You can safely delete this cleanup.bat file now.
pause
