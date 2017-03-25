/* eslint-env browser */

export const BASE_URL =
  process.env.NODE_ENV === 'production' ?
    window.location.origin :
    `http://${window.location.hostname}:${process.env.PORT}`;

export const API_URL = `${BASE_URL}/api/`;
