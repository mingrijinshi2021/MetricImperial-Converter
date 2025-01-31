function ConvertHandler() {
  this.getNum = function (input) {
      let numRegex = /^[\d.\/]+/;
      let match = input.match(numRegex);
      if (!match) return 1;

      let numStr = match[0];
      let result;

      if (numStr.includes('/')) {
          let parts = numStr.split('/');
          if (parts.length !== 2) return null;
          result = parseFloat(parts[0]) / parseFloat(parts[1]);
      } else {
          result = parseFloat(numStr);
      }

      return isNaN(result) ? null : parseFloat(result.toFixed(5));
  };

  this.getUnit = function (input) {
      let unitRegex = /[a-zA-Z]+$/;
      let match = input.match(unitRegex);
      if (!match) return null;

      let unit = match[0].toLowerCase();
      let unitMap = { gal: 'gal', l: 'L', mi: 'mi', km: 'km', lbs: 'lbs', kg: 'kg' };
      return unitMap[unit] || null;
  };

  this.getReturnUnit = function (initUnit) {
      let unitMap = { gal: 'L', L: 'gal', lbs: 'kg', kg: 'lbs', mi: 'km', km: 'mi' };
      return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function (unit) {
      let unitNames = { gal: 'gallons', L: 'liters', lbs: 'pounds', kg: 'kilograms', mi: 'miles', km: 'kilometers' };
      return unitNames[unit] || null;
  };

  this.convert = function (initNum, initUnit) {
      const conversionRates = {
          gal: 3.78541,
          L: 1 / 3.78541,
          lbs: 0.453592,
          kg: 1 / 0.453592,
          mi: 1.60934,
          km: 1 / 1.60934,
      };
      return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;

