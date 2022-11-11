// https://github.com/KeithMaxwellZ/FCO_Backend/blob/master/api.md

import http from '@/https';
import type { YWZResponse } from '@/https';
import type { actionApiView,initiateApiView } from '@/interface/api';

export function getActions(): Promise<YWZResponse<actionApiView>> {
  return http({
    url: `/actions`,
  });
}


export function getInitiate(): Promise<YWZResponse<initiateApiView>> {
  return http({
    url: `/initiate`,
  });
}

export function postStatus(uid:number): Promise<YWZResponse<object>> {
  return http({
    method:'post',
    url: `/engine/${uid}/start`,
  });
}

export function postUseActions(uid:number): Promise<YWZResponse<object>> {
  return http({
    method:'post',
    url: `/engine/${uid}/use-action`,
  });
}

export function getStatus(uid:number): Promise<YWZResponse<object>> {
  return http({
    url: `/engine/${uid}/start`,
  });
}