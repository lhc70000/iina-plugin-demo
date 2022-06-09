# Demo Plugin

This is a demo plugin for IINA's plugin system.

The only (optional) dependency of this package is `iina-plugin-definition`. Run

```sh
npm install
```

to install it.
The `jsconfig.json` is already prepared to use the definitions, so that you can get auto completions
in VSCode or other supported editors.

## Structure

### APIs

The IINA APIs are available in the global object `iina`.

- `iina.core`: Core functions, including opening files, showing OSD messages, changing the volume, etc.
- `iina.console`: Print messages.
- `iina.event`: Add and manage event listeners.
- `iina.mpv`: Access the mpv API.
- `iina.http`: Create HTTP requests and download files.
- `iina.menu`: Add menu items.
- `iina.playlist`: Access the playlist and customize the context menu.
- `iina.overlay`: Display custom content on top of the video.
- `iina.standaloneWindow`: Display custom content in a separate window.
- `iina.sidebar`: Display custom content in the sidebar.
- `iina.preferences`: Read/write plugin preferences.
- `iina.subtitle`: Register custom subtitle downloaders.
- `iina.file`: Access the file system.
- `iina.utils`: Utilities, such as executing a system command.
- `iina.global`: See below.

### Global/Local plugin instances

A **plugin instance** is created for each player core, which contains an isolated JavaScript environment.
Therefore, normally, a plugin instance (i.e. the code you write) can only control the associated player core.
For example,

- When you write `iina.mpv.getNumber("sub-scale")`, it gets the `sub-scale` property for the current mpv instance.
- When you write `iina.core.osd("Message")`, it displays OSD message in the current window.

Each plugin can also have a **global instance**, which doesn't belongs to any player core (and some APIs are not available).
However, the global instance has extra APIs to create and manage player cores.
Player cores created by the plugin are able to identify themselves and its plugin instances can communicate with the global instance.

`Info.json` contains all required information for the plugin.

- entry: The entry file. Its content will be executed immediately when the player core is loaded.
- globalEntry: The entry file for the global instance. Its content will be executed immediately when IINA starts.

Read `entries/main.js` and `entries/global.js` to get started.
