
#!/bin/bash

echo "🚀 Iniciando Idea Tracker localmente..."

# Verificar se yarn está instalado
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn não encontrado. Instalando..."
    npm install -g yarn
fi

# Instalar dependências
echo "📦 Instalando dependências..."
yarn install

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd backend && yarn install && cd ..

# Iniciar backend
echo "🔧 Iniciando backend..."
cd backend && yarn dev &
BACKEND_PID=$!

# Aguardar backend iniciar
sleep 3

# Iniciar frontend
echo "🌐 Iniciando frontend..."
cd .. && yarn dev &
FRONTEND_PID=$!

echo ""
echo "✅ Aplicação iniciada!"
echo "📊 Backend API: http://localhost:3001"
echo "🌐 Frontend: http://localhost:8080"
echo ""
echo "Pressione Ctrl+C para parar ambos os serviços"

# Função para limpar processos ao sair
cleanup() {
    echo "🛑 Parando serviços..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Aguardar até que um dos processos termine
wait
