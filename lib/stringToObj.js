function stringToObject() {
  const str = "{'dry pasta': 350, 'sugar': 30, 'carrot': 6, 'total': 386}";
  const validJson = str.replace(/'/g, '"');
  const obj = JSON.parse(validJson);
  return obj;
}

export default stringToObject;
