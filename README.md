# MetaEditor for Unreal Engine

[**MetaEditor**](http://metaeditor.io/), created by the team at [UnrealOS](https://unrealos.com/) is a professional web application development solution based on ReactJS and PixelStreaming.

The standard implementation of [PixelStreaming](https://docs.unrealengine.com/5.0/) greatly complicates the development of reactive web applications for Unreal Engine. Initially, PixelStreaming is a no-architecture javascript solution for interacting with reactive web frameworks. Adapting standard PixelStreaming to ReactJS is a very long and laborious process. This process significantly increases the development time, because there are a lot of technical challenges related to the peculiarities of browsers, devices and reactive technologies (like ReactJS, Angular or Vue).

**MetaEditor** streamlines PixelStreaming development to allow businesses to easily deploy and customize their ReactJS application.

### Documentation

https://metaeditor.io/docs/

### Steps to run this project:

1. Run `yarn install` command
2. Run `yarn dev` command

### Config

Global config:

* `/api/env.js`

Setup the [Sentry](https://sentry.io/) — *Open-source error tracking with full stacktraces & asynchronous context.*

- `/.sentryclirc`

- `/sentry.client.config.js`

- `/sentry.server.config.js`

### Stack:

1. PixelStreaming
2. ReactJS + TypeScript
3. Material (MUI)
4. Emotion
5. Nextjs
