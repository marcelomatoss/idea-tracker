
# 🚀 Idea Tracker Backend

Backend REST API para o Idea Tracker, fornecendo endpoints para gerenciamento de ideias.

## 🛠️ Stack Tecnológica

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **File System** - Armazenamento em JSON (simulando BD)
- **UUID** - Geração de IDs únicos
- **CORS** - Habilitação de requisições cross-origin

## 📋 Endpoints Disponíveis

### Base URL
- **Desenvolvimento:** `http://localhost:3001/api`
- **Produção:** `http://localhost:3001/api`

### 🔍 Health Check
```
GET /api/health
```
Retorna o status da API

### 💡 Ideas

#### Listar todas as ideias
```
GET /api/ideas
```

#### Criar nova ideia
```
POST /api/ideas
Content-Type: application/json

{
  "title": "Título da ideia",
  "description": "Descrição detalhada",
  "category": "personal|work|creative|tech|business",
  "tags": ["tag1", "tag2"]
}
```

#### Atualizar ideia
```
PUT /api/ideas/:id
Content-Type: application/json

{
  "title": "Novo título",
  "description": "Nova descrição",
  "category": "work",
  "tags": ["nova-tag"]
}
```

#### Deletar ideia
```
DELETE /api/ideas/:id
```

## 🐳 Executar com Docker

### Apenas Backend
```bash
cd backend
docker build -t idea-tracker-backend .
docker run -p 3001:3001 idea-tracker-backend
```

### Desenvolvimento Local
```bash
npm install
npm run dev
```

## 📊 Estrutura de Dados

### Idea Object
```typescript
{
  id: string;              // UUID único
  title: string;           // Título da ideia
  description: string;     // Descrição detalhada
  category: string;        // Categoria (personal, work, etc.)
  tags: string[];         // Array de tags
  createdAt: string;      // ISO timestamp
}
```

## 📁 Estrutura do Projeto

```
backend/
├── server.js           # Servidor Express principal
├── package.json        # Dependências e scripts
├── Dockerfile         # Container para produção
├── data/              # Diretório de dados persistentes
│   └── ideas.json     # Arquivo de armazenamento
└── README.md          # Esta documentação
```

## 🔒 CORS

O backend está configurado para aceitar requisições de qualquer origem durante o desenvolvimento. Em produção, configure as origens permitidas adequadamente.

## 📝 Logs

O servidor registra todas as operações no console:
- Requisições recebidas
- Operações de arquivo
- Erros e exceções

## 🔄 Persistência

Os dados são armazenados em `data/ideas.json` e persistem entre reinicializações do container através de volumes Docker.
