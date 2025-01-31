module.exports = function (app) {
  const express = require('express');
  const router = express.Router();
  const ConvertHandler = require('../controllers/convertHandler');

  router.get('/api/convert', function (req, res) {
    let input = req.query.input;
    let convertHandler = new ConvertHandler();
    
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // 如果数字和单位都无效，返回 400
    if (initNum === null && initUnit === null) {
        return res.status(400).json({ error: 'invalid number and unit' });
    }

    // 如果数字无效，返回 400
    if (initNum === null) {
        return res.status(400).json({ error: 'invalid number' });
    }

    // 如果单位无效，返回 400
    if (initUnit === null) {
        return res.status(400).json({ error: 'invalid unit' });
    }

    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    

    
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: resultString
    });
});


  app.use(router);
};
