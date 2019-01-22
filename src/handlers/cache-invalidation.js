const https = require('https');

const app = async (event, context) => {



  https.get('', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

  return {
    statusCode: 200,
    body: {
      data: { success: true }
    }
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    'endpoint':{
      type:'string'
    },
    method: {
      type: 'string',
      enum:['GET'],
      default:'GET'
    }
  },
  required:['endpoint','method']
}
const outputSchema = { type: 'object' }

const handler = require('../middleware')(app, {
  inputSchema,
  outputSchema
})

module.exports = { handler }
