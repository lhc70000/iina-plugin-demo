const { core, console, menu } = iina;

// Display some common dialog boxes.
function mount(item) {
  item.addSubMenuItem(menu.separator());

  item.addSubMenuItem(
    menu.item("Ask", () => {
      const result = utils.ask(`Will you click the "Cancel" button?`);
      core.osd(result ? "YES" : "NO");
    })
  );

  item.addSubMenuItem(
    menu.item("Prompt", () => {
      const result = utils.prompt(`The answer to life, the universe and everything`);
      core.osd(result);
    })
  );
}

module.exports = mount;
