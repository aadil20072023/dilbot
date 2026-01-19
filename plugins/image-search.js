const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "imgsearch",
    alias: ["image", "pic", "photo"],
    react: "🔍",
    desc: "Search images from the internet",
    category: "search",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return reply("*🔍 Please enter what image you want to search*\n\nExample:\n/imgsearch cute cat");
      }

      reply("*🔎 Searching images... Please wait*");

      // DuckDuckGo image API (NO API KEY NEEDED)
      const url = `https://duckduckgo.com/?q=${encodeURIComponent(q)}&iax=images&ia=images`;
      const tokenRes = await axios.get(url);
      const token = tokenRes.data.match(/vqd='([^']+)'/);

      if (!token) return reply("*❌ Failed to fetch images*");

      const api = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(
        q
      )}&vqd=${token[1]}&f=,,,&p=1`;

      const res = await axios.get(api, {
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const images = res.data.results.slice(0, 5);

      if (!images.length) {
        return reply("*❌ No images found*");
      }

      for (const img of images) {
        await conn.sendMessage(
          from,
          {
            image: { url: img.image },
            caption: `🖼️ *Image Search*\n\n🔎 Query: ${q}`
          },
          { quoted: mek }
        );
      }

      reply("*✅ Image search completed!*");

    } catch (e) {
      console.error(e);
      reply(`*❌ Error:* ${e.message || e}`);
    }
  }
);
