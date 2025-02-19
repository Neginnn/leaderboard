# Install dependencies only when needed
FROM node:18.17.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./ 
# RUN npm ci

# Rebuild the source code only when needed
FROM node:18.17.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

## This changes ownership of files so we can run the build as the node user or the nextjs user

RUN mkdir -p /app/.next && chown -R node:node /app/.next && chmod -R 775 /app/.next && adduser --system -u 1001 -G node nextjs

# If using npm comment out above and use below instead
# RUN npm run build

#### Disabling as we're doing just in time builds ######
# Production image, copy all the files and run next
#FROM node:16.14.2-alpine3.15 AS runner
#WORKDIR /app

# ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
#COPY --from=builder /app/public ./public
#COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/*.js ./
#COPY --from=builder /app/*.ts ./

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
#COPY --from=builder --chown=nextjs:nodejs /app/docker-entrypoint.sh ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

# These are the defaults, and should stay this way. Change as needed on the fly when running
# the image rather than changing these defaults. All configuration for k8s and ci/cd should
# be in config/*.json and secrets/*.json instead of in environment variables
# If you absolutely can't do without a new environment variable because of a weird dependency,
# then put it here so it's documented.

# Reads through config files in a specific order. For more information on that, see:
## https://github.com/node-config/node-config/wiki/Configuration-Files
# For how to support legacy .env files:
## https://github.com/node-config/node-config/wiki/Environment-Variables#custom-environment-variables

# The preferred way to inject local variables is by changing this variable: you can specify any local directory when
# running locally to allow you to flexibly edit environment variables:
# ENV NODE_CONFIG_DIR="/app/config:/app/secrets"

# Default shoud be info. Setting this to "debug" should do something useful for troubleshooting at the very least.
ENV LOG_LEVEL="info"

# This will be changed in k8s as needed. For e.g. in the production environment, it would be "production", in qa it would be "qa".
# This corresponds to the files in config/ and secrets/: when a given environment is specified in NODE_ENV, it will trigger using
# <ENV>.json from that directory. It will also be used by k8s when mounting the environment specific secrets.
ENV ENVIRONMENT="production"
ENV NODE_ENV="production"
ENV NODE_CONFIG_ENV="production"

# Use the stub to quickly turn on or off certain app specific features for testing
ENV STUB=""

ARG COMMIT_ID=""
ENV COMMIT_ID=$COMMIT_ID

ARG COMMIT_REF=""
ENV COMMIT_REF=$COMMIT_REF

ENTRYPOINT ["/app/docker-entrypoint.sh"]
