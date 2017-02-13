# NYPL New Arrivals

Get bib items that are new arrivals or on order at NYPL.

### Installation
This app runs on Node.js, Express, and React. After cloning this repo, to install all the dependencies run:

```sh
$ npm install
```

### Starting the App
## Development Mode
Run the following command to start the app locally. Then check localhost:3001.

```sh
$ npm start
```

You can also set the APP_ENV variable to development, qa, or production to use those respective environments. The default is production.

```sh
$ APP_ENV=development npm start
```

## Production Mode
To simulate what the production server would serve up, run:

```sh
$ npm run dist
$ NODE_ENV=production npm start
```

## Changelog

### v1.3.4
#### Added
- Added HTTPS fix and the JavaScript fallback for log in button on the Header Component.

### v1.3.3
#### Added
- Enabled Feature Flags plugin on the client-side and added Optimizely script in the index.ejs file.
