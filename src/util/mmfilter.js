import CryptoJS from 'crypto-js'

function getAesString(data, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();
}

export function doNotMatch(data) {
  var key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  var iv = '1234567812345678';
  var encrypted = getAesString(data, key, iv);
  return encrypted;
}
