import http from "k6/http"
import {check} from "k6"

export function registerUser(body){
    const registerResponse = http.post('http://localhost:3000/api/users', JSON.stringify(body), {
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        }
      })
      const checkRegister = check(registerResponse, {
        'response register status must be 200' : (response) => response.status === 200,
        'response register data must not null' : (response) => response.json().data != null,
      });
      return registerResponse;
}

export function loginUser(body){
    const loginResponse = http.post('http://localhost:3000/api/users/login', JSON.stringify(body), {
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        }
      });
      const checkLogin = check(loginResponse, {
        'response login status must be 200' : (response) => response.status === 200,
        'response login token must not null' : (response) => response.json().data.token != null,
      });
      return loginResponse;
}

export function getUser(token){
    const currentUserResponse = http.get('http://localhost:3000/api/users/current', {
        headers: {
            'Accept': 'application/json',
            'Authorization' : token,
        }
      })
      const checkCurrentUser = check(currentUserResponse, {
        'response current user status must be 200' : (response) => response.status === 200,
        'response current user data must not null' : (response) => response.json().data != null,
      });
      return currentUserResponse;
}