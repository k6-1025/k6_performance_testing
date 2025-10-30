import http from 'k6/http';
import { sleep } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

export const options = {
  vus: 10,
  duration: '10s',
};

export default function() {
  const uniqueId = new Date().getTime();
  const body = {
    username : `user-${uniqueId}`,
    password : 'password',
    name : 'hasan'
  };
  http.post('http://localhost:3000/api/users', JSON.stringify(body), {
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
  })
  const loginBody
}
