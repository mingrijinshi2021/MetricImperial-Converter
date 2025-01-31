const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  // 1. 测试 gal 和 L 之间的转换
  test("Convert 'gal' to 'L' and vice versa", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '1gal' })  // 1 加仑转换为升
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.equal(res.body.returnUnit, 'L'); // 确保返回的单位是 'L' (大写)
        assert.approximately(res.body.returnNum, 3.78541, 0.0001); // 确保数值正确
        done();
      });
  });

  // 2. 测试 lbs 和 kg 之间的转换
  test("Convert 'lbs' to 'kg' and vice versa", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '1lbs' })  // 1 磅转换为千克
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.equal(res.body.returnUnit, 'kg');
        assert.approximately(res.body.returnNum, 0.453592, 0.0001); // 确保数值正确
        done();
      });
  });

  // 3. 测试 mi 和 km 之间的转换
  test("Convert 'mi' to 'km' and vice versa", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '1mi' })  // 1 英里转换为公里
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.equal(res.body.returnUnit, 'km');
        assert.approximately(res.body.returnNum, 1.60934, 0.0001); // 确保数值正确
        done();
      });
  });

  // 4. 测试单位不区分大小写
  test("Units should be case-insensitive", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '1GAL' })  // 使用大写单位
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.equal(res.body.returnUnit, 'L'); // 确保返回的大写单位
        done();
      });
  });

  // 5. 测试无效的单位
  test("Convert with an invalid unit", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })  // 无效单位
      .end(function (err, res) {
        assert.isString(res.text); // 现在返回的是字符串
        assert.equal(res.text, 'invalid unit'); // 直接检查文本内容
        done();
      });
  });

  // 6. 测试无效的数字格式
  test("Convert with an invalid number", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })  // 无效数字格式
      .end(function (err, res) {
        assert.isString(res.text); // 现在返回的是字符串
        assert.equal(res.text, 'invalid number'); // 直接检查文本内容
        done();
      });
  });

  // 7. 测试无效的数字和单位
  test("Convert with an invalid number and unit", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })  // 无效的数字和单位
      .end(function (err, res) {
        assert.isString(res.text); // 现在返回的是字符串
        assert.equal(res.text, 'invalid number and unit'); // 直接检查文本内容
        done();
      });
  });

  // 8. 测试没有数值的输入
  test("Convert with no number provided", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })  // 没有数字的单位
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.equal(res.body.initNum, 1); // 默认数值为 1
        done();
      });
  });

  // 9. 测试可以使用分数、十进制或两者
  test("Convert with fractions, decimals, or both", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '2.5/6gal' })  // 分数和小数结合的输入
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.approximately(res.body.returnNum, 1.57727, 0.0001); // 确保返回值准确
        done();
      });
  });

  // 10. 测试返回的结果格式
  test("Return will consist of initNum, initUnit, returnNum, returnUnit, and string", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '5gal' })  // 输入 5 加仑
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'string');
        assert.match(res.body.string, /5 gallons converts to 18.92705 liters/);  // 结果字符串
        done();
      });
  });

});
