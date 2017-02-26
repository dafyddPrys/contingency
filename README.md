# Contingency

A tool to trigger webhook calls when you don't check in.

Work in Progress!

Stole the starter project from [sahat/hackathon-starter](https://github.com/sahat/hackathon-starter).

## What is it?

 It's a tool where you can create 'contingencies' - actions that will trigger if you don't stop them from doing so. 

 You can set up an action (to start, this will be a webhook) to be triggered at a certain date and time. It can be repeated if you so desire. Once a contingency is active, you will need to 'check in' to stop that contingency action from triggering.
 For now, you will need to log in to 'check in' on a contingency. In the future, we will be able to check in over various messaging platforms by writing bots to process the check in.

## How to use it

### As an end user
(The project has no website yet.)

### As a developer
To install, clone the project, run `npm install` and then `npm start`. This will expose the local site at `localhost:3000`. `nodemon app.js` might be a little more useful for development.

## Building and deploying
There is no build step - the sass is comiled as a middleware step by the express application. 


## Contributing

Contributions are definitely welcome. Open up an issue to start a discussion or fork the repository and use a feature branch. Pull requests are very welcome. 
Please write in ES6 syntax.

The projects uses the Airbnb ESLint config, so please use this when writing contributions. Thanks!

## Licensing
The code in this project is licensed under MIT license.


# Roadmap

Some of the features that I would like to add next:

- Allow check-ins from messenger applications: Write some bot logic to handle check ins over messenger platforms. Use username / contingency id / contingency pin auth combination. 
- Create more endpoints for contingencies. Email is the obvious first choice.