# Figurestand Proxy

A Cloudflare Worker proxy to `figurestand.workerlo.workers.dev`.

## Setup

1. Create a Cloudflare account at https://dash.cloudflare.com
2. Go to **My Profile → API Tokens** and create a token with "Workers Scripts: Edit" permission
3. Go to your GitHub repo → **Settings → Secrets and variables → Actions** → New repository secret
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: the token from step 2
4. Push to `main` — the worker deploys automatically

## Manual deploy

```bash
npm install
npx wrangler login
npm run deploy
```
