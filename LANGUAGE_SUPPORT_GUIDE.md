# Language Support Integration Guide

## Overview

Your Reflect Architects website now has full language support integration with Sanity CMS! The language toggle component dynamically queries content based on the selected language using Sanity's translation system.

## ✅ What's Implemented

### 1. Language-Aware CMS Queries

All Sanity queries now filter content by language:

```typescript
// Projects filtered by language
*[_type == "project" && language == $language] | order(date desc)

// Articles filtered by language  
*[_type == "article" && language == $language] | order(publishedAt desc)
```

### 2. Translation Metadata Support

Queries include translation metadata to find related content in other languages:

```typescript
"_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
  _id,
  title,
  slug,
  language
}
```

### 3. Updated Data Fetching Functions

All query functions now accept a language parameter:

```typescript
// Get projects for specific language
const projects = await getAllProjects('en'); // or 'az'

// Get articles for specific language  
const articles = await getAllArticles('az');

// Get single document by slug and language
const project = await getProjectBySlug('project-slug', 'en');
```

### 4. Automatic Language Detection

Pages automatically detect the current locale and fetch appropriate content:

```typescript
// In page components
const locale = await getLocale(); // Gets current language from cookie
const projects = await getAllProjects(locale);
```

## 🚀 Next Steps: Setting Up Content in Sanity

### 1. Add Language Field to Schemas

In your Sanity Studio, add a language field to your document schemas:

```javascript
// In your project schema
{
  name: 'language',
  title: 'Language',
  type: 'string',
  initialValue: 'en',
  options: {
    list: [
      {title: 'English', value: 'en'},
      {title: 'Azerbaijani', value: 'az'}
    ]
  },
  validation: Rule => Rule.required()
}
```

### 2. Add Translation Metadata Schema

Create a translation metadata document type:

```javascript
// translation-metadata.js
export default {
  name: 'translation.metadata',
  type: 'document',
  title: 'Translation Metadata',
  fields: [
    {
      name: 'translations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'reference',
              to: [
                {type: 'project'},
                {type: 'article'}
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### 3. Create Content in Both Languages

For each project/article:

1. **Create English Version**:
   - Set `language` field to `'en'`
   - Fill in all content in English

2. **Create Azerbaijani Version**:
   - Set `language` field to `'az'`  
   - Fill in all content in Azerbaijani
   - Use the same `slug` structure but with language-appropriate text

3. **Link Translations** (Optional):
   - Create a `translation.metadata` document
   - Add both language versions to the `translations` array
   - This enables translation switching functionality

## 🎯 How Language Switching Works

### 1. User Clicks Language Toggle

- LanguageToggle component sets locale cookie
- Page reloads to apply new language

### 2. Next.js Detects Language

- `next-intl` reads locale from cookie
- Pages get locale via `getLocale()`

### 3. CMS Queries Filter by Language

- `getAllProjects(locale)` fetches only content in selected language
- `getAllArticles(locale)` fetches only articles in selected language

### 4. Content Updates Automatically

- Projects page shows projects in new language
- News page shows articles in new language
- All text uses translated messages from `messages/[locale].json`

## 🛠️ Helper Functions Available

```typescript
// Check available languages for a document
const languages = getAvailableLanguages(project._translations);

// Get specific translation
const translation = getTranslationByLanguage(project._translations, 'az');

// Check if content exists in language
const hasContent = await hasContentInLanguage('project', 'az');
```

## 📝 Content Strategy Recommendations

### Option 1: Duplicate Content
- Create separate documents for each language
- Simpler to manage
- Each document has its own URL structure

### Option 2: Linked Translations
- Use translation metadata to link related documents
- Enables language switching for same content
- More complex but provides better UX

### Option 3: Hybrid Approach
- Critical content (projects) with full translations
- General content (news) language-specific
- Balanced complexity and maintenance

## 🔧 Troubleshooting

### No Content Showing After Language Switch?

1. **Check Sanity Studio**: Ensure content exists with correct `language` field
2. **Verify Language Value**: Must be exactly `'en'` or `'az'`
3. **Check Console**: Look for any GROQ query errors

### Language Toggle Not Working?

1. **Check Cookie**: Language should be stored in `locale` cookie  
2. **Verify Reload**: Page should reload after language change
3. **Check next-intl Config**: Ensure `src/i18n/request.ts` is configured correctly

### Content Mixed Languages?

1. **Verify Queries**: Each query should include `&& language == $language`
2. **Check Data**: Ensure `language` field is set on all documents
3. **Fallback Logic**: Add fallback to default language if needed

## 🚀 Advanced Features to Consider

### 1. Language Fallback
Add fallback logic for missing translations:

```typescript
export async function getAllProjectsWithFallback(language: string = 'en'): Promise<SanityProject[]> {
  let projects = await getAllProjects(language);
  
  // If no content in requested language, fallback to English
  if (projects.length === 0 && language !== 'en') {
    projects = await getAllProjects('en');
  }
  
  return projects;
}
```

### 2. Translation Status Indicators
Show which content has translations available:

```typescript
// In component
const availableLanguages = getAvailableLanguages(project._translations);
const hasAzerbaijaniTranslation = availableLanguages.includes('az');
```

### 3. SEO Optimization
- Use `hreflang` tags for translated content
- Implement language-specific sitemaps
- Add structured data with language information

## 🎉 Your Website is Now Multilingual!

The language toggle now dynamically queries your Sanity CMS based on the selected language. Users can switch between English and Azerbaijani to see content in their preferred language.

Next steps:
1. Add content to Sanity Studio with proper language fields
2. Test the language switching functionality
3. Consider implementing the advanced features mentioned above

Happy building! 🏗️ 