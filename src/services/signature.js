const crypto = require('crypto');

const privateKeyString = `-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAM/p+2G6SehgCFszF9MZPQQ1raik0iH8bof2RB4r1dICIvfH6sUdFpbc1mcHpDUgUgtFihLdaeTXmjY4SVl8s+UikGUNxAw//YywUJ+BT4xmh6BGEe3jgBASTw15svh+M998yy7mGH8+C5C6cpSo1T4ojsYUd8y7QZG5mkUoSt8ZAgMBAAECgYBSOiiIQwO92lUTtIZEn6OpCY2vt9e/RzVzoirYf9+lmeC4fCFWaaWobpiA0N3ZgPnRqWPtCBI8RiSgMuyXbqE6U9+L5HKikD4l8xl28pNJ7P80d14I9JHq/wNZdF2hzwvoUzylZvhHzW/KHtCddWqDR/FUlbjOnh+B9gC5bFzeTQJBAPdBOSm21K2VLR2G7mVp6V2Ift8M48Q4qshsCwu7h64lndETkByBFiDlXwbwaDaOsc1Jpusq/O/KVwHvRbwCe5cCQQDXRIvTUJ36IM2hJ5nl1plm/nbSgVtxW31W8M2NIyTzhEMpJ4yUBatApqDPhaXIuoQneCkTxjw5byYysrKR3JDPAkEAuYKLM/wEF/Sr89Jv/VD4kX++yPVv0qI9qMA/jV73TrbUcLC/2FMV2jqeEKPBXOW1C3RuM1V+jx7+JupyJLysIwJAdzAOsxuJvHn5IGdKwIUHPo1ZwMe6l5LuXPrK9IAm72Wlwd2R6ksRPKSFmSEIX5FVpnzTUY2KvsoZvixOzo/u5QJBANnV13oMjMHYsQFS8ycjVv/8RUTdH7X5vH5hp5nm/R4nKhcG0tPXtvldoKY6wcolxof24vpuNUTUhZLIdA1k8lY=
-----END PRIVATE KEY-----`;

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

function signDataWithMD5RSA(cabinetSerialNumber, orderNo) {
    const privateKey = crypto.createPrivateKey({
        key: privateKeyString,
        format: 'pem',
        type: 'pkcs8',
        });
    
    const sign = crypto.createSign('RSA-MD5');
    
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const orderCreateTime = `${currentDate.getFullYear()}-${padTo2Digits(currentDate.getMonth()+1)}-${padTo2Digits(currentDate.getDate())} ${padTo2Digits(currentDate.getHours())}:${padTo2Digits(currentDate.getMinutes())}:${padTo2Digits(currentDate.getSeconds())}`;
    const dataToSign = `{"nonce":"608b4d5f15e3faa88531e12f","timestamp":${timestamp},"value":{"cabinetSerialNumber":"${cabinetSerialNumber}","doorNumber":1,"merchantNo":"Me00003110","operateType":"SHOPPING","orderCreateTime":"${orderCreateTime}","orderNo":"${orderNo}","payType":"MERCHANT_SELF_OPERATED_ORDER","productNo":"VISUAL"}}`;
    const jsonObject = JSON.parse(dataToSign);
    const sortedKeys = Object.keys(jsonObject).sort();
    const sortedJsonObject = {};
    sortedKeys.forEach(key => {
        sortedJsonObject[key] = jsonObject[key];
    });

    sign.update(JSON.stringify(sortedJsonObject));

    const signature = sign.sign(privateKey, 'base64');
    return {
        "datatoSign": dataToSign,
        "signature": signature
    };
}

// const args = process.argv.slice(2);
// const dataToSign = JSON.parse(args[0]);

// const signature = signDataWithMD5RSA(dataToSign.cabinetSerialNumber, dataToSign.orderNo);
// console.log(signature);
