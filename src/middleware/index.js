const middy = require('middy')
const {
  // cache,
  doNotWaitForEmptyEventLoop,
  urlEncodeBodyParser,
  jsonBodyParser,
  cors,
  functionShield,
  httpErrorHandler,
  httpEventNormalizer,
  httpHeaderNormalizer,
  httpContentNegotiation,
  httpSecurityHeaders,
  validator,
  warmup
} = require('middy/middlewares')

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
    .use(warmup())
    .use(
      functionShield({
        policy: { disable_analytics: true }
      })
    )
    .use(doNotWaitForEmptyEventLoop())
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

    //.use(authorization({ accessRole }))
    .use(validator({ inputSchema, outputSchema, ajvOptions }))
    .use(httpErrorHandler())
