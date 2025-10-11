@echo off
echo 🚀 启动诗句管理API系统
echo.

echo 📦 检查依赖...
if not exist node_modules (
    echo 正在安装依赖...
    npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)

echo.
echo 🔧 检查数据库配置...
if not exist config.env (
    echo ❌ 配置文件不存在，请先配置 config.env
    pause
    exit /b 1
)

echo.
echo 🚀 启动服务器...
npm start

pause
