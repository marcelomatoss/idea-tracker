
# 🎯 Idea Tracker - Rastreador Rápido de Ideias

**Desafio:** "Idea-to-Cloud in 72 Hours"

Uma micro aplicação web para capturar, organizar e desenvolver ideias de forma inteligente e intuitiva.

## 🚀 Problema Resolvido

**"Dificuldade de lembrar e organizar ideias valiosas"**

Muitas vezes temos insights importantes mas não temos onde anotá-los rapidamente ou de forma organizada. O Idea Tracker resolve isso oferecendo:

- ✅ Captura instantânea de ideias
- ✅ Organização por categorias e tags
- ✅ Busca e filtros inteligentes
- ✅ Interface responsiva e intuitiva
- ✅ Armazenamento local e em nuvem

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **Vite** - Build tool e desenvolvimento

### Testing & Quality
- **Jest** - Framework de testes unitários
- **React Testing Library** - Testes de componentes React
- **@testing-library/jest-dom** - Matchers customizados
- **ESLint** - Linting e análise de código
- **Prettier** - Formatação de código

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **File System** - Armazenamento em JSON
- **UUID** - Geração de IDs únicos
- **CORS** - Habilitação de requisições cross-origin

### Observabilidade & Monitoring
- **Winston** - Sistema de logs estruturados
- **Prometheus** - Coleta de métricas e monitoramento
- **Grafana** - Dashboards e visualização de métricas
- **ELK Stack** - Logs centralizados (Elasticsearch, Logstash, Kibana)
- **Filebeat** - Shipping de logs

### DevOps & Deploy
- **Docker** - Containerização
- **Docker Compose** - Orquestração de serviços
- **Nginx** - Servidor web para produção
- **GitHub Actions** - CI/CD automático
- **Trivy** - Scanner de vulnerabilidades

## 🎨 Features Implementadas

### ✨ Core Features
- [x] **Criar ideias** com título, descrição, categoria e tags
- [x] **Visualizar ideias** em cards organizados por categoria
- [x] **Editar ideias** existentes
- [x] **Excluir ideias** com confirmação
- [x] **Busca em tempo real** por título e descrição
- [x] **Filtros por categoria** (Pessoal, Trabalho, Criativo, Tech, Negócios)
- [x] **Filtros por tags** múltiplas
- [x] **Estatísticas** de ideias por categoria
- [x] **API REST** completa para backend

### 🎯 UX/UI Features
- [x] **Design responsivo** para mobile e desktop
- [x] **Cards coloridos** por categoria com gradientes
- [x] **Animações suaves** hover e transições
- [x] **Toast notifications** para feedback
- [x] **Interface minimalista** focada na produtividade
- [x] **Estados vazios** com call-to-actions claros

### 📱 Responsividade
- [x] **Mobile First** design
- [x] **Grid adaptativo** (1 col mobile, 2-3 cols desktop)
- [x] **Touch-friendly** botões e interactions
- [x] **Typography scale** otimizada para diferentes telas

### 🔧 DevOps Features
- [x] **Testes unitários** com Jest e React Testing Library
- [x] **Logs estruturados** com Winston
- [x] **Métricas de aplicação** com Prometheus
- [x] **Dashboards de monitoramento** com Grafana
- [x] **Health checks** automatizados
- [x] **CI/CD pipeline** com GitHub Actions
- [x] **Scanner de segurança** com Trivy

## 🚀 Como Usar

### Instalação Local

```bash
# Clone o repositório
git clone <seu-repo-url>
cd idea-tracker

# Instale as dependências
yarn install

# Execute em desenvolvimento
yarn dev

# Acesse http://localhost:8080
```

### Backend Local

```bash
# Instale dependências do backend
cd backend && yarn install

# Execute o backend
yarn dev

# API disponível em http://localhost:3001
```

### Docker (Recomendado)

```bash
# Construir e iniciar todos os serviços
docker-compose up --build

# Acessar:
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Scripts Utilitários

```bash
# Facilitar desenvolvimento
chmod +x docker-scripts.sh

# Instalar dependências
./docker-scripts.sh install

# Desenvolvimento local (sem Docker)
./docker-scripts.sh dev-local

# Desenvolvimento com Docker
./docker-scripts.sh dev

# Produção
./docker-scripts.sh start

# Ver logs
./docker-scripts.sh logs
```

## 🧪 Testes

### Executar Testes

```bash
# Testes do frontend
yarn test

# Testes com coverage
yarn test --coverage

# Testes em modo watch
yarn test --watch

# Testes do backend
cd backend && yarn test
```

### Estrutura de Testes

```
src/
├── components/__tests__/
│   ├── IdeaCard.test.tsx
│   ├── IdeaForm.test.tsx
│   └── SearchAndFilter.test.tsx
├── services/__tests__/
│   └── apiService.test.ts
├── hooks/__tests__/
│   └── use-toast.test.ts
└── setupTests.ts

