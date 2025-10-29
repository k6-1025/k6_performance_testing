import http from 'k6/http';
import { sleep } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

export const options = {
  vus: 10,
  duration: '30s',
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)']
};

export default function() {
  let res = http.get('http://localhost:3000/ping');
  expect.soft(res.status).toBe(200);
//  sleep(1);
}
