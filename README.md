### Reddit Test

#### Setup

- Generate Reddit Credentials

  - Login to your Reddit account > then go to <code>https://www.reddit.com/prefs/apps</code>
  - Click the <code>Create app</code> button
    - Fill up the boxes
    - Make sure that <code>redirect_uri</code> must but <code>https://not-an-aardvark.github.io/reddit-oauth-helper/</code>
    - Copy the `Client ID`(code below the app name) and `Client Secret` for the next step.

- Generate Access Token

  - Go to `https://not-an-aardvark.github.io/reddit-oauth-helper/`
  - Paste your `Client ID` and `Client Secret` on the boxes under "Generate Token" section
  - For the sake of this demo, please do check all the Scopes or just simply check the checkbox beside "Scope Name" header
  - Go to the bottom and click `Generate Token` button
  - An access token will appear > Copy the `Access Token` 

- Set API access credentials

  - Go to the project `<project_root>/src/utils/config.js`

  - Edit the credentials with your own:

    - ```
      export const r = new Snoowrap({
        userAgent: "<your-reddit-user (ex. u/Ace)>",
        clientId: "<your-client-id>",
        clientSecret: ""<your-client-secret>",
        accessToken: ""<your-access-token>",
      });
      ```


#### Install deps and start application

- Go to your terminal > project root (Ex. `cd Projects\reddit_test`)
- Install node modules by typing `npm i ` or `yarn` > hit "Enter" key
- After installing, run application `npm start` or `yarn start`
- After running, open your Chrome and enter `http://localhost:3000`

#### Enjoy :)

