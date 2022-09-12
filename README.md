<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/shield-1897474-1608195.png">
</p>
<h1 align="center">
  DrivenPass
</h1>
<div align="center">

  ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  <a href="https://github.com/andreseichi/drivenpass/commits">
    <img alt="Github repo size" src="https://img.shields.io/github/repo-size/andreseichi/drivenpass?style=for-the-badge">
  </a>
  <a href="https://github.com/andreseichi/drivenpass/commits">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/andreseichi/drivenpass?style=for-the-badge" />
  </a>
</div>
​
<br/>

# Description

API to secure your secret informations and passwords and manage all of them very easily.

## Features

-   JWT Auth
-   Create / Visualize / Delete Credentials
-   Create / Visualize / Delete Secure notes
-   Create / Visualize / Delete Credit cards
-   Create / Visualize / Delete Networks
-   Create / Visualize / Delete Personal documents
​
## API Documentation

### Authentication

#### Sign up

```http
POST /signup
```

##### Request:

| Body   | Type       | Description             |
| :----- | :--------- | :---------------------- |
| `email` | `string`   | **Required**. Email of the user |
| `password` | `string`   | **Required**. Password of the user |

###

`Password should be at least 10 characters long`

<br/>

#### Sign in

```http
POST /signin
```

##### Request:

| Body   | Type       | Description             |
| :----- | :--------- | :---------------------- |
| `email` | `string`   | **Required**. Email of the user |
| `password` | `string`   | **Required**. Password of the user |

###

##### Response:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InRhc2hpcm8yQHRhcy5jb20ifSwiaWF0IjoxNjYzMDAyOTA4LCJleHAiOjE2NjMwODkzMDh9.0odDBiHxAdNiPOGRSR6p0l3vIdf5mC_ZGoOYy81EvHM"
}
```

#

### Credentials

#### Create a credential

```http
POST /credential/create
```

##### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `Authentication` | `string` | **Required**. JWT |

`Authentication should be "Bearer + JWT"`

#####
​
| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `title`       | `string` | **Required**. Title of the credential  |
| `url`         | `string` | **Required**. URL of credential          |
| `username` | `string` | **Required**. Username of that credential |
| `password`       | `string` | **Required**. Password of that credential   |
​
#
​