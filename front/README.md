# Veriff Frontend Task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project lets you interact with a form that you get from the server.

## My Perspective
It is really important to implement the validation rules in the Frontend side to prevent too many requests to the server.
Also, for the validation rules I interpreted the "No Answer" in 3 different ways, that I explain each of them here:

  1. If user had more than 1 "No" answer, then we should only send the first question with "No" answer to the server.
  2. If user had more than 1 "No" answer, then we should send all the answers till the first "No" answer to the server. 

> I prefer to pick the second one since it's more convenient according to the Veriff mission, and also we have priority for the questions.
> At beginning, I implemented the first one, then I changed it to the second one.

Each form in front-end side should have loading state to prevent the user to submit the form multiple times.
Moreover, If we are fetching the data from the server, It's better to have a loading state to prevent the user to see the empty page.
I Know that we don't have a static questions, so I implement the main page in the way that we always get the latest questions from the server.
Also, I added the `StoryBook` to have a better understanding of the components and their props.
First I Implemented the Grid system with FlexBox, then I Saw that we don't need to use grid System for the question list, so I replaced it.
Moreover, since the veriff is an international company, I added the `i18n` to have the multi-language support for the static texts.
In the large scale companies, It's better to prevent using unnecessary libraries, so instead of adding in UiKit, I decided to implement the required components by myself.
Also, by doing this, I can show that my `CSS/SCSS` skills are good enough to implement the internal UiKit.
The most important component that we need to implement is the `RadioGroup` component.
In addition, I developed the `Button` component and the layout related components including `Container`, `FlexRow`, and `FlexCol`, Which are required in the project.
After talking with Laura, she told me there is no need to deploy the application on the server, so I didn't implement the deployment part.
However, I implemented the `Dockerfile` and the `GitHub Actions` to have the same environment in the production and development.
Currently, the `GitHub Actions` is running the tests, but we can add a part which push the image to `DockerHub` in the future.

## Real World Scenario
In the real world scenario, When we want to fetch the verification questions we will have a specific route for each of them.
According to this fact, Not only I implemented the `Home` page in the way that always fetch the latest questions from the server, but also I implemented the `questions` page in the way that we see all available verifications.
In the `questions` page, the user is able to click in each of the verifications and see the questions of that verification in the `questions/:uuid`.
The Single Page Is exactly Looks like the `Home` page, But more dynamic.
So, in the real world, we only need to implement the `questions/:uuid` page and the `questions` page.

## Objectives
- [x] Mobile First Design
- [x] Reusable Components
- [x] Add StoryBook
- [ ] Unit Test
  - [x] Button Component
  - [x] Radio Group Component (Checks)
  - [x] FlexRow
  - [x] FlexCol
  - [x] Container
- [ ] Deployment
  - [x] Dockerfile
  - [x] GitHub Actions to Run the Tests

## Run the project
In the project directory, you can run:
- ``` git clone git@github.com:amirzenoozi/veriff-interview.git ```
- ``` git config core.hooksPath .githooks ```
- ``` cd veriff-interview/front ```
- ``` yarn install ```
- ``` yarn start ```
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Future Features
According to the veriff mission, It is really important to have a general components for every type of questions.
For example, Maybe we need to answer some quantitative questions or rating based questions, instead of Yes/No questions.
So, I developed a RadioGroup component based on this.
Also, Instead Of getting the static questions from the server, It's better to let users choose between the available verifications.
Generate the Multi-language questions based on the region or the customers.
Moreover, It's better to let users update their answers after submitting the form.

## Other Available Scripts
1. For Test: `yarn run test`
2. For Build: `yarn run build`
3. For Manual Setting: `yarn run eject`

> **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.


## Useful Links

1. [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
2. [React documentation](https://reactjs.org/).
