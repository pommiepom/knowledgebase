module.exports = {
  apps: [{
    name: 'knowledgebase',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watches: ['node_modules', 'uploads'],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
