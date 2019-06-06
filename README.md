## SMS Notification System

> Allow admin to send sms text to all users.

### Require Installation Package

[Node.js (LTS Version)](http://nodejs.org/).
[MongoDB (Community Server)](https://www.mongodb.com/download-center/community)

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000
```

## Deployment

If you are planning to deploy this on any hosting services, please look that up yourself, and set it up yourself. Will probably have a one click heroko deployment when I do push and commit the upcoming updates.

## Setup

If you are planning to use a different database hosting, like mlab, please change the MONGO_URI in the config.js file in ./src/config.js. If not, you can let it save locally in your machine.

## Features

```bash
#  Admin Portal
#  Ability to add infinite numbers of phonenumbers
#  Support sms services like twilio, etc...
#  Fully customizable message settings
#  Simple but yet beautiful UI design
#  Many more...
```

## Currently Support

> if you have any other provider you want me to add, feel free to contact me!

- [x] Twilio

## Some UI Screenshots

![1](https://imgur.com/VYOQgEL.png)
![2](https://imgur.com/sCXH0Jv.png)
![3](https://i.imgur.com/Yl1atLF.png)

## Todo

- [ ] Filter Phone Numbers & Name
- [ ] Add more providers
- [x] Redo Database Structure | As of now if you create more than one admin accounts, any one will be able to see anyones newly created users!
- [ ] Add Dashboard Analytics
- [ ] Refactor any necessary components + lifecycle methods
- [ ] Alert messages is very inconsistent, need to fix that.

## Information

Currently, this supports only twilio, but I plan to add more in the future. As of now, twilio you need a "upgraded account" not a trial account. Trial account will not send any unverified numbers but yourself. In addition, there's still bugs that I have to fix, but everything is currently functional. Everything should be self explanatory. Play around with the web app :). Any questions feel free to open an issue!

## Bugs/Errors?

If there's any error or bugs, such as UI bugs, database, and api bugs. Please make an issue and I will try my best to resolve that particular issue.

## License

```
The MIT License (MIT)

Copyright (c) 2019 Eric Zhang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
