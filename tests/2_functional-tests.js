const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    // 1. 测试转换一个有效的输入
    test('Convert a valid input such as 10L: GET request to /api/convert', function (done) {
        chai.request(server)
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200); // 响应状态码应为 200
                assert.equal(res.body.initNum, 10); // 初始值应为 10
                assert.equal(res.body.initUnit, 'L'); // 初始单位应为 L
                assert.approximately(res.body.returnNum, 2.64172, 0.0001); // 结果近似于 2.64172
                assert.equal(res.body.returnUnit, 'gal'); // 目标单位应为 gal
                done();
            });
    });

    // 2. 测试无效单位
    test('Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
        chai.request(server)
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 400); // 预期返回 400 错误
                assert.equal(res.text, 'invalid unit'); // 预期错误消息
                done();
            });
    });

    // 3. 测试无效数字格式
    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.equal(res.text, 'invalid number');
                done();
            });
    });

    // 4. 测试无效数字+单位
    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 400);
                assert.equal(res.text, 'invalid number and unit');
                done();
            });
    });

    // 5. 测试无数字输入时默认值为 1
    test('Convert with no number such as kg: GET request to /api/convert', function (done) {
        chai.request(server)
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1); // 默认数值应为 1
                assert.equal(res.body.initUnit, 'kg');
                assert.approximately(res.body.returnNum, 2.20462, 0.0001);
                assert.equal(res.body.returnUnit, 'lbs');
                done();
            });
    });
});

