import crypto from 'crypto';
import base64url from 'base64url';
import { zeroPad, zeroUnpad } from './utils';

class Redsys {
  encrypt3DES(str, key) {
    const secretKey = Buffer.from(key, 'base64');
    const iv = Buffer.alloc(8, 0);
    const cipher = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
    cipher.setAutoPadding(false);
    return (
      cipher.update(zeroPad(str, 8), 'utf8', 'base64') + cipher.final('base64')
    );
  }

  decrypt3DES(str, key) {
    const secretKey = Buffer.from(key, 'base64');
    const iv = Buffer.alloc(8, 0);
    const cipher = crypto.createDecipheriv('des-ede3-cbc', secretKey, iv);
    cipher.setAutoPadding(false);
    const res =
      cipher.update(zeroUnpad(str, 8), 'base64', 'utf8') + cipher.final('utf8');
    return res.replace(/\0/g, '');
  }

  mac256(data, key) {
    return crypto
      .createHmac('sha256', Buffer.from(key, 'base64'))
      .update(data)
      .digest('base64');
  }

  createMerchantParameters(data) {
    return Buffer.from(JSON.stringify(data), 'utf8').toString('base64');
  }

  decodeMerchantParameters(data) {
    const _data = JSON.parse(base64url.decode(data, 'utf8'));
    const res = {};
    for (var name in _data) {
      res[decodeURIComponent(name)] = decodeURIComponent(_data[name]);
    }
    return res;
  }

  createPayment(key, data) {
    const Ds_MerchantParameters = Buffer.from(
      JSON.stringify(data),
      'utf8',
    ).toString('base64');

    const orderId = data.Ds_Merchant_Order || data.DS_MERCHANT_ORDER;
    console.log('ORDER ID @ Signing: ', orderId);
    const orderKey = this.encrypt3DES(orderId, key);
    return {
      Ds_SignatureVersion: 'HMAC_SHA256_V1',
      Ds_MerchantParameters,
      Ds_Signature: this.mac256(Ds_MerchantParameters, orderKey),
    };
  }

  createMerchantSignature(key, data) {
    const _data = this.createMerchantParameters(data);
    const orderId = data.Ds_Merchant_Order || data.DS_MERCHANT_ORDER;
    console.log('ORDER ID @ Signing: ', orderId);
    const orderKey = this.encrypt3DES(orderId, key);
    return this.mac256(_data, orderKey);
  }

  createMerchantSignatureNotif(key, data) {
    const _data = this.decodeMerchantParameters(data);
    const orderId = _data.Ds_Order || _data.DS_ORDER;
    const orderKey = this.encrypt3DES(orderId, key);
    const res = this.mac256(data, orderKey);
    return base64url.encode(res, 'base64');
  }

  merchantSignatureIsValid(signA, signB) {
    return (
      base64url.decode(signA, 'base64') === base64url.decode(signB, 'base64')
    );
  }
}

export default Redsys;
