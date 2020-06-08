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