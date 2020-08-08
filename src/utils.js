// Utils for infrequently used methods they should be imported like this:
// import { uuid } from "@/utils.js";

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
export function sortAlphaNum(a, b) {
  var aA = a.replace(reA, "");
  var bA = b.replace(reA, "");
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ""), 10);
    var bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}

export function sortAlphaNumValueObject(a, b) {
  var aA = a.value.replace(reA, "");
  var bA = b.value.replace(reA, "");
  if (aA === bA) {
    var aN = parseInt(a.value.replace(reN, ""), 10);
    var bN = parseInt(b.value.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}

// TODO: probably better for both postcode AND for valuation to have the unique bits
// first i.e. addres1,2,3,4 and ignore the other bits
// greenhurst london is nto inpotant... but 12 Green Mansions, block 2, flat 3 is
export function getAddressOnOneLine(value) {
  var addressOneLine = "";
  var partsOfAddress = value.split(", ");
  var addressPartCounter = 0;
  if (partsOfAddress) {
    partsOfAddress.forEach(function(value, i) {
      //
      if (value && !addressOneLine) {
        addressOneLine = value;
        addressPartCounter++;
      } else if (value && addressOneLine && addressPartCounter < 2) {
        addressOneLine = addressOneLine + ", " + value;
        addressPartCounter++;
      } else if (value && addressOneLine && i == 5) {
        addressOneLine = addressOneLine + ", " + value;
        addressPartCounter++;
      }
    });
  }
  return addressOneLine;
}

// https://stackoverflow.com/a/2117523/535606
export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function numberToText(number) {
  var numberText = numberTexts[number];

  return numberText;
}

var numberTexts = {
  1: "ONE",
  2: "TWO",
  3: "THREE",
  4: "FOUR",
  5: "FIVE",
  6: "SIX",
  7: "SEVEN",
  8: "EIGHT",
  9: "NINE",
  10: "TEN"
};
