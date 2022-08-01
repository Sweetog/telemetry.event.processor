

const eventSimple = {
    name: 'foo',
    something: 'else',
    source: 'sandbox-ping'
};

const eventWithError =  {
    "source": "cli-cmd",
    "localUser": "brian.ogden",
    "cwd": "/Users/brian.ogden/Developer/foo/component",
    "error": {
      "name": "TypeError",
      "stack": "TypeError: Cannot read property 'stderr' of undefined\n    at Object.FirefoxBrowser._start (/Users/brian.ogden/Developer/node_modules/karma-firefox-launcher/index.js:222:19)\n    at Object.<anonymous> (/Users/brian.ogden/Developer/node_modules/karma/lib/launchers/process.js:19:10)\n    at Object.emit (events.js:412:35)\n    at Object.emit (domain.js:475:12)\n    at Object.BaseLauncher.start (/Users/brian.ogden/Developer/node_modules/karma/lib/launchers/base.js:52:10)\n    at Object.j (/Users/brian.ogden/Developer/node_modules/karma/lib/launcher.js:108:17)\n    at Object.setTimeout.bind.j (/Users/brian.ogden/Developer/node_modules/qjobs/qjobs.js:143:18)\n    at listOnTimeout (internal/timers.js:557:17)\n    at processTimers (internal/timers.js:500:7)"
    },
    "commandString": "test functional",
    "environmentOptions": {
      "watch": false,
      "coverageDir": "./coverage-functional",
      "coverage-dir": "./coverage-functional",
      "coverage": false,
      "legacy": false,
      "webpack": false,
      "$0": "cli"
    },
    "node": "v14.19.3",
    "npm": "6.14.17",
    "cliVersion": "22.11.1",
    "time": {
      "m": 4,
      "s": 51,
      "ms": 384
    },
    "modulePackage": {
      "name": "@foo/component",
      "version": "22.0.4",
      "repository": {
        "type": "git",
        "url": "repo-url"
      }
    },
    "exitCode": 0
  };


module.exports = {
    eventSimple,
    eventWithError
};