# Project Cleanup Report

## Completed Cleanup Operations

✅ Removed legacy config files:

- tsconfig (duplicate)
- tsconfig.node.json (unused)

✅ Deleted unused HTML templates:

- detail2blog.html
- detailblog.html
- webdatasample.html

✅ Server-side cleanup:

- Removed Blog.js (JS duplicate)
- Deleted crawler service & scripts:
  - server/src/services/crawler.service.ts
  - server/services/crawler.ts
  - server/src/scripts/runCrawler.\*

✅ Removed unused screenshot:

- src/assets/images/screenshot-20250127-112755.png

## Current Project Structure

Key preserved components:

- All TypeScript models (Blog.ts, User.ts)
- Core server configuration
- Active image assets used in components
- Vercel deployment configuration

## Verification

## Pending Cleanup Tasks

1. Dependency Removal:

   - redis@4.7.0 (main package.json)
   - node-cron@3.0.0 (main package.json)
   - playwright@1.50.0 (server package.json)

2. File Deletions:

   - server/src/models/Post.ts
   - server/src/scripts/runCrawler.ts
   - server/src/routes/posts.ts

3. Image Optimization:
   - Remove duplicate assets:
     - src/assets/images/shopee1-3.png
     - src/assets/images/coffeestyle1-2.png

::: tip Mode Switch Required
Switch to Code mode to execute these changes
:::

No remaining references found to deleted files in:

- Server routes
- Client components
- Package.json dependencies
