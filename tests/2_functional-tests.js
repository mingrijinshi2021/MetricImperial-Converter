const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  // 1. 测试有效的转换
  test('Convert a valid input such as 10L: GET request to /api/convert', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' }) // 发送查询参数
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'string');
        done();
      });
  });

  // 2. 测试无效单位
  test('Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function (err, res) {
        assert.equal(res.status, 400);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });

  // 3. 测试无效数字格式
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function (err, res) {
        assert.equal(res.status, 400);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });

  // 4. 测试无效的数字 + 单位
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function (err, res) {
        assert.equal(res.status, 400);
        assert.isObject(res.body);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });

  // 5. 测试没有数值的输入
  test('Convert with no number such as kg: GET request to /api/convert', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'string');
        done();
      });
  });

});