backend/
├── __tests__/
│   ├── server.test.js
│   ├── routes.test.js
│   └── middleware.test.js
└── jest.config.js
```

### Coverage Reports

Os relatórios de coverage são gerados em:
- **HTML:** `coverage/lcov-report/index.html`
- **LCOV:** `coverage/lcov.info`
- **JSON:** `coverage/coverage-final.json`

## 📊 Observabilidade & Monitoring

### Logs

O sistema utiliza **Winston** para logs estruturados:

```bash
# Logs em desenvolvimento (console)
yarn dev

# Logs em produção (arquivos)
backend/logs/
├── combined.log    # Todos os logs
├── error.log      # Apenas erros
└── access.log     # Logs de acesso HTTP
```

### Métricas com Prometheus

**Métricas disponíveis:**
- `http_requests_total` - Total de requisições HTTP
- `http_request_duration_seconds` - Duração das requisições
- `ideas_created_total` - Total de ideias criadas
- `ideas_deleted_total` - Total de ideias deletadas
- `ideas_total` - Número total de ideias no sistema

**Endpoint de métricas:** `http://localhost:3001/api/metrics`

### Monitoring Stack

```bash
# Iniciar stack completa de monitoramento
docker-compose -f docker-compose.yml -f docker/docker-compose.monitoring.yml up

# Acessar dashboards:
# Grafana: http://localhost:3030 (admin/admin123)
# Prometheus: http://localhost:9090
# Kibana: http://localhost:5601
```

### Health Checks

**Verificações de saúde disponíveis:**
- `/api/health` - Status básico da API
- `/api/health/full` - Verificação completa (memória, disco, dados)

```bash
# Verificar saúde da aplicação
curl http://localhost:3001/api/health/full
```

### Dashboards Grafana

**Dashboards pré-configurados:**
- **Application Overview** - Métricas gerais da aplicação
- **HTTP Requests** - Análise de requisições e performance
- **System Resources** - CPU, memória e disco
- **Business Metrics** - Métricas de negócio (ideias criadas, etc.)

### Alertas

**Alertas configurados:**
- Alta latência de requisições (> 500ms)
- Taxa de erro elevada (> 5%)
- Uso de memória alto (> 80%)
- Disco cheio (> 90%)

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                    # Componentes shadcn/ui
│   ├── __tests__/            # Testes de componentes
│   ├── IdeaCard.tsx          # Card individual de ideia
│   ├── IdeaForm.tsx          # Formulário de criação/edição
│   └── SearchAndFilter.tsx   # Busca e filtros
├── pages/
│   ├── Index.tsx             # Página principal
│   └── NotFound.tsx          # Página 404
├── services/
│   ├── __tests__/            # Testes de serviços
│   └── apiService.ts         # Integração com API
├── hooks/
│   ├── __tests__/            # Testes de hooks
│   └── use-toast.ts          # Hook de notificações
├── lib/
│   └── utils.ts              # Utilitários
└── setupTests.ts             # Configuração dos testes

backend/
├── middleware/
│   ├── logger.js             # Sistema de logs
│   └── metrics.js            # Coleta de métricas
├── __tests__/                # Testes do backend
├── logs/                     # Arquivos de log
├── data/                     # Dados persistentes
├── server.js                 # Servidor Express
├── healthcheck.js            # Verificações de saúde
└── package.json              # Dependências backend

docker/
├── docker-compose.yml        # Orquestração principal
├── docker-compose.monitoring.yml # Stack de monitoramento
├── prometheus.yml            # Configuração Prometheus
├── filebeat.yml             # Configuração Filebeat
├── Dockerfile               # Frontend produção
├── Dockerfile.dev           # Frontend desenvolvimento
├── Dockerfile.deploy        # Deploy unificado
└── nginx.conf               # Configuração Nginx

.github/
└── workflows/
    ├── ci.yml               # Pipeline CI/CD
    └── security.yml         # Scanner de segurança
```

## 🔗 API Endpoints

### Base URL: `http://localhost:3001/api`

#### Health & Monitoring
- **GET** `/health` - Status básico da API
- **GET** `/health/full` - Verificação completa de saúde
- **GET** `/metrics` - Métricas Prometheus

#### Ideas CRUD
- **GET** `/ideas` - Listar todas as ideias
- **POST** `/ideas` - Criar nova ideia
- **PUT** `/ideas/:id` - Atualizar ideia
- **DELETE** `/ideas/:id` - Deletar ideia

### Exemplo de Payload:
```json
{
  "title": "Título da ideia",
  "description": "Descrição detalhada",
  "category": "personal|work|creative|tech|business",
  "tags": ["tag1", "tag2"]
}
```

## 🎨 Design System

