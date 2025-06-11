@echo off
echo 🚀 Iniciando IP Lookup Tool
echo ==========================

REM Verificar se Go está instalado
where go >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Go não está instalado. Por favor, instale Go primeiro.
    pause
    exit /b 1
)

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não está instalado. Por favor, instale Node.js primeiro.
    pause
    exit /b 1
)

echo ✅ Go e Node.js encontrados

REM Instalar dependências Go
echo 📦 Instalando dependências Go...
go mod tidy

REM Navegar para o frontend e instalar dependências
echo 📦 Instalando dependências do frontend...
cd frontend
npm install
cd ..

echo.
echo 🎉 Instalação concluída!
echo.
echo Para usar a aplicação:
echo.
echo 1. Iniciar o servidor backend (em um terminal):
echo    cd ip6_app
echo    go run main.go server
echo.
echo 2. Iniciar o frontend (em outro terminal):
echo    cd ip6_app/frontend
echo    npm run dev
echo.
echo 3. Acessar: http://localhost:3000
echo.
echo Ou usar via linha de comando:
echo    go run main.go ip --host google.com
echo    go run main.go servidores --host google.com
echo    go run main.go meuip

pause