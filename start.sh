#!/bin/bash

echo "🚀 Iniciando IP Lookup Tool"
echo "=========================="

# Verificar se Go está instalado
if ! command -v go &> /dev/null; then
    echo "❌ Go não está instalado. Por favor, instale Go primeiro."
    exit 1
fi

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js primeiro."
    exit 1
fi

echo "✅ Go e Node.js encontrados"

# Instalar dependências Go
echo "📦 Instalando dependências Go..."
go mod tidy

# Navegar para o frontend e instalar dependências
echo "📦 Instalando dependências do frontend..."
cd frontend
npm install

echo ""
echo "🎉 Instalação concluída!"
echo ""
echo "Para usar a aplicação:"
echo ""
echo "1. Iniciar o servidor backend (em um terminal):"
echo "   cd ip6_app"
echo "   go run main.go server"
echo ""
echo "2. Iniciar o frontend (em outro terminal):"
echo "   cd ip6_app/frontend"
echo "   npm run dev"
echo ""
echo "3. Acessar: http://localhost:3000"
echo ""
echo "Ou usar via linha de comando:"
echo "   go run main.go ip --host google.com"
echo "   go run main.go servidores --host google.com"
echo "   go run main.go meuip"