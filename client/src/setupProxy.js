const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/api', { target: 'http://localhost:3001/' }));
    app.use(createProxyMiddleware('/auth', { target: 'http://localhost:3002/' }));
};