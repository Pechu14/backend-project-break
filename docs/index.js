const basicInfo = require('./basicInfo');
const components = require('./components');
const productRoutes = require('./productsRoutes');

module.exports = {
  ...basicInfo,
  ...components,
  ...productRoutes,
};
