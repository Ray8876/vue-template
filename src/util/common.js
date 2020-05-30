export function uuid() {
  let s = [];
  let hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  let uuid = s.join('');
  return uuid;
}

//把source复制给obj（只复制obj有的元素）
export function copyObj(obj, source) {
  for (let prop in obj) {
    if (source[prop] != null && source[prop] !== undefined && source[prop] !== '') {
      if (prop === "detail" || prop === "imgs") {
        obj[prop] = source[prop];
      } else {
        obj[prop] = String(source[prop]);
      }
    }
  }
  return obj;
}

//把sourceArray中的对象通过copyObj方法复制给objArray（中间对象是obj）（objArray中的都是obj这样的对象）
export function copyArray(objArray, obj, sourceArray) {
  objArray.splice(0, objArray.length);
  for (let source of sourceArray) {
    let a = copyObj(obj, source);
    objArray.push(JSON.parse(JSON.stringify(a)));
  }
}