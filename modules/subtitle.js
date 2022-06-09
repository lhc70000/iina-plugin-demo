const { console, http, subtitle, file } = iina;

// Register a subtitle privider. Related settings will be available in the preferences panel
// and the Subtitle menu.
function mount() {
  subtitle.registerProvider("demo", {
    // Search for subtitles and return an array of custom objects.
    async search() {
      const _ = await http.get("https://iina.io");
      const data = [
        {
          id: 1,
          name: "Test 1",
          lang: "eng",
          type: "srt",
          downloads: 1000,
          rating: 4.5,
          uploadTime: "2000-00-00",
        },
        {
          id: 2,
          name: "Test 1",
          lang: "eng",
          type: "srt",
          downloads: 1000,
          rating: 4.5,
          uploadTime: "2000-00-00",
        },
      ];
      return data.map((x) => subtitle.item(x));
    },
    // Get the description of a custom subtitle object.
    description(item) {
      const { name, lang, type, downloads, rating, uploadTime } = item.data;
      return {
        name,
        left: `${type} ${lang} ⬇${downloads} ★${rating}`,
        right: `${uploadTime}`,
      };
    },
    // Return the URL of the download link of a custom subtitle object,
    // or the already downloaded file path.
    async download(subtitle) {
      console.log(subtitle);

      // Here we write a sample srt file under the tmp folder.
      const srt = `1
00:00:00,280 --> 00:00:05,140
In the last video, you saw how sampling at
random, over the range of hyperparameters,

2
00:00:05,140 --> 00:00:09,330
can allow you to search over the space
of hyperparameters more efficiently.

3
00:00:09,330 --> 00:00:14,980
But it turns out that sampling at random
doesn't mean sampling uniformly at random,

4
00:00:14,980 --> 00:00:16,990
over the range of valid values.
          `;

      // Paths can contain magic strings like:
      // - @tmp: the private temporary folder of the plugin.
      // - @data: the private data folder of the plugin.
      // Paths outside the plugin "sandbox" requires the "file-system" permission.
      const path = "@tmp/subtitle-test.srt";

      // Write to the file.
      file.write(path, srt);
      return [path];
    },
  });
}

module.exports = mount;
