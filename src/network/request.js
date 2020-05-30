import request from '../util/request';

//布匹列表
export function buList(params) {
  return request.post(
    '/cloth/list',
    params
  );
}

export function buSaveAndUpdate(params) {
  return request.post(
    '/cloth/edit',
    params
  );
}

export function buDetail(params) {
  return request.post(
    '/cloth/detail',
    params
  );
}

export function buDelete(params) {
  return request.post(
    '/cloth/delete',
    params
  );
}

//客户列表
export function kehuList(params) {
  return request.post(
    '/customer/list',
    params
  );
}

export function kehuSaveAndUpdate(params) {
  return request.post(
    '/customer/edit',
    params
  );
}

export function kehuDetail(params) {
  return request.post(
    '/customer/detail',
    params
  );
}

export function kehuDelete(params) {
  return request.post(
    '/customer/delete',
    params
  );
}


// 出入库表
export function ChuKuList(params) {
  return request.post(
    '/transactions/listChu',
    params
  );
}

export function RuKuList(params) {
  return request.post(
    '/transactions/listRu',
    params
  );
}

export function ChuRuKuDetail(params) {
  return request.post(
    '/transactions/detail',
    params
  );
}

export function ChuRuKuSaveAndUpdate(params) {
  return request.post(
    '/transactions/edit',
    params
  );
}

export function ChuRuKuDelete(params) {
  return request.post(
    '/transactions/delete',
    params
  );
}