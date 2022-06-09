const { overlay, menu, event } = iina;

function mount(item) {
  let showing = false;

  event.on("iina.window-loaded", () => {
    // Simple mode allows you to set the HTML and CSS directly as string without writing a separate HTML file.
    overlay.simpleMode();
  });

  event.on("iina.plugin-overlay-loaded", () => {
    // Set the CSS styles for the overlay webview.
    overlay.setStyle(`
    h1 {
        font-size: 60px;
        color: #66ccff;
        margin: 12px 0;
    }
    .content {
        background: #22ffdd;
        padding: 16px;
        font-size: 24px;
    }
    `);
  });

  item.addSubMenuItem(
    menu.item(
      "Display overlay text",
      () => {
        if (showing) {
          overlay.hide();
        } else {
          // Set the HTML content for the overlay webview.
          overlay.setContent(`<h1>Title</h1><div class="content">Some content</div>`);
          overlay.show();
        }
        showing = !showing;
      },
      { keyBinding: "Alt+d" }
    )
  );
}

module.exports = mount;
