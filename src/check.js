import http from 'k6/http';
import { sleep } from 'k6';
import { fail, check } from 'k6';
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
  const checkRegister = check(registerResponse, {
    'response register status must be 200' : (response) => response.status === 200,
    'response register data must not null' : (response) => response.json().data != null,
  })
  if(!checkRegister){
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
  const checkLogin = check(loginResponse, {
    'response login status must be 200' : (response) => response.status === 200,
    'response login token must not null' : (response) => response.json().data.token != null,
  })
  if(!checkLogin){
      fail(`Failed to login user-${uniqueId}`)
    }

  const getLoginResponse = loginResponse.json();

  const currentUserResponse = http.get('http://localhost:3000/api/users/current', {
    headers: {
        'Accept': 'application/json',
        'Authorization' : getLoginResponse.data.token,
    }
  })
  const checkCurrentUser = check(currentUserResponse, {
    'response current user status must be 200' : (response) => response.status === 200,
    'response current user data must not null' : (response) => response.json().data != null,
  })
  if(!checkCurrentUser){
        fail(`Failed to get user-${uniqueId}`)
      }

}
