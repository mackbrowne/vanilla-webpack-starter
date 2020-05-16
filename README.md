# Miro Test Project

This is the Miro take home test. A hosted version can be found at [mackbrowne.github.io](https://mackbrowne.github.io)

The `EmailsInput` class can be used as `new EmailsInput(inputContainerNode, { id: 'unique-id' }})`;

## Setup

- Install [Node](https://nodejs.org)
- run `npm install`
- run `npm start` to run the development server at `http://localhost:8080`

## Scripts

User `npm run-script <COMMAND>` to run the commands below.

| Command     |                                                                                      Info |
| ----------- | ----------------------------------------------------------------------------------------: |
| start       | Run the [webpack](https://webpack.js.org/) development server at `http://localhost:8080`. |
| test        |                   Same as above but running with [Cypress](https://www.cypress.io/) tests |
| build       |                Run a production webpack build and output the bundle to the `dist/` folder |
| start:build |                Same as above, but serves the production build at `https://localhost:5000` |

## Emails-Input API

| Property      |                                                                                                        Info |
| ------------- | ----------------------------------------------------------------------------------------------------------: |
| getEmails     |                                                 A method to get all entered emails. Both valid and invalid. |
| replaceEmails |                                                       A method to replace all entered emails with new ones. |
| subscribe     | Ability to subscribe for emails list changes. Accepts a callback that has 1 string parameter - Event Status |

## Considerations

- Used a class to make it more re-usable. Although a slight change from the requirement, you need to use the `new` prefix
- I used 3 small external libraries for email validation, random emails generated, and for keycodes. I chose extremely small libraries and reviewed their source before adding. I don't believe this took away from the value test in any way.

## Todos

- investigate issues on mobile
- test subscribe method with custom events
- test IE 11
