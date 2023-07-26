Feature: Integration Test for Two APIs

Scenario: Test POST API Endpoint
    Given I have a POST request body with the following data:
        | name     | morpheus |
        | job      | leader   |
    When I send a POST request to "https://reqres.in/api/users"
    Then the response status code should be 201
    And the response body should contain the following data:
        | name     | morpheus |
        | job      | leader   |

Scenario: Test PUT API Endpoint
    Given I have a PUT request body with the following data:
        | name     | morpheus        |
        | job      | zion resident   |
    When I send a PUT request to "https://reqres.in/api/users/2"
    Then the response status code should be 200
    And the response body should contain the following data:
        | name     | morpheus        |
        | job      | zion resident   |

Feature: Performance Test for Integration of Two APIs

Scenario: Load Test POST and PUT API Endpoints
    Given 1000 virtual users
    And 3500 iterations
    And a maximum response time tolerance of 2 seconds
    When I send a POST request to "https://reqres.in/api/users" with the following data:
        | name     | morpheus |
        | job      | leader   |    
    Then the response status code should be 201
    And the response body should contain the following data:
        | name     | morpheus |
        | job      | leader   |
    When I send a PUT request to "https://reqres.in/api/users/2" with the following data:
        | name     | morpheus        |
        | job      | zion resident   | 
    Then the response status code should be 200
    And the response body should contain the following data:
        | name     | morpheus        |
        | job      | zion resident   |    
    And the response time for both requests should be less than 2000 milliseconds