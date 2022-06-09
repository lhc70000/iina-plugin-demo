const { console, playlist, menu } = iina;

function mount() {
  // Returns some menu items to display in the context menu
  // when user selected some entries in the playlist.
  playlist.registerMenuItemBuilder((files) => [
    menu.item(`${files.length} items chosen; click to log filenames`, () => {
      const list = playlist.list();
      console.log(files.map((f) => list[f].filename).join(","));
    }),
  ]);
}

module.exports = mount;
