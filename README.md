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
 
# If u using pm2

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

### Sign In

> [GET] /auth - Page SignIn

> [POST] /auth/signin - SignIn post request

### Signup 

> [GET] /auth/signup - Page SignUp 

> [POST] /auth/signup - SignUp post request

### Find Password

> [GET] /auth/findPassword - Page send password change code

> [POST] /auth/findPAssword - Send change password code

> [GET] /auth/chpass/:authCode - Change User Password * require authCode


# Change Logs
#### 0.1  - Added redis and mongodb for save users

