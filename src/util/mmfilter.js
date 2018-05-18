import crypto from 'crypto'
export function doNotMatch(value) {
  var md5 = crypto.createHash("md5");
  md5.update(value);
  var a = md5.digest('hex');
  return a;
}
