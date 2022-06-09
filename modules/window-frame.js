const { console, core, event, menu } = iina;

function mount(item) {
  let enableGettingWindowFrame = false;
  let windowResizedListenerID, windowMovedListenerID;

  item.addSubMenuItem(menu.separator());
  item.addSubMenuItem(
    menu.item(
      "Get window frame update",
      (item) => {
        enableGettingWindowFrame = !enableGettingWindowFrame;
        item.selected = enableGettingWindowFrame;
        if (enableGettingWindowFrame) {
          core.osd("Move or resize the window to get window frame update");
          windowResizedListenerID = event.on(
            "iina.window-resized",
            ({ width, height, x, y }) => {
              core.osd(`Window resized to: (${width},${height})@(${x},${y})`);
            }
          );
          windowMovedListenerID = event.on(
            "iina.window-moved",
            ({ width, height, x, y }) => {
              core.osd(`Window moved to: (${width},${height})@(${x},${y})`);
            }
          );
        } else {
          event.off("iina.window-resized", windowResizedListenerID);
          event.off("iina.window-moved", windowMovedListenerID);
        }
      },
      enableGettingWindowFrame
    )
  );
}

module.exports = mount;
