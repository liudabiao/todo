import CryptoJS from 'crypto-js'

function getDAesString(encrypted, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(encrypted, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function doMatch(data) {
  var key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  var iv = '1234567812345678';
  var decryptedStr = getDAesString(data, key, iv);
  return decryptedStr;
}
