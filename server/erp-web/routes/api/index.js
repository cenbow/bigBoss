module.exports = function(app) {
  app.use('/api/general', require('./general'));
  app.use('/api/product', require('./product'));
  app.use('/api/order', require('./order'));
  app.use('/api/aftersale', require('./aftersale'));
  app.use('/api/pick', require('./pick'));
  app.use('/api/inventory', require('./inventory'));
  app.use('/api/purchase', require('./purchase'));
  app.use('/api/report', require('./report'));
  app.use('/api/customs', require('./customs'));
  app.use('/api/common', require('./common'));
};