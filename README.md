# Serverless Template



```bash
npm i

SLS_DEBUG=* ./node_modules/.bin/serverless deploy --verbose --force --stage="api" --aws-profile=default

```

## TODO
- test for cache
- test for compression
- proper health endpoint (RFC)
- ssm param store
- cache invalidation example
- ex of applying env to lambda
- ex how to cleanly apply IAM policy to each lambda
- on commit hooks
- on commit linting