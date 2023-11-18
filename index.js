const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
const eris = require("eris")
require('dotenv').config()
const bot = new eris(
    process.env.TOKEN
)
let counts = {}
let wienaCounts = {}

let toAdd = {
    "!!!!!!!!!!": 1000000,
    "!!!": 100000,
    "!!": 10000,
    "!": 1000
}

bot.on("ready", () => {
    console.log("Howdy!")
})

bot.on("messageCreate", (msg) => {
    if (msg.author.id !== bot.user.id) {
        let wiena = ""
        let channelID = msg.channel.id
        let count = 0
        let counters
        (msg.content == "wiena") ? counters = wienaCounts : counters = counts
        (msg.content == "wiena") ? wiena = "**wiena**" : wiena = "wiena"
        if (msg.content == "DEVTEST") {
            bot.createMessage(msg.channel.id, "TESTDEV")
        }
        if (!counters[channelID]) {
          counters[channelID] = 0
        }
        counters[channelID] += 1 
        let wiena2 = ""
        for (const [key, value] of Object.entries(toAdd)) {
            console.log(key)
            if (count % value == 0) {
                wiena2 = key                
                break;
            }
        }
        if (count % 100 == 0) {
            bot.createMessage(msg.channel.id, wiena + wiena2)
        }
    }
})

bot.connect()