const { global, standaloneWindow, console, utils, menu } = iina;

let first, second;

standaloneWindow.loadFile("views/global.html");
standaloneWindow.setProperty({ title: "Control Multiple Player Cores" });

standaloneWindow.onMessage("open-file", async () => {
  const path = await utils.chooseFile("Open file");
  console.log(path);

  first = global.createPlayerInstance({
    disableWindowAnimation: true,
    disableUI: true,
    label: "side-by-side",
  });
  second = global.createPlayerInstance({
    disableWindowAnimation: true,
    label: "side-by-side",
  });

  global.postMessage(first, "load", { path, isLeft: true });
  global.postMessage(second, "load", { path, isLeft: false });

  setTimeout(() => {
    standaloneWindow.open();
  }, 1000);
});

standaloneWindow.onMessage("pause", () => {
  global.postMessage(null, "pause");
});

standaloneWindow.onMessage("seek-forward", () => {
  global.postMessage(null, "seek", 5);
});

standaloneWindow.onMessage("seek-backward", () => {
  global.postMessage(null, "seek", -5);
});

standaloneWindow.open();

menu.addItem(
  menu.item("Open videos side-by-side", () => {
    standaloneWindow.open();
  })
);
