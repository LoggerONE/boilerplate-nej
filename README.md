# Boilerplate NodeJS Express JWT

# Object
#### A simple boilerplate for NodeJS JWT Authentication

# Require Server
* NodeJS ( Modules : Check packeage.json)
* MongoDB
* Redis

# Require Client
* jQuery
* Bootstrap

# How To USE

```
yarn install
cp ./.env.example ./.env
node index.js
```
 
# Using pm2

```
pm2 start process.yml
```

# TEST

```
Connect Localhost

Default port : 8080

GET : http://localhost:8080/v1/
GET : http://localhost:8080/v1/json
POST : http://localhost:8080/v1/json
```

# Authentication Routes

### Signup 

> [GET] /auth/signup - Page for SignUp

> [POST] /auth/signup - SignUp request

### Sign In

> [GET] /auth - Page for SignIn

> [POST] /auth/signin - SignIn request

### Find Password

> [GET] /auth/findPassword - Page for password reset

> [POST] /auth/findPAssword - Send a code to email for change password

> [GET] /auth/chpass/:authCode - Change user password * require authCode


# Change Logs
#### 0.1  - Added redis and mongodb for save users

