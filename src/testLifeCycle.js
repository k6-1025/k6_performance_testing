import http from 'k6/http';
import { sleep } from 'k6';
import { fail, check } from 'k6';
import exec from 'k6/execution';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

export const options = {
  vus: 10,
  duration: '5s',
};

export function setup() {
    const data = [];
    for (let i = 0; i < 10; i++){
        data.push({
            "first_name" : "Kontak",
            "last_name" : `Ke-${i}`,
            "email" : `contact${i}@mail.com`,
        })
    }
    return data;
}

export function getToken() {
    const username = `contoh${exec.vu.idInInstance}`
      const loginRequest = {
        username : username,
        password : 'password'
      };
      const loginResponse = http.post('http://localhost:3000/api/users/login', JSON.stringify(loginRequest), {
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        }
      });
      const checkLogin = check(loginResponse, {
        'response login status must be 200' : (response) => response.status === 200,
        'response login token must not null' : (response) => response.json().data.token != null,
      })
      if(!checkLogin){
          fail(`Failed to login ${username}`)
        }

      const getLoginResponse = loginResponse.json();
      return getLoginResponse.data.token;

}

export default function(data) {

  const token = getToken();
  for (let i = 0; i < data.length; i++) {
    const contact = data[i];
    const response = http.post('http://localhost:3000/api/contacts', JSON.stringify(contact), {
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : token
        }
    });
    check(response, {
        'create contact status is 200' : (response) => response.status === 200
    })
  }
}

export function tearDown(data) {
    console.info(`Finish create ${data.length} contacts`)
}