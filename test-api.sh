#!/bin/bash

echo "🧪 Testando API do IP Lookup Tool"
echo "================================="

# Verificar se o servidor está rodando
echo "Verificando se o servidor está rodando na porta 8080..."
if ! curl -s http://localhost:8080/api/meuip > /dev/null; then
    echo "❌ Servidor não está rodando. Execute primeiro:"
    echo "   go run main.go server"
    exit 1
fi

echo "✅ Servidor está rodando!"
echo ""

# Testar endpoint de IPs
echo "🔍 Testando busca de IPs para google.com:"
curl -s "http://localhost:8080/api/ip?host=google.com" | python3 -m json.tool
echo ""

# Testar endpoint de servidores
echo "🖥️ Testando busca de servidores DNS para google.com:"
curl -s "http://localhost:8080/api/servidores?host=google.com" | python3 -m json.tool
echo ""

# Testar endpoint de meu IP
echo "🌐 Testando busca do meu IP público:"
curl -s "http://localhost:8080/api/meuip" | python3 -m json.tool
echo ""

echo "✅ Testes concluídos!"