# Veriff FullStack Technical Interview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) as Front side and [Nest](https://github.com/nestjs/nest) as backed side.
This Projects Let you get verification Questions from the server and answer them with react application.

## Dependencies
- Node.js
- Yarn
- MongoDB

## Database
Before running the project, you need to have a MongoDB instance running on your local machine. 
You can use the following Image on DockerHub to run a MongoDB instance on your local machine.

- DockerHub Image: [MongoDB](https://hub.docker.com/r/mongodb/mongodb-community-server)

## Docs
Each API need to be documented in the way that every one can run and test it.
So I created a Postman Collection for the backend side you just need to import it to your Postman and run it.
I wrote all **my perspective** and the way I think about the project in the `README.md` files that you can find them in the following links:
- [Backend Docs](./back/README.md)
- [Frontend Docs](./front/README.md)

## Contributing Format
Human Errors are the most common errors in the world, so I created a commit convention to make the project more readable and understandable.
I Explain All The Commit Convention and the way you can contribute to this project in the `CONTRIBUTING.md` file.
You Just Need To Read [CONTRIBUTING.md](./CONTRIBUTING.md) and follow the steps.

## Objectives
- [ ] Apps
  - [x] Frontend
  - [x] Backend
  - [x] Postman Collection
- [ ] Scripts
  - [x] Bash Script to Run Both
  - [x] Bach Script to install dependencies
  - [x] Bash Script To Create The First Verification Question Set
- [ ] Deployment
  - [ ] DockerCompose File
  - [x] Dockerfile
  - [x] GitHub Actions to Run Tests

## Run the project
#### First Way:
- ``` git clone git@github.com:amirzenoozi/veriff-interview.git ```
- ``` git config core.hooksPath .githooks ```
- ``` cd veriff-interview/front ```
- ``` yarn install ```
- ``` cd veriff-interview/back ```
- ``` yarn install ```

#### Second Way:
Or you can run the following bash script to install dependencies and run the project:
- ``` git clone git@github.com:amirzenoozi/veriff-interview.git ```
- ``` git config core.hooksPath .githooks ```
- ``` cd veriff-interview ```
- ``` sh install.sh ```
- ``` sh runner.sh ```
