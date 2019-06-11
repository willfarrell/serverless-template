const middy = require('middy')
const {
  // cache,
  doNotWaitForEmptyEventLoop,
  urlEncodeBodyParser,
  jsonBodyParser,
  cors,
  httpErrorHandler,
  httpEventNormalizer,
  httpHeaderNormalizer,
  httpContentNegotiation,
  httpSecurityHeaders,
  validator,
  warmup
} = require('middy/middlewares')

/*
const middy = require('@middy/core')
const cache = require('@middy/cache')
const doNotWaitForEmptyEventLoop = require('@middy/do-not-wait-for-empty-event-loop')
const errorLogger = require('@middy/error-logger')
const functionShield = require('@middy/function-shield')
const httpContentNegotiation = require('@middy/http-content-negotiation')
const httpCors = require('@middy/http-cors')
const httpErrorHandler = require('@middy//http-error-handler')
const httpEventNormalizer = require('@middy/http-event-normalizer')
const httpHeaderNormalizer = require('@middy/http-header-normalizer')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpSecurityHeaders = require('@middy/http-security-headers')
const httpUrlEncodeBodyParser = require('@middy/http-urlencode-body-parser')
const ssm = require('@middy/ssm')
const validator = require('@middy/validator')
const warmup = require('@middy/warmup')
*/

const ajvOptions = {
  v5: true,
  format: 'full',
  coerceTypes: 'array',
  allErrors: true,
  useDefaults: true,
  $data: true
}

/*const meta = require('../../package.json')
const response = {
  jsonapi: { version: '1.0' },
  meta: {
    version: `v${meta.version}`, // Include from package.json
    copyright: meta.copyright, // Include from package.json
    authors: meta.authors, // Include from package.json
    now: new Date().toISOString() // request timestamp in ISO format ("2015-06-11T22:27:42.668Z")
  }
}*/

module.exports = (app, { inputSchema, outputSchema, accessRole }) =>
  middy(app)
    .use(doNotWaitForEmptyEventLoop())  // catch any global DB comms
    //.use(ssm()) // if DB vars in ssm
    //.use(database())
    //.use(knex())
    .use(warmup())
    .use(
      functionShield({
        token: 'null',
        disable_analytics: true
      })
    )

    .use(httpEventNormalizer())
    .use(httpHeaderNormalizer())
    .use(urlEncodeBodyParser())
    .use(jsonBodyParser())

    .use(cors())
    .use(httpSecurityHeaders())
    //.use(jsonapi({ response }))
    .use(
      httpContentNegotiation({
        availableLanguages: ['en-CA', 'fr-CA'],
        availableMediaTypes: ['application/vnd.api+json']
      })
    )
    //.use(ssm())
    //.use(authorization({ accessRole }))
    .use(validator({ inputSchema, outputSchema, ajvOptions }))
    .use(httpErrorHandler())
