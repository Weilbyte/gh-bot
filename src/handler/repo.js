const webhookDiscord = require('webhook-discord')

const redoLabels = require('../util/redoLabels')

exports.created = async function(app, discord, context) {
    await redoLabels(context)
}