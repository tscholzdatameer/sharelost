import {User, doAuth, doRegister } from '../utils';

export const ERROR_LOGIN = 'ERROR_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

function requestToken() {
  return {
    type: REQUEST_TOKEN
  };
}

function receiveToken(userInformation) {
  const { token, user } = userInformation;
  return {
    type: RECEIVE_TOKEN,
    token,
    user
  };
}

export function getToken(login, pass) {
  return dispatch => {
    dispatch(requestToken());
    doAuth(login, pass)
      .then(resolveObject => dispatch(receiveToken(resolveObject)))
      .catch(error => {
        console.log(error);
      });
  };
}

export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION';
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION';

function requestRegistration() {
  return {
    type: REQUEST_REGISTRATION
  };
}

function receiveRegistration(user) {
  return {
    type: RECEIVE_REGISTRATION,
    user
  };
}

export function register(properties) {
  return dispatch => {
    dispatch(requestRegistration());
    doRegister(properties)
      .then((userProperties) => {
        const user = new User(userProperties);
        dispatch(receiveRegistration(user));
        getToken(properties.email, properties.password)(dispatch);
      })
      .catch(error => console.log(error));
  };
}
