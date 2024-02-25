const { greetingScene } = require('./Dating/Dating')
const { Scenes } = require('telegraf')

const stage = new Scenes.Stage([greetingScene])

module.exports.stage = stage
