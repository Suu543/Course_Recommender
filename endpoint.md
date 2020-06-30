## Auth
HTTP Method | Endpoint
--------------------------------------------
POST        - /register
POST        - /register/activate
POST        - /login

PUT         - /forgot-password
PUT         - /reset-password

## User
HTTP Method | Endpoint
--------------------------------------------
GET         - /user
GET         - /admin

POST        - /user/likes/:id

PUT         - /user

## Category
HTTP Method | Endpoint                  
--------------------------------------------
GET         - /categories               
GET         - /categories/interested    

POST        - /category
POST        - /categories/search
POST        - /category/:slug 

PUT         - /category/:slug

DELETE      - /category/:slug

## Link 
HTTP Method | Endpoint                  
--------------------------------------------
GET         - /link/:id
GET         - /link/popular
GET         - /link/popular/:slug

POST        - /link
POST        - /links

PUT         - /click-count
PUT         - /link/:id
PUT         - /link/admin/:id

DELETE      - /link/:id
DELETE      - /link/admin/:id

## Level
HTTP Method | Endpoint                  
--------------------------------------------
GET         - /levels

POST        - /level

PUT         - /level/:id

DELETE      - /level/:id

## Medium
HTTP Method | Endpoint                  
--------------------------------------------
GET         - /mediums

POST        - /medium

PUT         - /medium/:id

DELETE      - /medium/:id

## Type
HTTP Method | Endpoint                  
--------------------------------------------
GET         - /types

POST        - /type

PUT         - /type/:id

DELETE      - /type/:id