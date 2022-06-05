#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');

function sortKeys(not_sorted) {
  return Object.keys(not_sorted)
    .sort()
    .reduce(function (acc, key) {
      acc[key] = not_sorted[key];
      return acc;
    }, {});
}

function sortKeysRecursively(notSortedObject) {
  if (notSortedObject === null) {
    return '';
  }
  if (typeof notSortedObject === 'string') {
    return notSortedObject;
  }
  const keys = Object.keys(notSortedObject);
  for (const key of keys) {
    notSortedObject[key] = sortKeysRecursively(notSortedObject[key]);
  }
  return sortKeys(notSortedObject);
}

function assignToLevel(index, termLevels, parentObject, value) {
  const termLevel = termLevels[index];
  if (index === termLevels.length - 1) {
    parentObject[termLevel] = value;
    return;
  }
  if (!parentObject[termLevel]) {
    parentObject[termLevel] = {};
  }
  assignToLevel(index + 1, termLevels, parentObject[termLevel], value);
}

function doConversion(filename, outputFile) {
  // read from PoEditor json file
  const json = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' }).toString());
  // parse keys to object
  const parsedTermsWithLevels = {};
  let parsedTerms = 0;
  for (var key in json) {
    parsedTerms++;
    const term = json[key].term;
    const value = json[key].definition;
    const termLevels = term.split('__');
    assignToLevel(0, termLevels, parsedTermsWithLevels, value);
  }
  // sort keys recursively
  const result = sortKeysRecursively(parsedTermsWithLevels);
  // final cosmetics: it's exported with doubling \\ which is unwanted
  // replace \\\" -> \"  and \\ -> \
  const result2 = JSON.stringify(result, null, 4);
  const result3 = result2.replace(/\\\\\\"/g, '\\"');
  // replace: \\\\ -> \\
  const result4 = result3.replace(/\\\\\\\\/g, '\\\\');
  // write to file as JSON
  fs.writeFileSync(outputFile, result4);
  console.log('Total terms: ' + parsedTerms + ' written to file :', '' + outputFile);
}

function sortSK(filename, outputFile) {
  console.log('Reading:', '' + filename);
  // read from PoEditor json file
  const json = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' }).toString());
  // sort keys recursively
  const result = sortKeysRecursively(json);
  // write to file as JSON
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 4));
  console.log('written to file :', '' + outputFile);
}

const meowPrompt = meow('./index.js [po2ios|] inputFile outputFile');

function main(command, inputFile, outputFile) {
  console.log('command is ' + command);
  console.log('input is ' + inputFile);
  console.log('output is ' + outputFile);

  switch (command) {
    case 'po2ios':
      doConversion(inputFile, outputFile);
      break;
    case 'sortSK':
      sortSK(inputFile, outputFile);
      break;
    case 'help':
    default:
      meowPrompt.showHelp(0);
  }
  console.log('DONE ');
  console.log('--------------------------------------');
}

main(meowPrompt.input[0], meowPrompt.input[1], meowPrompt.input[2]);
