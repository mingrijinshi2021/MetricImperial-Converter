function ConvertHandler() {
  this.getNum = function (input) {
      let result;
      let numRegex = /^[\d.\/]+/;
      let match = input.match(numRegex);
      if (!match) return 1;

      let numStr = match[0];
      if (numStr.includes('/')) {
          let parts = numStr.split('/');
          if (parts.length > 2) return null;
          result = parseFloat(parts[0]) / parseFloat(parts[1]);
      } else {
          result = parseFloat(numStr);
      }

      return isNaN(result) ? null : result;
  };

  this.getUnit = function (input) {
      let unitRegex = /[a-zA-Z]+$/;
      let match = input.match(unitRegex);
      if (!match) return null;

      let unit = match[0].toLowerCase();
      let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      return validUnits.includes(unit) ? (unit === 'l' ? 'L' : unit) : null;
  };

  this.getReturnUnit = function (initUnit) {
      let unitMap = {
          gal: 'L',
          L: 'gal',
          lbs: 'kg',
          kg: 'lbs',
          mi: 'km',
          km: 'mi',
      };
      return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function (unit) {
      let unitNames = {
          gal: 'gallons',
          L: 'liters',
          lbs: 'pounds',
          kg: 'kilograms',
          mi: 'miles',
          km: 'kilometers',
      };
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
      return initNum * (conversionRates[initUnit] || 1);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(
          returnUnit
      )}`;
  };
}

module.exports = ConvertHandler;

