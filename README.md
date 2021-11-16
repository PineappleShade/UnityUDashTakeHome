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

  Paste "http://localhost:3000/swagger" in the input box at the top of the screen at:
  https://petstore.swagger.io/ and click explore.

- `GET /feedback`

  | Header | Description | Default value |
  | ----------- | ----------- | ----------- |
  | `x-pagination-limit` | Get result limit | 100
  | `x-pagination-offset` | Get result offset | 0
  | `x-sorting-by` | Sort parameter ('created','rating') | 'created'
  | `x-sorting-order` | Sort order ('desc', 'asc')' | 'desc'
  
  | Parameters | Description | Default value |
  | ----------- | ----------- | ----------- |
  | `rating` | Rating filter | 0,1,2,3,4,5

- `POST /feedback/:gameSessionId`

  | Parameter | Description |
  | ----------- | ----------- |
  | `gameSessionId` | Game Session Id |
  | `body` | ``{ userId: '30ef5656-4500-11ec-81d3-0242ac130003', rating: 4, comment: 'comment' }`` | 

## Extra information
 When the db is initialized it creates 4 users 
  - Player 1 (30ef5656-4500-11ec-81d3-0242ac130003)
  - Player 2 (4023e4b6-4500-11ec-81d3-0242ac130003)
  - Player 3 (44242972-4500-11ec-81d3-0242ac130003)
  - Ops Team Member 1 (4aa9155a-4500-11ec-81d3-0242ac130003)

It also creates 6 game sessions (check 01.game-session.sql).


