
#!/bin/sh

echo "🚀 Iniciando Idea Tracker..."

# Iniciar backend em background
echo "🔧 Iniciando backend..."
cd /app/backend && yarn start &

# Aguardar backend iniciar
sleep 5

# Iniciar servidor estático para frontend
echo "🌐 Iniciando frontend..."
cd /app
yarn global add serve
serve -s dist -l 3000 &

echo "✅ Aplicação iniciada!"
echo "📊 Backend API: porta 3001"
echo "🌐 Frontend: porta 3000"

# Manter container rodando
wait
