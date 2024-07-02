## Veriff Backend Task
This project was bootstrapped with [Nest](https://github.com/nestjs/nest).
his project lets you create the survey questions and store the submitted answers.

> You Can Create You First Verification Survey With `create_verification.sh` Script on The Root Of the Project. 
> It's Necessary To have at least one Verification Survey.

### My Perspective
When I read the task, I found that the Backend Should send the questions to The Frontend and store the answers.
But, Instead of Having a Simple Static API, I decided to let the user create the survey questions.
Also, I thought that It's better to have a UUID for each record, since we will be able to have a better integrations with other micro-service applications in the company.
Moreover, Validation is the first step to have a secure application.
So, I Implemented the validation rules which were mentioned inside the task in the Backend side as same as Front-end side.
If the other clients, want to use this API, they can be sure that the data is validated and secure, also we sure that no one is able to store unexpected data with calling the API directly.
I know that all Front-end developers need to have a good documentation for the APIs.
So, I added the Swagger Documentation for the API.
In addition, I added the `PostMan` Collection for the API, Which is available in the root of the project.

## Objectives
- [x] Add Swagger Documentation: [Link](http://localhost:3200/api)
- [x] Store Survey Questions
- [x] Store Survey Answers
- [ ] Unit Test
    - [x] Validate Answers
    - [x] Validate Questions
    - [x] Validate Submitting Answers
- [ ] Deployment
    - [x] GitHub Actions to Run Tests

## Run the project
In the project directory, you can run:
- ``` git clone git@github.com:amirzenoozi/veriff-interview.git ```
- ``` git config core.hooksPath .githooks ```
- ``` cd veriff-interview/back ```
- ``` yarn install ```
- ``` yarn start ```
- Open [http://localhost:3200](http://localhost:3000) to view it in the browser.

## Available Scripts

1. For Development: `yarn run start`
2. For Watch Mode: `yarn run start:dev`
3. For Production Mode: `yarn run start:prod`

## Test Scripts

1. Unit Tests: `yarn run test`
2. E2E Test: `yarn run test:e2e`
3. Test Coverage: `yarn run test:cov`

## Future Features
According to the veriff mission, It is really important to have the track over each Verification.
So, We can connect the Response of the verifications to the user who submitted the answers.
Because of this idea, I let users submit their response multiple times and store each response with a unique id.
Moreover, Although the survey questions are answered with 'Yes' or 'No', It's better to have a more flexible answer type.
Since We will be able to Have a better analysis of the responses. For example, we can have a rating based questions or Quantitative questions.
It was the main reason that I chose MongoDB as the database.
Because it's a NoSQL database and we can store the responses in a flexible way.
