const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware(["/rooms", "/rooms/:id"], { target: "http://localhost:9999" })
    );
};