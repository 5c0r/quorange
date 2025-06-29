## OrangeHRM automated testing project

### Test cases
- https://docs.google.com/spreadsheets/d/1I5mP_UfUZVZLrnJhDl1syJw3K_A_3IiliCEa8-_zd6I/edit?usp=sharing

### Test Code Project

#### Requirements
- yarn

#### Getting started
- Clone the project
- npx playwright install --with-deps


#### Running the test project
- Make sure APP_URL has been configured properly as per .env.example
- `npx playwright test`

#### Testing framework rationale
- Framework selection : Playwright

- Modern framework developed by Microsoft
- Good support of multiple Programming Languages, with extended TypeScript support
- Good API to support for multiple testing scenarios and writing own assertions
- Support for multiple modern browsers and devices
- Good testing performance, support parallelism and retries

- Making use of Playwright
-- Using POM (Page Object Model) to write maintainable tests , as it is easier to track changes

- Making use of Artillery
-- To check page/action performance
