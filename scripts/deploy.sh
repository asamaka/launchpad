#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${1:-}"
SCOPE="${VERCEL_SCOPE:-asamaks-projects}"
VTOKEN="${VERCEL_TOKEN:-$(printenv 'Vercel token' 2>/dev/null || true)}"

if [[ -z "$APP_DIR" ]]; then
  echo "Usage: $0 /path/to/app" >&2
  exit 1
fi

if [[ ! -d "$APP_DIR" ]]; then
  echo "App directory not found: $APP_DIR" >&2
  exit 1
fi

if [[ -z "$VTOKEN" ]]; then
  echo "Vercel token not found in VERCEL_TOKEN or 'Vercel token' env vars" >&2
  exit 1
fi

if ! command -v vercel >/dev/null 2>&1; then
  npm install -g vercel
fi

vercel --cwd "$APP_DIR" --token "$VTOKEN" --scope "$SCOPE" --yes --prod
