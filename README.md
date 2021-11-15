# Unity UDash TakeHome

## Requirements
- Docker
- Node-JS

## Instructions
- Run DB:
`docker run -d -p '3306:3306' -e 'MYSQL_ALLOW_EMPTY_PASSWORD=true' --name mysql mysql`

- Run Server: 
  `npm install`
  `npm start`

- Run UI:
  `npm install`
  `npm start`

## API

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




