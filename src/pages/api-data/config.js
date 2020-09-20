import axios from 'axios-proxy-fix';
//export const baseURL = "http://202.154.178.186:3200";
// export const baseURL = "http://localhost/nilai-sekolah-be";
import { getAllState } from '../../store/Store.js';
let { auth } = getAllState();

export const axiosWorker = axios.create({
  baseURL: 'http://localhost/nilai-sekolah-be',
  timeout: 10000,
  headers: {'Authorization': `Bearer ${auth.token}`}
});
