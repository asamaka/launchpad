# launchpad

Launchpad is a Vercel-ready home base for future Cursor Cloud Agents. It includes:

- auto-loaded Cursor rules under `.cursor/rules/`
- a reusable Next.js starter in `templates/nextjs/`
- an `apps/` directory for generated apps
- a deployment helper script in `scripts/deploy.sh`

## Repository layout

```
.cursor/rules/
templates/nextjs/
apps/
scripts/deploy.sh
```

## Template workflow

To start from the template locally:

```bash
cp -r templates/nextjs /tmp/my-app
cd /tmp/my-app
npm install
npm run build
```

## Vercel deployment

Use the included script after setting a Vercel token:

```bash
./scripts/deploy.sh /path/to/app
```
