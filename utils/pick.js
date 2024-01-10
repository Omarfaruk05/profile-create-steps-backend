exports.pick = (obj, keys) => {
  const findObj = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      findObj[key] = obj[key];
    }
  }
  return findObj;
};
