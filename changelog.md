
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