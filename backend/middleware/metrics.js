
const client = require('prom-client');

// Criar um registry para as métricas
const register = new client.Registry();

// Métricas padrão do sistema
client.collectDefaultMetrics({ register });

// Contador de requisições HTTP
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Histograma de duração das requisições
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.001, 0.005, 0.015, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 1.0],
});

// Contador de ideias criadas
const ideasCreated = new client.Counter({
  name: 'ideas_created_total',
  help: 'Total number of ideas created',
});

// Contador de ideias deletadas
const ideasDeleted = new client.Counter({
  name: 'ideas_deleted_total',
  help: 'Total number of ideas deleted',
});

// Gauge para número total de ideias
const totalIdeas = new client.Gauge({
  name: 'ideas_total',
  help: 'Total number of ideas in the system',
});

// Registrar métricas
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);
register.registerMetric(ideasCreated);
register.registerMetric(ideasDeleted);
register.registerMetric(totalIdeas);

// Middleware para coletar métricas
const metricsMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - startTime) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      { method: req.method, route: route },
      duration
    );
  });

  next();
};

// Endpoint para exposição das métricas
const metricsEndpoint = async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
};

module.exports = {
  register,
  metricsMiddleware,
  metricsEndpoint,
  ideasCreated,
  ideasDeleted,
  totalIdeas,
};
