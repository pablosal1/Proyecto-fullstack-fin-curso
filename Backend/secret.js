const crypto = require("node:crypto");

const secret = "Full stack 11"
const newSecret = "may the force be with you";
const hash = crypto.createHmac("sha256", secret).update("this is the way").digest("hex");
const newHash = crypto.createHmac("sha256", newSecret).update("this is the way").digest("hex");

console.log(newHash);