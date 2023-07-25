
## [0.1.0-canary.0] - 2022-11-12
#### We were able to create this project because of the [Distube Example Bot](https://github.com/distubejs/example) repository, which they were happy to build under the MIT license, but we changed and removed some of the functions and features previously created by them.

### Added

- Added ```latency``` command in ```./commands/latency.js```
- Added ```uptime``` command in ```./commands/uptime.js```

### Changed

- We made a lot of changes to every commands that were previously made. You can see all the changes we made through the commit log.

### Removed

- We removed some commands that were previously created. This is the list of removed commands: 
  - ```autoplay```
  - ```filters```
  - ```forward```
  - ```playskip```
  - ```playtop```
  - ```previous```
  - ```rewind```
  - ```seek```
  - ```shuffle```
  - ```skipto```

## [0.1.0-canary.1] - 2022-11-13
#### In this release, we've made some changes on some commands.

### Added
- `latency.js` command has aliases (`ping`).

### Changed
- `play.js` command aliases has been changed (before `p`).
- When `pause.js` is performed, the user will be informed with a reply and embedded message.
- When `play.js` is performed, the user will be informed with a reply and embedded message.
- When `queue.js` is performed, the user will be informed with a reply and embedded message.
- When `repeat.js` is performed, the user will be informed with a reply and embedded message.
- When `resume.js` is performed, the user will be informed with a reply and embedded message.
- When `skip.js` is performed, the user will be informed with a reply and embedded message.
- When `volume.js` is performed, the user will be informed with a reply and embedded message.

### Removed
- `pause.js` command aliases has been removed.
- `queue.js` command aliases has been removed.
- `stop.js` command aliases has been removed.

## [0.1.0-canary.2] - 2023-07-25

#### In this release, we made a lot of changes. We added Slash Command, refactors, and much more.

### Added
- Added **Slash Command** command function on `index.js`.
> This feature is not **100%** usable, because it's still under development.
- Added **slash-commands** folder for storing the commands.
  - Added `commands.js` to **slash-commands** folder.
  - Added `join.js` to **slash-commands** folder.
  - Added `latency.js` to **slash-commands** folder.
  - Added `leave.js` to **slash-commands** folder.
  - Added `nowplaying.js` to **slash-commands** folder.
  - Added `pause.js` to **slash-commands** folder.
  - Added `play.js` to **slash-commands** folder.
  - Added `queue.js` to **slash-commands** folder.
  - Added `repeat.js` to **slash-commands** folder.
  - Added `resume.js` to **slash-commands** folder.
  - Added `skip.js` to **slash-commands** folder.
  - Added `stop.js` to **slash-commands** folder.
  - Added `uptime.js` to **slash-commands** folder.
  - Added `version.js` to **slash-commands** folder.
  - Added `voicelatency.js` to **slash-commands** folder.
  - Added `volume.js` to **slash-commands** folder.
  - Added `README.md` to **slash-commands** folder.
- Added `deploy-command.js`.
> This file used to deploy the Slash Command.
- Added `uptime.js` to **legacy-commands** folder.
- Added `README.md` to **legacy-commands** folder.
- Added "cooldown" function on several commands (legacy commands). Here's the list of which commands that has the "cooldown" function:
> Cooldown is a function to avoid floods/spams.
  - Added "cooldown" function on `commands.js`.
  - Added "cooldown" function on `latency.js`.
  - Added "cooldown" function on `nowplaying.js`.
  - Added "cooldown" function on `pause.js`.
  - Added "cooldown" function on `queue.js`.
  - Added "cooldown" function on `repeat.js`.
  - Added "cooldown" function on `resume.js`.
  - Added "cooldown" function on `skip.js`.
  - Added "cooldown" function on `stop.js`.
  - Added "cooldown" function on `uptime.js`.
  - Added "cooldown" function on `volume.js`.

### Changed
- **commands** folder has been replaced with **legacy-commands**.
- Update dependencies version (`package.json` & `package-lock.json`).
- `index.js` has been refactored.

### Removed
- `.prettierrc.json` has been removed. Replaced with `.eslintrc.json`.