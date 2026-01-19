const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "imagine",
  alias: ["img", "image", "flux", "aiimage"],
  react: "🎨",
  desc: "Generate AI image using Pollinations",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a prompt.\nExample:\n.imagine a cat wearing sunglasses");

    await reply("> *CREATING IMAGE... 🎨✨*");

    // Pollinations AI image API
    const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?width=512&height=512&seed=${Math.floor(Math.random() * 100000)}`;

    const response = await axios.get(apiUrl, {
      responseType: "arraybuffer",
      timeout: 30000
    });

    if (!response.data) {
      return reply("❌ Failed to generate image. Try again.");
    }

    await conn.sendMessage(m.chat, {
      image: response.data,
      caption: `✨ *AI Image Generated*\n📝 Prompt: *${q}*`
    }, { quoted: mek });

  } catch (error) {
    console.error("Imagine Error:", error.message);
    reply("❌ Image generation failed. Please try again later.");
  }
});
