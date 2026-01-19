const { cmd } = require("../command");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

cmd(
  {
    pattern: "img",
    alias: ["aiimg", "image"],
    react: "🎨",
    desc: "Generate AI images",
    category: "ai",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      if (!q) {
        return reply("*🎨 Please enter a prompt*\n\nExample:\n/img cyberpunk lion logo");
      }

      reply("*🧠 Generating AI image... Please wait*");

      const result = await openai.images.generate({
        model: "gpt-image-1",
        prompt: q,
        size: "1024x1024"
      });

      const imgBuffer = Buffer.from(
        result.data[0].b64_json,
        "base64"
      );

      await conn.sendMessage(
        from,
        {
          image: imgBuffer,
          caption: `🖼️ *AI Image Generated*\n\n📝 Prompt: ${q}`
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply(`*❌ Error:* ${e.message || e}`);
    }
  }
);
