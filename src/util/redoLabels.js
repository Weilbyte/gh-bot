const addLabels = require('./addLabels')

module.exports = async function(context) {
    const owner = context.issue().owner
    const repo = context.payload.repository.name

    const labels = await context.github.issues.listLabelsForRepo({
        owner,
        repo
    })

    for (const label in labels.data) {
        const name = labels.data[label].name

        await context.github.issues.deleteLabel({
            owner,
            repo,
            name
        })
    }

    await addLabels(context, false)
}