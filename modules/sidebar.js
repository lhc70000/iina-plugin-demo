const { core, event, menu, sidebar } = iina;

// Show a webview in the sidebar.
function mount(item) {
  item.addSubMenuItem(
    menu.item("Show Sidebar", () => {
      core.window.sidebar = "plugin:io.iina.demo2";
      updateView();
    })
  );
  item.addSubMenuItem(
    menu.item("Hide Sidebar", () => {
      core.window.sidebar = null;
    })
  );

  function updateView() {
    sidebar.postMessage("get-update", {
      title: core.status.url,
      isPaused: core.status.paused,
      volume: core.audio.volume,
    });
  }

  sidebar.loadFile("views/sidebar.html");

  sidebar.onMessage("request-update", () => {
    updateView();
  });

  sidebar.onMessage("toggle-pause", () => {
    core.status.paused ? core.resume() : core.pause();
  });

  sidebar.onMessage("set-volume", ({ volume }) => {
    core.audio.volume = volume;
  });

  event.on("mpv.volume.changed", () => updateView());
  event.on("mpv.pause.changed", () => updateView());
}

module.exports = mount;
