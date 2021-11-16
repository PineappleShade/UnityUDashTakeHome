# Unity UDash TakeHome

## Requirements
- Docker
- Node-JS

## Instructions
* Run DB:
  * `cd db`
  * `docker build -t mysql .`
  * `docker run -d -p '3306:3306' -e 'MYSQL_ALLOW_EMPTY_PASSWORD=true' --name mysql mysql`


* Run Server:
  * `cd server`
  * `npm install`
  * `npm start`


* Run UI:
  * `cd ui`
  * `npm install`
  * `npm start`
  

## API
  You can use my swagger definition to have more thorough API documentation:
  swagger definition (make sure the server is running): http://localhost:3000/swagger

  Paste my definition in the input box at the top of the screen at:
  https://petstore.swagger.io/

- `GET /feedback`

  | Header | Description | Default value |
  | ----------- | ----------- | ----------- |
  | `x-pagination-limit` | Get result limit | 100
  | `x-pagination-offset` | Get result offset | 0
  | `x-sorting-by` | Sort parameter ('created','rating') | 'created'
  | `x-sorting-order` | Sort order ('desc', 'asc')' | 'desc'

- `POST /feedback/:gameSessionId`

  | Parameter | Description |
  | ----------- | ----------- |
  | `gameSessionId` | Game Session Id |
  | `body` | ``{ userId: '30ef5656-4500-11ec-81d3-0242ac130003', rating: 4, comment: 'comment' }`` | 

## Extra information
 When the db is initialized it creates 4 users 
  - Player 1
  - Player 2
  - Player 3
  - Ops Team Member 1

It also creates 6 game sessions.


