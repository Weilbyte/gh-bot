const webhookDiscord = require('webhook-discord')

const splitLabelName = require('../util/splitLabelName')

const config = require('../config')

exports.opened = async function(app, discord, context) {
    let comment = context.issue({ body: `${config.issue.output.thanks}` })
    let shouldAssign = true

    const titleBadLength = context.payload.issue.title.length < config.issue.minTitleLength
    const bodyBadLength = context.payload.issue.body.length < config.issue.minBodyLength
    const noBody = context.payload.issue.body.length === 0

    if (noBody) {
        comment = context.issue({ body: `${config.issue.output.thanks}\n\n${config.issue.output.noBody}` })
        shouldAssign = false
    } else if (titleBadLength || bodyBadLength) {
        comment = context.issue({ body: `${config.issue.output.thanks}\n\n${config.issue.output.notMinLength}` })
    }

    const discordMsg = new webhookDiscord.MessageBuilder()
                .setColor(config.discord.colors.gray)
                .setName(config.discord.name)
                .setTitle(config.issue.output.discord.newIssue)
                .addField('#', context.payload.issue.number, true)
                .addField('Title', context.payload.issue.title, true)
                .addField('Description', (noBody ? 'N/A' : context.payload.issue.body))
                .setURL(context.payload.issue.html_url)
                .setFooter(context.payload.repository.full_name)

    discord.send(discordMsg)

    if (shouldAssign) {
        const triageLabelCheck = await context.github.issues.getLabel({
            owner: context.issue().owner,
            repo: context.payload.repository.name,
            name: config.issue.defaultLabel
        })

        if (triageLabelCheck.status === 200) {
            await context.github.issues.addLabels({
                owner: context.issue().owner,
                repo: context.payload.repository.name,
                issue_number: context.payload.issue.number,
                labels: [config.issue.defaultLabel],
            })
        }

        const assign = context.issue({ assignees: context.issue().owner })
        await context.github.issues.addAssignees(assign);
    }

    return context.github.issues.createComment(comment)
}

exports.edited = async function(app, discord, context) {
    if (context.payload.changes.body !== undefined && context.payload.changes.body.from !== undefined) {
        if (context.payload.changes.body.from.length === 0 && context.payload.issue.body.length > 0) {
            let comment = context.issue({ body: `${config.issue.output.thanksForBody}` })
    
            const discordMsg = new webhookDiscord.MessageBuilder()
                .setColor(config.discord.colors.gray)
                .setName(config.discord.name)
                .setTitle(config.issue.output.discord.issueGotBody)
                .addField('#', context.payload.issue.number, true)
                .addField('Title', context.payload.issue.title, true)
                .addField('Description', context.payload.issue.body)
                .setURL(context.payload.issue.html_url)
                .setFooter(context.payload.repository.full_name)
    
            discord.send(discordMsg)
    
            await context.github.issues.createComment(comment)

            const assign = context.issue({ assignees: context.issue().owner })
            return context.github.issues.addAssignees(assign);
        }
    }
}

exports.labeled = async function(app, discord, context) {
    const owner = context.issue().owner
    const repo = context.payload.repository.name
    const issue_number = context.payload.issue.number

    const newLabel = context.payload.label.name
    if (newLabel.includes(':') || newLabel.includes('/') || newLabel.includes('\\')) {
        const splitNewLabel = splitLabelName(newLabel)

        const issueLabels = await context.github.issues.listLabelsOnIssue({
            owner,
            repo,
            issue_number,
        });

        for (const label in issueLabels.data) {
            const name = issueLabels.data[label].name
            const splitName = splitLabelName(name)

            if (splitName[0] === splitNewLabel[0] && name !== newLabel) {
                await context.github.issues.removeLabel({
                    owner,
                    repo,
                    issue_number,
                    name
                })
            }
        }
    }
}