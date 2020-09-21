const webhookDiscord = require('webhook-discord')

const config = require('../config')

exports.opened = async function(app, discord, context) {
    let shouldAssign = true

    const titleBadLength = context.payload.pull_request.title.length < config.pr.minTitleLength
    const bodyBadLength = context.payload.pull_request.body.length < config.pr.minBodyLength
    const noBody = context.payload.pull_request.body.length === 0

    if (noBody) {
        await context.github.issues.createComment(context.issue({ body: `${config.pr.output.noBody}` }))
        shouldAssign = false
    } else if (titleBadLength || bodyBadLength) {
        await context.github.issues.createComment(context.issue({ body: `${config.pr.output.notMinLength}` }))
    }

    const discordMsg = new webhookDiscord.MessageBuilder()
                .setColor(config.discord.colors.orange)
                .setName(config.discord.name)
                .setTitle(config.pr.output.discord.newPR)
                .addField('#', context.payload.pull_request.number, true)
                .addField('Title', context.payload.pull_request.title, true)
                .addField('Description', (noBody ? 'N/A' : context.payload.pull_request.body))
                .setURL(context.payload.pull_request.html_url)
                .setFooter(context.payload.repository.full_name)

    discord.send(discordMsg)

    if (shouldAssign) {
        const assign = context.issue({ assignees: context.issue().owner })
        await context.github.issues.addAssignees(assign);
    }
}

exports.edited = async function(app, discord, context) {
    if (context.payload.changes.body !== undefined && context.payload.changes.body.from !== undefined) {
        if (context.payload.changes.body.from.length === 0 && context.payload.pull_request.body.length > 0) {
            const discordMsg = new webhookDiscord.MessageBuilder()
                .setColor(config.discord.colors.orange)
                .setName(config.discord.name)
                .setTitle(config.pr.output.discord.PRGotBody)
                .addField('#', context.payload.pull_request.number, true)
                .addField('Title', context.payload.pull_request.title, true)
                .addField('Description', context.payload.pull_request.body)
                .setURL(context.payload.pull_request.html_url)
                .setFooter(context.payload.repository.full_name)

            discord.send(discordMsg)

            const assign = context.issue({ assignees: context.issue().owner })
            return context.github.issues.addAssignees(assign);
        }
    }
}