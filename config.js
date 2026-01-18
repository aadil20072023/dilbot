const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "RuonXRqY#BYQAXvyZW5FOpfR0t4NZ0L-RtA_CsP4qHLSgHyjErC0",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/aadil20072023/dilbot/blob/main/images/Welcome_dil_bot.png?raw=true",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 DIL-BOT Is Alive Now😍*",
BOT_OWNER: '94725023747',  // Replace with the owner's phone number



};
