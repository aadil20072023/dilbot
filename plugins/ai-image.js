const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "img",
    alias: ["aiimg", "genimg"],
    react: "🎨",
    desc: "Generate AI images (free)",
    category: "ai",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return reply(
          "*🎨 Please enter a prompt*\n\nExample:\n/img cyberpunk lion"
        );
      }

      reply("*🧠 Generating AI image... Please wait*");

      // FREE AI IMAGE API (no key)
      const apiUrl = `https://api.popcat.xyz/dalle?prompt=${encodeURIComponent(q)}`;

      await conn.sendMessage(
        from,
        {
          image: { url: apiUrl },
          caption: `🖼️ *AI Image Generated*\n\n📝 Prompt: ${q}`
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("*❌ Failed to generate image. Try again later.*");
    }
  }
);

