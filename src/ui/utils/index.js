import spring from 'spring-data-rest-js';

spring.requestConfig.baseURL = 'http://localhost:8083';
export const Item = spring.extend('items');
export const User = spring.extend('users');

let loggedIn = false;
export function doAuth(login/* , pass */) {
  return new Promise((resolve, reject) => {
    // TODO add proper token fetch
    spring.requestConfig.headers = {
      'Token': 'ABS1token2'
    };
    loggedIn = true;
    User.search('findByName', { name: login})
      .then(result => resolve({ token: 'ABS1token2', user: result }))
      .catch(error => reject(error));
  });
}

export function isLoggedIn() {
  return loggedIn;
}

export function doRegister(properties) {
  const { name, email, password } = properties;
  const user = new User();
  user.set('name', name);
  user.set('email', email);
  user.set('password', password);
  user.set('registrationDate', new Date().getTime());
  return user.save();
}
