const webhookDiscord = require('webhook-discord')

const redoLabels = require('../util/redoLabels')
const addLabels = require('../util/addLabels')
const config = require('../config')

exports.created = async function(app, discord, context) {
    if (context.payload.label.name === 'relabel') {
        await redoLabels(context)        
    } else if (context.payload.label.name === 'platformlabel') {
        await context.github.issues.deleteLabel({
            owner: context.issue().owner,
            repo: context.payload.repository.name,
            name: 'platformlabel'
        })

        await addLabels(context, true)
    }
}