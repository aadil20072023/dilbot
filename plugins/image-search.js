const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "imgsearch",
    alias: ["image", "pic", "photo"],
    react: "🔍",
    desc: "Search images (stable)",
    category: "search",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return reply("*🔍 Please enter a search query*\nExample:\n/imgsearch cat");
      }

      reply("*🔎 Searching images...*");

      // STABLE PUBLIC IMAGE SEARCH API
      const res = await axios.get(
        `https://api.popcat.xyz/images?q=${encodeURIComponent(q)}`
      );

      if (!res.data || !res.data.images || res.data.images.length === 0) {
        return reply("*❌ No images found*");
      }

      // Send up to 5 images
      const images = res.data.images.slice(0, 5);

      for (const img of images) {
        await conn.sendMessage(
          from,
          {
            image: { url: img },
            caption: `🖼️ *Image Search*\n🔎 Query: ${q}`
          },
          { quoted: mek }
        );
      }

      reply("*✅ Image search completed!*");

    } catch (e) {
      console.error(e);
      reply("*❌ Image search failed. Try again later.*");
    }
  }
);
