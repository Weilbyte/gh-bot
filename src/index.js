const issues = require('./handler/issues')
const pr = require('./handler/pr')
const label = require('./handler/label')
const repo = require('./handler/repo')

const ownRepo = require('./util/ownRepo')
const amSender = require('./util/amSender')

const webhookDiscord = require('webhook-discord')
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  if (!process.env.DISCORD_WEBHOOK) {
    app.log.fatal('DISCORD_WEBHOOK env var not set but required, exiting.')
    process.exit(1)
  }

  const discord = new webhookDiscord.Webhook(process.env.DISCORD_WEBHOOK)

  app.log.info('Loaded!')

  app.on('issues.opened', async context => {
    if (ownRepo(context)) return issues.opened(app, discord, context)
  })

  app.on('issues.edited', async context => {
    if (ownRepo(context)) return issues.edited(app, discord, context)
  })

  app.on('issues.labeled', async context => {
    if (ownRepo(context)) return issues.labeled(app, discord, context)
  })

  app.on('pull_request.opened', async context => {
    if (ownRepo(context)) return pr.opened(app, discord, context) 
  })

  app.on('pull_request.edited', async context => {
    if (ownRepo(context)) return pr.edited(app, discord, context) 
  })

  app.on('label.created', async context => {
    if (ownRepo(context) && amSender(context)) return label.created(app, discord, context)
  })

  app.on('repository.created', async context => {
    if (ownRepo(context)) return repo.created(app, discord, context)
  })

}
