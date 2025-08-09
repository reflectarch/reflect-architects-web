# Sanity News Setup Guide

## Overview
Your news page is now connected to Sanity CMS! This guide will help you complete the setup.

## ✅ What's Already Done

1. **Frontend Code**: Your Next.js app is already configured to fetch and display articles from Sanity
2. **TypeScript Types**: Added `SanityArticle` interface in `src/lib/sanity.ts`
3. **GROQ Queries**: Added article queries in `src/lib/queries.ts` 
4. **News Page**: Updated `src/app/news/page.tsx` to display articles dynamically

## 🚀 Next Steps

### 1. Add Article Schema to Sanity Studio

You need to add the article document type to your Sanity Studio configuration:

1. **Copy the schema**: Use the `sanity-schema-article.js` file created in this project
2. **Add to your Sanity Studio**: 
   - If you have a separate Sanity Studio project, copy the schema to your `schemas` folder
   - Add it to your `sanity.config.js` or `sanity.config.ts` file:

```javascript
import {defineConfig} from 'sanity'
import article from './schemas/article' // Your article schema
import project from './schemas/project' // Your existing project schema

export default defineConfig({
  // ... your config
  schema: {
    types: [
      project,  // existing
      article,  // new article schema
    ],
  },
})
```

### 2. Deploy Schema Changes

After adding the schema:
1. Deploy your Sanity Studio
2. The "Article" document type will appear in your Studio interface

### 3. Create Your First Articles

In Sanity Studio, you can now:
1. Click "Create" → "Article"
2. Fill in the required fields:
   - **Title**: Article headline
   - **Slug**: Auto-generated from title (for URLs)
   - **Published At**: Publication date
   - **Content**: Rich text content using the editor
3. Optional fields:
   - **Excerpt**: Short description
   - **Featured Image**: Hero image for the article
   - **Author**: Author name
   - **Category**: Article category

### 4. View Your Articles

Once you've created articles in Sanity:
1. They'll automatically appear on your `/news` page
2. Articles are ordered by publication date (newest first)
3. Images are automatically optimized and served from Sanity's CDN

## 📝 Article Schema Features

The article schema includes:

- **Rich Text Editor**: Full formatting with headings, lists, links, and inline images
- **Featured Images**: With automatic hotspot cropping and alt text
- **SEO-Friendly**: Slugs, excerpts, and structured metadata
- **Categories**: Pre-defined options for organizing content
- **Publication Dates**: Full datetime control
- **Author Attribution**: Optional author field

## 🎨 Customization Options

### Adding More Categories
Edit the schema file to add more category options:

```javascript
{
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: [
      {title: 'Your Category', value: 'your-category'},
      // ... existing categories
    ]
  }
}
```

### Styling Adjustments
The news page styling can be customized in `src/app/news/page.tsx`:
- Modify the `portableTextComponents` for content rendering
- Update Tailwind classes for layout and typography
- Adjust the article grid layout

## 🔧 Technical Details

### Environment Variables
Make sure these are set in your `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=pg7qj6xh
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### GROQ Queries
The app uses these queries:
- `getAllArticles()`: Fetches all published articles
- `getArticleBySlug()`: Fetches a single article (for future detail pages)

### Image Handling
Images are automatically optimized using:
- Sanity's built-in image CDN
- Next.js Image component
- Responsive sizing and formats

## 🐛 Troubleshooting

**No articles showing?**
1. Check that the article schema is deployed to Sanity Studio
2. Verify you've created and published articles
3. Check browser console for any errors

**Images not loading?**
1. Verify `cdn.sanity.io` is in your `next.config.ts` domains
2. Check that images have been uploaded in Sanity Studio

**Schema errors?**
1. Make sure the article schema exactly matches the provided version
2. Restart your Sanity Studio after schema changes

## 📞 Support

If you need help with:
- Sanity Studio setup
- Schema customization  
- Content management workflows

Feel free to ask for assistance! 