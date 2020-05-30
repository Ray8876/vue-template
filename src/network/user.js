import request from '../util/request';

export function login(data) {
  return request.post(
    '/user/login',
    data
  );
}

export function logout() {
  return request.post(
    'opUser/logout'
  );
}

