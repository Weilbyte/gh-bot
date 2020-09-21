const config = require('../config')

module.exports = async function(context, platformOnly) {
    const owner = context.issue().owner
    const repo = context.payload.repository.name

    if (platformOnly) {
        for (const platform in config.platformLabels.platforms) {
            const name = config.platformLabels.platforms[platform]
    
            await context.github.issues.createLabel({
                owner,
                repo,
                name: `Platform: ${name}`,
                color: config.platformLabels.color.replace('#', ''),
                description: `Specific to ${name}.`
            })
        }
    } else {
        for (const label in config.labels) {
            const name = config.labels[label].name
            const color = config.labels[label].color.replace('#', '')
            const description = config.labels[label].description
    
            await context.github.issues.createLabel({
                owner,
                repo,
                name,
                color,
                description
            })
        }
    }
}