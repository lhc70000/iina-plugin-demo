// Import IINA APIs. This is the recommended way.
const {
  core,
  console,
  event,
  mpv,
  http,
  menu,
  overlay,
  standaloneWindow,
  preferences,
  subtitle,
  playlist,
  utils,
  global,
} = iina;

// Create a menu item.
const item = menu.item("Actions");

// IINA has a basic Node-like module system. However, it's recommended to use a bundle system
// such as parcel to pack all the modules together.
// A bundle system also allows you to use the latest JavaScript syntax
// and advanced libraries such as React and Vue to build the interface.
const modules = [
  require("../modules/osd.js"),
  require("../modules/overlay.js"),
  require("../modules/window.js"),
  require("../modules/sidebar.js"),
  require("../modules/playlist.js"),
  require("../modules/prompt.js"),
  require("../modules/window-frame.js"),
  require("../modules/subtitle.js"),
  require("../modules/file.js"),
];

// The exported function in each file will add some sub menu items to this menu.
for (const m of modules) {
  m(item);
}

// Add the menu item to the Plugin menu.
menu.addItem(item);

// By default, console.log will output to the Xcode output window.
console.log("test:", preferences.get("test"));

// Normally, a plugin instance is associated with a player core.
// However, a global plugin instance is not linked to player cores.
// Instead, it can create and manage other player cores, as shown in global.js.
// Here we check if the current player core is a managed one using global.getLabel().
if (global.getLabel() === "side-by-side") {
  // If this player core is created by the global plugin instance

  // Whether the window should be displayed on the left
  let isLeft;

  // Stop when file loaded
  event.on("mpv.file-loaded", () => {
    mpv.set("pause", true);
    mpv.command("seek", ["0", "absolute+exact"]);
  });

  // Always update the window frame to display videos side-by-side
  event.on("iina.window-size-adjusted", (frame) => {
    // window position
    const aspect = frame.height / frame.width;
    const screen = core.window.screens.find((s) => s.current);
    const width = screen.frame.width / 2;
    const height = width * aspect;
    core.window.frame = {
      x: isLeft ? 0 : width,
      y: (screen.frame.height - height) / 2,
      width,
      height,
    };
  });

  // Get isLeft from the global plugin instance
  global.onMessage("load", (data) => {
    isLeft = data.isLeft;
    core.open(data.path);
  });

  // Handle the messages from the global plugin instance
  global.onMessage("pause", async () => {
    core.status.paused ? core.resume() : core.pause();
  });

  global.onMessage("seek", async (data) => {
    core.seek(data);
  });
}
