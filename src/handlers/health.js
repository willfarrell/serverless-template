function pause(milliseconds) {
  var dt = new Date();
  while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

const app = async (event, context) => {
  
  pause(5*1000)
 
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: { success: true }
    })
  }
}

const inputSchema = { type: 'object' }
const outputSchema = { type: 'object' }

const handler = require('../middleware')(app, {
  inputSchema,
  outputSchema
})


module.exports = { handler }
