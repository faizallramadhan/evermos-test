import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const api1BaseUrl = 'https://reqres.in';
const api1endpoints = '/api/users';
const api2endpoints = '/api/users/2';

export let options = {
  vus: 1000,
  iterations: 3500,
  thresholds: {
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  group('Performance Test', function () {
    let payload = JSON.stringify({ "name": "morpheus", "job": "leader" });
    let headers = { "Content-Type": "application/json" };
    let postResponse = http.post(`${api1BaseUrl}${api1endpoints}`, payload, { headers: headers });
    check(postResponse, {
      'POST is successful': (res) => res.status === 201,
      'PUT response contains name': (res) => res.json().name === 'morpheus',
      'POST response contains job': (res) => res.json().job === 'leader',
    });

    let userId = postResponse.json().id;
    payload = JSON.stringify({ "name": "morpheus", "job": "zion resident" });
    let putResponse = http.put(`${api1BaseUrl}${api2endpoints}`, payload, { headers: headers });
    check(putResponse, {
      'PUT is successful': (res) => res.status === 200,
      'PUT response contains original name': (res) => res.json().name === 'morpheus',
      'PUT response contains updated job': (res) => res.json().job === 'zion resident',
    });
  });
}

  sleep(0.1);
  
export function handleSummary(data) {
  return {
    "performance-testResult.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

