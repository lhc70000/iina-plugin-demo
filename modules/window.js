const { core, event, menu, standaloneWindow } = iina;

event.on("iina.window-will-close", () => {
  console.log("Window will close");
});

function mount(item) {
  item.addSubMenuItem(menu.separator());
  item.addSubMenuItem(
    menu.item("Standalone window", () => {
      standaloneWindow.open();
      updateSAWindow();
    })
  );

  function updateSAWindow() {
    standaloneWindow.postMessage("get-update", {
      title: core.status.url,
      isPaused: core.status.paused,
      volume: core.audio.volume,
    });
  }

  standaloneWindow.loadFile("views/standalone.html");
  standaloneWindow.setProperty({ title: "Standalone Window Demo" });

  standaloneWindow.onMessage("request-update", () => {
    updateSAWindow();
  });
  standaloneWindow.onMessage("toggle-pause", () => {
    core.status.paused ? core.resume() : core.pause();
  });
  standaloneWindow.onMessage("set-volume", ({ volume }) => {
    core.audio.volume = volume;
  });

  event.on("mpv.volume.changed", () => updateSAWindow());
  event.on("mpv.pause.changed", () => updateSAWindow());
}

module.exports = mount;
