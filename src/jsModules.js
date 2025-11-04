import http from 'k6/http';
import { sleep } from 'k6';
import { fail, check } from 'k6';
import exec from 'k6/execution';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import {loginUser} from "./helper/user.js";
import {createContact} from "./helper/contact.js";

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

      const loginResponse = loginUser(loginRequest);

      const getLoginResponse = loginResponse.json();
      return getLoginResponse.data.token;

}

export default function(data) {

  const token = getToken();
  for (let i = 0; i < data.length; i++) {
    const contact = data[i];
    createContact(token,contact);
  }
}

export function tearDown(data) {
    console.info(`Finish create ${data.length} contacts`)
}