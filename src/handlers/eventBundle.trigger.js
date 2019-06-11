const AWS = require('aws-sdk')

const trigger = async (event) => {
  const sns = new AWS.SNS({
    endpoint: 'http://127.0.0.1:4002',
    region: 'ca-central-1',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey'
  })

  try {
    await sns.publish({
      Message: JSON.stringify(event),
      MessageStructure: 'json',
      TopicArn: 'arn:aws:sns:ca-central-1:123456789012:test-topic',
    }).promise()
  } catch (e) {
    console.log(e)
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Trigger sent!',
      input: event,
    }),
  }

  return response
}

trigger({
  'Records': [
    {
      's3': {
        'bucket': {
          'name': 'buckeet'
        },
        'object': {
          'key': 'c1e02804-1586-4a18-a6a6-2672c9217778',
          'versionId': 'edIKyc9.6We3rdeFRhXLO9hJesSaLDeD'
        }
      },
      'awsRegion': 'ca-central-1'
    }
  ]
})
