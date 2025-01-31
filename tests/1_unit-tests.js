const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('convertHandler should correctly read a whole number input', function () {
    assert.equal(convertHandler.getNum("5kg"), 5);
  });

  test('convertHandler should correctly read a decimal number input', function () {
    assert.equal(convertHandler.getNum("5.5kg"), 5.5);
  });

  test('convertHandler should correctly read a fractional input', function () {
    assert.equal(convertHandler.getNum("1/2kg"), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.equal(convertHandler.getNum("5.5/2kg"), 2.75);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
    assert.isNull(convertHandler.getNum("3/2/3kg"));
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.equal(convertHandler.getNum("kg"), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    let units = ["gal", "L", "lbs", "kg", "mi", "km"];
    units.forEach(unit => {
      assert.equal(convertHandler.getUnit(`5${unit}`), unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.isNull(convertHandler.getUnit("5xyz"));
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    let inputUnits = ["gal", "L", "lbs", "kg", "mi", "km"];
    let expectedUnits = ["L", "gal", "kg", "lbs", "km", "mi"];
    inputUnits.forEach((unit, index) => {
      assert.equal(convertHandler.getReturnUnit(unit), expectedUnits[index]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    let unitMap = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };
    Object.keys(unitMap).forEach(unit => {
      assert.equal(convertHandler.spellOutUnit(unit), unitMap[unit]);
    });
  });

  test('convertHandler should correctly convert gal to L', function () {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.0001);
  });

  test('convertHandler should correctly convert L to gal', function () {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.0001);
  });

  test('convertHandler should correctly convert mi to km', function () {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.0001);
  });

  test('convertHandler should correctly convert km to mi', function () {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.0001);
  });

  test('convertHandler should correctly convert lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.0001);
  });

  test('convertHandler should correctly convert kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.0001);
  });

});
