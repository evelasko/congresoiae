import qs from 'qs';
const orderid = require('order-id')(process.env.GATSBY_POPYTO);
const shortid = require('shortid');
import Redsys from './redsys';

const generateOrderId = () => {
  var chars = 'abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  shortid.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_',
  );
  return (
    orderid
      .generate()
      .slice(12, 16)
      .split('')
      .reverse()
      .join('') +
    shortid
      .generate()
      .replace('-', chars.substr(Math.floor(Math.random() * 53), 1))
      .replace('_', chars.substr(Math.floor(Math.random() * 53), 1))
  ).slice(0, 11);
};

export const setTx = ({ txData, description, total, url, urlOk, urlKo }) => {
  const txId = generateOrderId();
  const txRawParams = {
    DS_MERCHANT_AMOUNT: Math.round(total * 100).toString(),
    DS_MERCHANT_ORDER: txId,
    //"DS_MERCHANT_PRODUCTDESCRIPTION":description,
    //"DS_MERCHANT_MERCHANTDATA": JSON.stringify(txData),
    DS_MERCHANT_TITULAR: 'Fundacion Alicia Alonso',
    DS_MERCHANT_MERCHANTCODE: process.env.GATSBY_COM_CODE,
    //"DS_MERCHANT_MERCHANTNAME":"Fundacion Alicia Alonso",
    DS_MERCHANT_CURRENCY: process.env.GATSBY_COM_CRRY,
    DS_MERCHANT_TRANSACTIONTYPE: '0',
    DS_MERCHANT_TERMINAL: process.env.GATSBY_COM_TERM,
    //"DS_MERCHANT_MERCHANTURL":url,
    //"DS_MERCHANT_URLOK":urlOk,
    //"DS_MERCHANT_URLKO":urlKo
  };

  const redsys = new Redsys();

  const clve = process.env.GATSBY_COM_CLVE;
  // const Ds_Signature = redsys.createMerchantSignature(clve, txRawParams)
  // const Ds_MerchantParameters = redsys.createMerchantParameters(txRawParams)

  return redsys.createPayment(clve, txRawParams);

  // return {
  //     Ds_SignatureVersion: 'HMAC_SHA256_V1',
  //     Ds_Signature,
  //     Ds_MerchantParameters
  // }
};

export const getTx = ({ params }) => {
  const redsys = new Redsys();
  return {
    decodedParams: params
      ? redsys.decodeMerchantParameters(params)
      : 'no params to decode',
  };
};
