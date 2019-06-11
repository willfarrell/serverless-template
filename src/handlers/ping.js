const app = async () => {
  return {
    statusCode: 200,
    body: {
      data: {
        success: true,
        timestamp: (new Date()).toISOString()
      }
    }
  }
}

const inputSchema = { type: 'object' }
const outputSchema = { type: 'object' }

const handler = require('../lib/middleware')(app, {
  inputSchema,
  outputSchema
})

module.exports = { handler }
