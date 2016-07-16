import spring from 'spring-data-rest-js';

spring.requestConfig.baseURL = 'http://localhost:8083';
export const Item = spring.extend('items');

let loggedIn = false;
export function doAuth() {
  return new Promise((resolve/* , reject */) => {
    // TODO add proper token fetch
    spring.requestConfig.headers = {
      'Token': 'ABS1token2'
    };
    loggedIn = true;
    resolve('ABS1token2');
  });
}

export function isLoggedIn() {
  return loggedIn;
}
