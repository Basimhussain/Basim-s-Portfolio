# Basim Hussain, portfolio

Single-page portfolio, projects first, built with Next.js 14 (pages router), TypeScript and Tailwind CSS. All content lives in `src/pages/index.tsx` and follows the current CV.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` makes a production build.

## Updating content

Roles, projects and skills are plain arrays at the top of `src/pages/index.tsx`. The downloadable CV is `public/Basim_Hussain_CV.pdf`, so replace that file when the CV changes.

## Deploy

Hosted on Vercel, deploys from the `main` branch.
