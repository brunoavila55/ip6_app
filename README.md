# IP Lookup Tool

Uma aplicação completa para consulta de informações de rede, desenvolvida com **Go** (backend) e **Next.js + Tailwind CSS** (frontend).

## 🚀 Funcionalidades

- **Busca de IPs**: Encontra todos os endereços IP associados a um domínio
- **Servidores DNS**: Lista os servidores de nomes responsáveis pelo domínio
- **Meu IP Público**: Mostra seus endereços IP públicos IPv4 e IPv6
- **Interface Web Moderna**: Frontend responsivo com Next.js e Tailwind CSS
- **API REST**: Backend em Go com endpoints JSON

## 📋 Pré-requisitos

- **Go** 1.24+ instalado
- **Node.js** 18+ instalado
- **npm** ou **yarn**

## 🛠️ Instalação e Execução

### 1. Backend (Go)

```bash
# Navegar para o diretório do projeto
cd ip6_app

# Instalar dependências Go
go mod tidy

# Executar o servidor (API)
go run main.go server
```

O servidor estará rodando em `http://localhost:8080`

### 2. Frontend (Next.js)

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## 🖥️ Uso via Linha de Comando

Você também pode usar a aplicação diretamente via linha de comando:

```bash
# Buscar IPs de um domínio
go run main.go ip --host google.com

# Buscar servidores DNS
go run main.go servidores --host google.com

# Descobrir seu IP público
go run main.go meuip
```

## 🌐 API Endpoints

### GET `/api/ip?host=exemplo.com`
Retorna os IPs associados ao host.

**Resposta:**
```json
{
  "ips": ["142.250.191.14", "2800:3f0:4004:c00::71"]
}
```

### GET `/api/servidores?host=exemplo.com`
Retorna os servidores DNS do host.

**Resposta:**
```json
{
  "servidores": ["ns1.google.com.", "ns2.google.com."]
}
```

### GET `/api/meuip`
Retorna seus IPs públicos.

**Resposta:**
```json
{
  "ipv4": "203.0.113.1",
  "ipv6": "2001:db8::1"
}
```

## 🎨 Tecnologias Utilizadas

### Backend
- **Go** - Linguagem de programação
- **urfave/cli** - Framework para CLI
- **net/http** - Servidor HTTP nativo

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones
- **clsx** - Utilitário para classes condicionais

## 📱 Interface

A interface web oferece:

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Transições e animações com Tailwind CSS
- **Feedback Visual**: Estados de loading e tratamento de erros
- **Tema Moderno**: Design limpo e profissional
- **Acessibilidade**: Componentes acessíveis e semânticos

## 🔧 Desenvolvimento

### Estrutura do Projeto

```
ip6_app/
├── app/
│   └── app.go          # Lógica principal da aplicação Go
├── frontend/
│   ├── src/
│   │   ├── app/        # Páginas Next.js (App Router)
│   │   ├── components/ # Componentes React reutilizáveis
│   │   └── lib/        # Utilitários e API client
│   ├── package.json
│   └── tailwind.config.js
├── main.go             # Ponto de entrada da aplicação
├── go.mod              # Dependências Go
└── README.md
```

### Scripts Disponíveis

**Backend:**
```bash
go run main.go server    # Iniciar servidor API
go run main.go ip        # Buscar IPs via CLI
go run main.go servidores # Buscar servidores via CLI
go run main.go meuip     # Buscar meu IP via CLI
```

**Frontend:**
```bash
npm run dev     # Desenvolvimento
npm run build   # Build para produção
npm run start   # Executar build de produção
npm run lint    # Linter
```

## 🚀 Deploy

### Backend
```bash
# Build do executável
go build -o ip-lookup main.go

# Executar
./ip-lookup server
```

### Frontend
```bash
# Build para produção
npm run build

# Executar
npm start
```

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

---

Desenvolvido com ❤️ usando Go e Next.js