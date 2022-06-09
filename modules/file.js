const { core, menu, file } = iina;

function mount(item) {
  item.addSubMenuItem(
    menu.item("Read file", () => {
      // Read file list under /Users
      const list = file.list("/Users");
      console.log(list);
    })
  );
}

module.exports = mount;
