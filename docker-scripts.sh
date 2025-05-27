
#!/bin/bash

# Scripts para facilitar o uso do Docker com Yarn

case "$1" in
  "install")
    echo "📦 Installing dependencies with Yarn..."
    yarn install
    cd backend && yarn install
    echo "✅ Dependencies installed!"
    ;;
  "build")
    echo "🔨 Building Docker images..."
    docker-compose build
    ;;
  "start")
    echo "🚀 Starting full application (backend + frontend) in production mode..."
    docker-compose up -d
    echo "📊 Backend API: http://localhost:3001"
    echo "🌐 Frontend: http://localhost:3000"
    ;;
  "dev")
    echo "💻 Starting application in development mode..."
    docker-compose --profile dev up
    echo "📊 Backend API: http://localhost:3001"
    echo "🌐 Frontend: http://localhost:8080"
    ;;
  "dev-local")
    echo "💻 Starting local development (no Docker)..."
    echo "Starting backend..."
    cd backend && yarn dev &
    BACKEND_PID=$!
    echo "Starting frontend..."
    yarn dev &
    FRONTEND_PID=$!
    echo "📊 Backend API: http://localhost:3001"
    echo "🌐 Frontend: http://localhost:8080"
    echo "Press Ctrl+C to stop both services"
    trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
    wait
    ;;
  "backend")
    echo "🔧 Starting only backend in development mode..."
    docker-compose up idea-tracker-backend
    ;;
  "backend-local")
    echo "🔧 Starting backend locally..."
    cd backend && yarn dev
    ;;
  "stop")
    echo "⏹️ Stopping application..."
    docker-compose down
    ;;
  "logs")
    echo "📋 Showing logs..."
    docker-compose logs -f
    ;;
  "logs-backend")
    echo "📋 Showing backend logs..."
    docker-compose logs -f idea-tracker-backend
    ;;
  "logs-frontend")
    echo "📋 Showing frontend logs..."
    docker-compose logs -f idea-tracker
    ;;
  "clean")
    echo "🧹 Cleaning Docker resources..."
    docker-compose down -v
    docker system prune -f
    ;;
  "reset")
    echo "🔄 Resetting backend data..."
    docker-compose down -v
    docker volume rm $(docker volume ls -q | grep backend-data) 2>/dev/null || true
    echo "Backend data reset complete"
    ;;
  *)
    echo "📖 Uso: $0 {install|build|start|dev|dev-local|backend|backend-local|stop|logs|logs-backend|logs-frontend|clean|reset}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  install       - Instala dependências com Yarn"
    echo "  build         - Constrói as imagens Docker"
    echo "  start         - Inicia backend + frontend em produção (portas 3001 + 3000)"
    echo "  dev           - Inicia backend + frontend em desenvolvimento com Docker (portas 3001 + 8080)"
    echo "  dev-local     - Inicia backend + frontend localmente sem Docker (portas 3001 + 8080)"
    echo "  backend       - Inicia apenas o backend com Docker (porta 3001)"
    echo "  backend-local - Inicia apenas o backend localmente (porta 3001)"
    echo "  stop          - Para a aplicação"
    echo "  logs          - Mostra logs de todos os serviços"
    echo "  logs-backend  - Mostra logs apenas do backend"
    echo "  logs-frontend - Mostra logs apenas do frontend"
    echo "  clean         - Limpa recursos Docker"
    echo "  reset         - Reseta os dados do backend"
    ;;
esac
