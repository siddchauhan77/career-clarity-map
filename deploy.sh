#!/bin/bash
set -e
echo "→ Building..."
npm run build
echo "→ Creating GitHub repo..."
gh repo create career-clarity-map --public --source=. --push --description "Career Clarity Map — role intelligence system"
echo "→ Deploying to Vercel..."
npx vercel --prod --yes
echo "✓ Done. Your site is live."
