function convertToPascalCase(obj) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const pascalCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[pascalCaseKey] = obj[key];
    }
  }
  return result;
}

function mapFromOdata(odata) {
  return odata.value.map((item) => convertToPascalCase(item));
}

export { mapFromOdata, convertToPascalCase };
