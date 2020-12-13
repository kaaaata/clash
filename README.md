This is the codebase for "Clash", a React card game I am developing. It is a work in progress.  

"Clash" borrows ideas from Clash of the Dragons, an old browser card game I played as a kid, but has since closed down.  

## Playtesting
You can playtest it at [https://calm-hollows-81714.herokuapp.com/](https://calm-hollows-81714.herokuapp.com/). Any feedback is appreciated.  

Note: <code>calm-hollows</code> is a testing environment running on a free dyno, so the page may take 20 seconds to load.  

## Bootstrapping Instructions
<code>npm i</code> install dependencies  
<code>npm start</code> to start the React app at [localhost:3000](http://localhost:3000)  

## Useful scripts
<code>npm run lint</code> run lint excluding rules in .eslintrc  
<code>npm t</code> run Jest test suite  

## Local Dev Flow Testing
If running locally, [localhost:3000/flow](http://localhost:3000/flow) brings you to a "control panel", in which there are toggles to help test various game flows.

For example, there's a toggle to skip the intro. In theory, this tool allows the developer to test any screen in the game with any combination of variables, immediately after reloading the app.  

New flows can be added in <code>Flow.js</code>.  

## Additionally...
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

This repo is meant to render a 1000px by 600px game and nothing else, so that it can be embedded into other apps as an <code>iframe.</code>  
