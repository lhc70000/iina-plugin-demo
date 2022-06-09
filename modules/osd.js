const { core, menu } = iina;

function mount(item) {
  item.addSubMenuItem(
    menu.item("Show OSD", () => {
      core.osd("This is a demo message");
    })
  );
}

module.exports = mount;
