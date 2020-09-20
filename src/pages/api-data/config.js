import axios from 'axios-proxy-fix';
//export const baseURL = "http://202.154.178.186:3200";
export const baseURL = "http://localhost/nilai-sekolah-be";

export const axiosWorker = axios.create({
  baseURL: 'http://localhost/nilai-sekolah-be',
  timeout: 10000,
  headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MDA1ODUyNTAsImV4cCI6MTYwMDU4ODg1MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4zIn0.x7PoGPq4rYSzGVgPdFtQcmK_DXXB4S54hi3thbshmbfPYP0PaR98yODi_JumnSvz3IcLLwwAi_3wPQ5SnykvuQ'}
});