### Paleta de Cores
```css
/* Categorias */
Personal: Pink to Rose (#ec4899 → #f43f5e)
Work: Blue to Indigo (#3b82f6 → #6366f1)
Creative: Purple to Violet (#8b5cf6 → #7c3aed)
Tech: Green to Emerald (#10b981 → #059669)
Business: Orange to Amber (#f59e0b → #d97706)

/* Interface */
Primary: Blue (#3b82f6)
Background: Gradient (Blue-50 → Purple-50)
Cards: White with category accent
```

### Tipografia
- **Headings:** Inter Bold
- **Body:** Inter Regular  
- **UI:** Inter Medium

## 🐳 Deploy com Docker

### Desenvolvimento
```bash
# Frontend + Backend com hot reload
docker-compose --profile dev up

# Acesso:
# Frontend: http://localhost:8080
# Backend: http://localhost:3001
```

### Produção
```bash
# Build e deploy
docker-compose up --build

# Acesso:
# Aplicação: http://localhost:3000
# API: http://localhost:3001
```

### Monitoramento Completo
```bash
# Deploy com stack de monitoramento
docker-compose -f docker-compose.yml -f docker/docker-compose.monitoring.yml up --build

# Acesso:
# Aplicação: http://localhost:3000
# Grafana: http://localhost:3030
# Prometheus: http://localhost:9090
# Kibana: http://localhost:5601
```

## 🔄 CI/CD Pipeline

### GitHub Actions

**Workflow Principal (.github/workflows/ci.yml):**
- ✅ **Testes unitários** em Node.js 18.x e 20.x
- ✅ **Coverage report** enviado para Codecov
- ✅ **Linting** com ESLint
- ✅ **Build** da aplicação
- ✅ **Build Docker** e push para registry
- ✅ **Scanner de segurança** com Trivy

### Qualidade de Código

```bash
# Executar linting
yarn lint

# Corrigir problemas automaticamente
yarn lint:fix

# Verificar formatação
yarn format:check

# Formatar código
yarn format
```

### Security Scanning

```bash
# Scanner de vulnerabilidades local
docker run --rm -v $(pwd):/app aquasec/trivy fs /app

# Scanner de imagens Docker
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image idea-tracker:latest
```

## 📊 Métricas de Sucesso

### Performance
- ✅ **Lighthouse Score** > 90
- ✅ **Core Web Vitals** otimizados
- ✅ **API Response Time** < 200ms (P95)
- ✅ **Frontend Build Time** < 2min

### Quality & Testing
- ✅ **Test Coverage** > 80%
- ✅ **Zero ESLint Errors**
- ✅ **Zero Security Vulnerabilities**
- ✅ **TypeScript Strict Mode**

### Observability
- ✅ **Logs estruturados** em JSON
- ✅ **Métricas de negócio** coletadas
- ✅ **Dashboards** funcionais
- ✅ **Alertas** configurados

### DevOps
- ✅ **Pipeline CI/CD** automático
- ✅ **Docker multi-stage** builds
- ✅ **Health checks** implementados
- ✅ **Zero-downtime** deployment ready

## 🔄 Roadmap & Próximos Passos

### Features Avançadas
- [ ] **Autenticação** de usuários
- [ ] **Sincronização** em tempo real
- [ ] **Colaboração** entre usuários
- [ ] **Templates** de ideias
- [ ] **Exportação** PDF/Markdown
- [ ] **Notificações** e lembretes
- [ ] **Analytics** de produtividade

### DevOps & Observability
- [x] **Docker** containerization
- [x] **CI/CD** GitHub Actions
- [x] **Testes** unitários com Jest
- [x] **Logs estruturados** Winston
- [x] **Métricas** Prometheus/Grafana
- [x] **Health checks** automatizados
- [ ] **Load testing** com k6
- [ ] **Chaos engineering** com Litmus
- [ ] **Service mesh** com Istio

### Performance & Scale
- [ ] **CDN** para assets estáticos
- [ ] **Redis** para cache
- [ ] **Database** PostgreSQL/MongoDB
- [ ] **Load balancer** Nginx/HAProxy
- [ ] **Horizontal scaling** com Kubernetes

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Faça os commits (`git commit -am 'Add nova feature'`)
4. Execute os testes (`yarn test`)
5. Verifique o linting (`yarn lint`)
6. Push para a branch (`git push origin feature/nova-feature`)
7. Abra um Pull Request

### Padrões de Commit

```bash
# Tipos de commit
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação de código
refactor: refatoração
test: adição/correção de testes
chore: manutenção geral
```

## 📝 Licença

MIT License - Sinta-se livre para usar e modificar!

---

**Desenvolvido em < 72h para o desafio "Idea-to-Cloud"** 🚀
**Stack:** React + TypeScript + Tailwind + Node.js + Docker + Observability
**Deploy:** Multi-plataforma ready (Vercel/Railway/Render)

> "A melhor ideia é aquela que você não esquece de implementar" 💡

#   i d e a - t r a c k e r  
 