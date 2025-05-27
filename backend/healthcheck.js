
const { logger } = require('./middleware/logger');
const fs = require('fs');
const path = require('path');

// Verificação de saúde da aplicação
const healthCheck = {
  // Verificar se o arquivo de dados existe e é acessível
  checkDataFile: () => {
    try {
      const dataFile = path.join(__dirname, 'data', 'ideas.json');
      const stats = fs.statSync(dataFile);
      return {
        status: 'healthy',
        message: 'Data file accessible',
        size: stats.size,
        lastModified: stats.mtime,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Data file not accessible',
        error: error.message,
      };
    }
  },

  // Verificar uso de memória
  checkMemory: () => {
    const memUsage = process.memoryUsage();
    const memUsageMB = {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024),
    };

    const isHealthy = memUsageMB.heapUsed < 500; // Alert se usar mais de 500MB

    return {
      status: isHealthy ? 'healthy' : 'warning',
      message: `Memory usage: ${memUsageMB.heapUsed}MB`,
      details: memUsageMB,
    };
  },

  // Verificar uptime
  checkUptime: () => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return {
      status: 'healthy',
      message: `Uptime: ${hours}h ${minutes}m ${seconds}s`,
      uptimeSeconds: uptime,
    };
  },

  // Verificação completa
  fullCheck: () => {
    const checks = {
      dataFile: healthCheck.checkDataFile(),
      memory: healthCheck.checkMemory(),
      uptime: healthCheck.checkUptime(),
      timestamp: new Date().toISOString(),
    };

    const overallStatus = Object.values(checks)
      .filter(check => check.status)
      .every(check => check.status === 'healthy') ? 'healthy' : 'degraded';

    logger.info('Health check performed', { checks, overallStatus });

    return {
      status: overallStatus,
      checks,
    };
  },
};

module.exports = healthCheck;
