import http from 'k6/http';
import { sleep } from 'k6';
import { fail } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

export const options = {
  vus: 10,
  duration: '5s',
};

export default function() {

  const uniqueId = new Date().getTime();
  const registerRequest = {
    username : `user-${uniqueId}`,
    password : 'password',
    name : 'hasan'
  };
  const registerResponse = http.post('http://localhost:3000/api/users', JSON.stringify(registerRequest), {
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
    }
  })
  if(registerResponse.status !== 200){
    fail(`Failed to register user-${uniqueId}`)
  }

  const loginRequest = {
    username : `user-${uniqueId}`,
    password : 'password'
  };
  const loginResponse = http.post('http://localhost:3000/api/users/login', JSON.stringify(loginRequest), {
    headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
    }
  });
  if(loginResponse.status !== 200){
      fail(`Failed to login user-${uniqueId}`)
    }

  const getLoginResponse = loginResponse.json();

  const currentUserResponse = http.get('http://localhost:3000/api/users/curent', {
    headers: {
        'Accept': 'application/json',
        'Authorization' : getLoginResponse.data.token,
    }
  })
  if(currentUserResponse.status !== 200){
        fail(`Failed to get user-${uniqueId}`)
      }

}
