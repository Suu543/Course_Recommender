# Signup to AWS

1. Create New User
2. Use SES (Simple Email Service)
3. AWS Free Tier for new accounts for first 12 months
4. After 12 months your free tier will end and you will be charged for the services
5. You might get charged even during your free tier so keep an eye on your billing

# AWS SES Costing

- https://aws.amazon.com/ses/pricing

# Register Activation Email

1. Server Setup

2. Install npm packages

3. Setup Simple MVC Patterns

4. Implement JWT based authentication system

5. Before we save user in database check if user already exists

6. Check if user's email is valid by sending verification token as a clickable link to user email

7. For sending email we will use AWS SES, so we need to signup with AWS too.. then

8. Once they click, we take them to our react app and take the token from the route that token consists, user, name, email, and password

9. Once again send that back to the server

10. This time we can save the user into the database

11. Use mongo atlas / signup / get mongo_uri

##### that's it for user Registration

# Login / Server

1. Create Validator

2. Create Route

3. Create Controller > generate token > send user and token to client as response

# Login / Client

1. Login Form

2. Show Success/Error Message

3. Receive user and token from server

#

- Currently Anyone can access these pages

- lets restrict to only logged in user or admin user

- we could do it client side only

- using isAuth() > we could check if cookie and user exists in local storage and based on that allow access to this page

- but a better way to do it would be to do it server side in terms of security and user experience

- we will make flexible enough so that it can be re-used in multiple pages

---

- We need to create an endpoint in our server

- that will check if user is authenticated (we can send token from the cookie to authenticated user)

- our server will then receive the jwt/token sent from react client

- If it is valid, then it will allow access or send some success response

- Based on that in the client side we will either allow access or reject

- So let's go to server and create two endpoints
- one for logged in user and another for admin user

# Login - Client Side

- We will create 2 HOC
- One will be withUser and another will be withAdmin
- they will make request to our backend endpoint "/user" and "/admin"
- then later these components can be used as wrapper to any pages to protect them from unauthorized access
- this way we don't have to make api request on each page we want to apply restrictions
- we can simply use these HOC/withUser/withAdmin to perform authorization
- if someone is trying to somehow access the pages that they are not supposed to
- we will redirect them away to home page

# Base64
-  https://pilot376.tistory.com/3
- https://effectivesquid.tistory.com/entry/Base64-%EC%9D%B8%EC%BD%94%EB%94%A9%EC%9D%B4%EB%9E%80
- https://stackoverflow.com/questions/38633061/how-can-i-strip-the-dataimage-part-from-a-base64-string-of-any-image-type-in-ja
- https://okky.kr/article/276104 - 플팻폼에 관계없이 독립성을 가진 자료의 깨짐을 방지하기 위해