// https://github.com/KeithMaxwellZ/FCO_Backend/blob/master/api.md

import http from "@/https";
import type { YWZResponse } from "@/https";
import type {
  actionApiView,
  initiateApiView,
  statusApiView,
  initApiView,
  actionResponseView
} from "@/interface/api";

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

export function postStatus(
  uid: number,
  data: initApiView
): Promise<YWZResponse<object>> {
  return http({
    data,
    method: "post",
    url: `/engine/${uid}/start`,
  });
}

export function postUseActions(
  uid: number,
  Action: number
): Promise<YWZResponse<actionResponseView>> {
  return http({
    data: { Action },
    method: "post",
    url: `/engine/${uid}/use-action`,
  });
}

export function getStatus(uid: number): Promise<YWZResponse<statusApiView>> {
  return http({
    url: `/engine/${uid}`,
  });
}
