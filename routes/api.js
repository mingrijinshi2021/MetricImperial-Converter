module.exports = function (app) {
  const express = require('express');
  const router = express.Router();
  const ConvertHandler = require('../controllers/convertHandler');

  router.get('/api/convert', function (req, res) {
    let input = req.query.input;
    let convertHandler = new ConvertHandler();
    
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

// 判断是否无效的辅助函数
const isInvalid = (val) => val === null || val === undefined || val === "";
// 如果数字和单位都无效，返回 400
if (isInvalid(initNum) && isInvalid(initUnit)) {
  return res.json('invalid unit and number');
}

// 如果单位无效，返回 400
if (isInvalid(initUnit)) {
  return res.json('invalid unit');
}

// 如果数字无效，返回 400
if (isInvalid(initNum)) {
  return res.json('invalid number');
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
