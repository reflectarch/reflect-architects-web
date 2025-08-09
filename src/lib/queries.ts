import { client, SanityProject, SanityArticle, SanityTranslation } from './sanity';

// Language-aware GROQ queries
export const projectsQuery = `
  *[_type == "project" && language == $language] | order(date desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    date,
    location,
    client,
    typology,
    status,
    size,
    language,
    heroImage {
      _type,
      asset {
        _ref,
        _type
      },
      alt
    },
    iconSvg {
      _type,
      asset {
        _ref,
        _type
      }
    },
    // Get the translations metadata
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      _id,
      title,
      slug,
      language
    },
    contentBlocks[] {
      _type,
      _key,
      // Text block fields
      content[] {
        _type,
        _key,
        children[] {
          _type,
          text,
          marks[]
        },
        markDefs[] {
          _type,
          _key,
          href
        },
        style
      },
      // Image block fields
      image {
        _type,
        asset {
          _ref,
          _type
        },
        alt
      },
      ratio,
      caption,
      // Quote block fields
      quoteText,
      authorName,
      authorTitle,
      // Gallery block fields
      images[] {
        _key,
        image {
          _type,
          asset {
            _ref,
            _type
          }
        },
        alt,
        caption
      },
      // Map block fields
      latitude,
      longitude,
      title,
      // Video block fields
      videoUrl,
      thumbnail {
        _type,
        asset {
          _ref,
          _type
        },
        alt
      },
      // Team block fields
      members[] {
        _key,
        name,
        role,
        image {
          _type,
          asset {
            _ref,
            _type
          }
        },
        bio
      },
      // Two column block fields
      leftColumn[] {
        _type,
        _key,
        content[] {
          _type,
          _key,
          children[] {
            _type,
            text,
            marks[]
          },
          markDefs[] {
            _type,
            _key,
            href
          },
          style
        },
        image {
          _type,
          asset {
            _ref,
            _type
          },
          alt
        },
        ratio,
        caption,
        quoteText,
        authorName,
        authorTitle
      },
      rightColumn[] {
        _type,
        _key,
        content[] {
          _type,
          _key,
          children[] {
            _type,
            text,
            marks[]
          },
          markDefs[] {
            _type,
            _key,
            href
          },
          style
        },
        image {
          _type,
          asset {
            _ref,
            _type
          },
          alt
        },
        ratio,
        caption,
        quoteText,
        authorName,
        authorTitle
      }
    }
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug && language == $language][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    date,
    location,
    client,
    typology,
    status,
    size,
    language,
    heroImage {
      _type,
      asset {
        _ref,
        _type
      },
      alt
    },
    iconSvg {
      _type,
      asset {
        _ref,
        _type
      }
    },
    // Get the translations metadata
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      _id,
      title,
      slug,
      language
    },
    contentBlocks[] {
      _type,
      _key,
      // Text block fields
      content[] {
        _type,
        _key,
        children[] {
          _type,
          text,
          marks[]
        },
        markDefs[] {
          _type,
          _key,
          href
        },
        style
      },
      // Image block fields
      image {
        _type,
        asset {
          _ref,
          _type
        },
        alt
      },
      ratio,
      caption,
      // Quote block fields
      quoteText,
      authorName,
      authorTitle,
      // Gallery block fields
      images[] {
        _key,
        image {
          _type,
          asset {
            _ref,
            _type
          }
        },
        alt,
        caption
      },
      // Map block fields
      latitude,
      longitude,
      title,
      // Video block fields
      videoUrl,
      thumbnail {
        _type,
        asset {
          _ref,
          _type
        },
        alt
      },
      // Team block fields
      members[] {
        _key,
        name,
        role,
        image {
          _type,
          asset {
            _ref,
            _type
          }
        },
        bio
      },
      // Two column block fields
      leftColumn[] {
        _type,
        _key,
        content[] {
          _type,
          _key,
          children[] {
            _type,
            text,
            marks[]
          },
          markDefs[] {
            _type,
            _key,
            href
          },
          style
        },
        image {
          _type,
          asset {
            _ref,
            _type
          },
          alt
        },
        ratio,
        caption,
        quoteText,
        authorName,
        authorTitle
      },
      rightColumn[] {
        _type,
        _key,
        content[] {
          _type,
          _key,
          children[] {
            _type,
            text,
            marks[]
          },
          markDefs[] {
            _type,
            _key,
            href
          },
          style
        },
        image {
          _type,
          asset {
            _ref,
            _type
          },
          alt
        },
        ratio,
        caption,
        quoteText,
        authorName,
        authorTitle
      }
    }
  }
`;

// Language-aware data fetching functions
export async function getAllProjects(language: string = 'en'): Promise<SanityProject[]> {
  try {
    const projects = await client.fetch(projectsQuery, { language });
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string, language: string = 'en'): Promise<SanityProject | null> {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug, language });
    return project || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

// Language-aware article queries
export const articlesQuery = `
  *[_type == "article" && language == $language] | order(publishedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    language,
    featuredImage {
      _type,
      asset {
        _ref,
        _type
      },
      alt
    },
    // Get the translations metadata
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      _id,
      title,
      slug,
      language
    },
    content[] {
      _type,
      _key,
      children[] {
        _type,
        text,
        marks[]
      },
      markDefs[] {
        _type,
        _key,
        href
      },
      style
    },
    author,
    category
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug && language == $language][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    language,
    featuredImage {
      _type,
      asset {
        _ref,
        _type
      },
      alt
    },
    // Get the translations metadata
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      _id,
      title,
      slug,
      language
    },
    content[] {
      _type,
      _key,
      children[] {
        _type,
        text,
        marks[]
      },
      markDefs[] {
        _type,
        _key,
        href
      },
      style
    },
    author,
    category
  }
`;

// Language-aware article data fetching functions
export async function getAllArticles(language: string = 'en'): Promise<SanityArticle[]> {
  try {
    const articles = await client.fetch(articlesQuery, { language });
    return articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string, language: string = 'en'): Promise<SanityArticle | null> {
  try {
    const article = await client.fetch(articleBySlugQuery, { slug, language });
    return article || null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

// Helper function to transform Sanity project to frontend project
export function transformSanityProject(sanityProject: SanityProject) {
  return {
    id: sanityProject._id.replace('drafts.', ''), // Remove drafts prefix if present
    title: sanityProject.title,
    slug: sanityProject.slug.current,
    date: sanityProject.date,
    location: sanityProject.location,
    client: sanityProject.client,
    typology: sanityProject.typology,
    status: sanityProject.status,
    size: sanityProject.size,
    heroImage: {
      url: sanityProject.heroImage,
      alt: sanityProject.heroImage.alt || sanityProject.title
    },
    iconSvgUrl: sanityProject.iconSvg,
    contentBlocks: sanityProject.contentBlocks || []
  };
}

// Helper function to get available languages for a document  
export function getAvailableLanguages(translations?: SanityTranslation[]): string[] {
  if (!translations || translations.length === 0) {
    return [];
  }
  return translations.map(translation => translation.language).filter(Boolean);
}

// Helper function to get translation by language
export function getTranslationByLanguage(translations: SanityTranslation[] = [], targetLanguage: string) {
  return translations.find(translation => translation.language === targetLanguage);
}

// Helper function to check if content exists in specific language
export async function hasContentInLanguage(documentType: 'project' | 'article', language: string): Promise<boolean> {
  try {
    const query = `count(*[_type == "${documentType}" && language == $language])`;
    const count = await client.fetch(query, { language });
    return count > 0;
  } catch (error) {
    console.error(`Error checking content for language ${language}:`, error);
    return false;
  }
} 