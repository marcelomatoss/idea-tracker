# 🚀 Idea Tracker

Rastreador rápido e intuitivo de ideias, desenvolvido em até 72h no desafio **"Idea-to-Cloud"**.

## 🧩 Funcionalidades
- Criar, editar, excluir e buscar ideias
- Organização por categorias e tags
- Interface responsiva (mobile/desktop)
- Estatísticas de ideias
- API RESTful

## 🛠️ Stack Tecnológica

**Frontend:**  
React 18 · TypeScript · Tailwind CSS · Vite · shadcn/ui · Lucide

**Backend:**  
Node.js · Express · File System · UUID · CORS

**Testes e Qualidade:**  
Jest · React Testing Library · @testing-library/jest-dom · ESLint · Prettier

**Observabilidade:**  
Winston · Prometheus · Grafana · ELK (Elasticsearch, Logstash, Kibana) · Filebeat

**DevOps:**  
Docker · Docker Compose · Nginx · GitHub Actions · Trivy

## 🐳 Como usar

### Local
```bash
git clone <repo>
cd idea-tracker
yarn install
yarn dev
# Acesse: http://localhost:8080
```

### Backend
```bash
cd backend
yarn install
yarn dev
# Acesse: http://localhost:3001
```

### Docker
```bash
docker-compose up --build
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## 📦 Scripts úteis
```bash
chmod +x docker-scripts.sh

./docker-scripts.sh install       # Instala dependências
./docker-scripts.sh dev-local     # Dev local sem Docker
./docker-scripts.sh dev           # Dev com Docker
./docker-scripts.sh start         # Produção
./docker-scripts.sh logs          # Ver logs
```

## 🧪 Testes
```bash
yarn test             # Executar testes
yarn test --coverage  # Testes com cobertura
cd backend && yarn test  # Testes backend
```

## 📊 Monitoramento

### Métricas (Prometheus)
- `http_requests_total`
- `http_request_duration_seconds`
- `ideas_created_total`
- `ideas_deleted_total`
- `ideas_total`

### Endpoints
- `/api/metrics` – Métricas
- `/api/health` – Status básico
- `/api/health/full` – Saúde completa

### Acesso aos dashboards:
- **Grafana:** http://localhost:3030  
- **Prometheus:** http://localhost:9090  
- **Kibana:** http://localhost:5601

## 🔗 API

**Base URL:** `http://localhost:3001/api`

| Método | Endpoint       | Descrição           |
|--------|----------------|---------------------|
| GET    | /ideas         | Listar ideias       |
| POST   | /ideas         | Criar ideia         |
| PUT    | /ideas/:id     | Atualizar ideia     |
| DELETE | /ideas/:id     | Remover ideia       |

### Exemplo de Payload
```json
{
  "title": "Título da ideia",
  "description": "Descrição detalhada",
  "category": "personal|work|creative|tech|business",
  "tags": ["tag1", "tag2"]
}
```

## 🔄 CI/CD & Qualidade

**CI/CD com GitHub Actions:**
- Testes automatizados
- Coverage report
- Lint e build
- Docker build & push
- Scanner de vulnerabilidades

### Qualidade
```bash
yarn lint           # Verifica problemas
yarn lint:fix       # Corrige automaticamente
yarn format         # Formata código
yarn format:check   # Verifica formatação
```

## 🤝 Contribuição

1. Fork o projeto  
2. Crie uma branch: `git checkout -b feature/nova-feature`  
3. Commit: `git commit -am 'feat: nova feature'`  
4. Push: `git push origin feature/nova-feature`  
5. Crie um Pull Request

### Tipos de Commit
```bash
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação de código
refactor: refatoração
test: testes
chore: tarefas de manutenção
```