module.exports = function (app) {
  const express = require('express');
  const router = express.Router();
  const ConvertHandler = require('../controllers/convertHandler');

  router.get('/api/convert', function (req, res) {
      let input = req.query.input;
      let convertHandler = new ConvertHandler();
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.json({ string: resultString });
  });

  app.use(router); // ✅ 这样 `app` 才能正确使用 router
};
