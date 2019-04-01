# liri-node-app
Command line app that searches various APIs and returns information to the user based on their input

## Contributors
@jryankendall

## Technology
- Javascript, node.js

## Modules
- Axios
- Moment
- Filesystem
- node-spotify-api
- dotenv

## About
- LIRI is a node-based command line app made for the Vanderbilt Coding Bootcamp, due April 1st 2019. The app is executed through the command line with node, and takes in 1 or more user input command line arguments. One of 4 commands can be executed, each with their own default result if no further argument is provided, each one logging a result corresponding to the user's input. One command reads from a txt file to execute the command.

## License
- Unlicense
- Spotify is owned by its creators. API utilized for non-commercial purposes.

## How to use this code
- In the liri-node-app directory, run `npm i` in order to retrieve the necessary modules indicated by package.json. Then, type `node liri.js`, followed by the command desired and then any query arguments desired. Typing `node liri.js` by itself will list the commands available to you.
- In order to utilize the spotify API, the user must provide their own client ID and client secret, from the Spotify developer's site. These details must be placed into a `.env` file. An example env file is provided to demonstrate syntax.

## Contribution Guidelines
  This was built for a homework assignment and as such will likely not be edited later, but comments, critique, and suggestions are always welcome, for use in future work!
  
## Contact

- e-mail: jryankendall@gmail.com
- LinkedIn: https://www.linkedin.com/in/jed-kendall/
