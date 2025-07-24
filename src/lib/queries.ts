import { client, SanityProject, SanityArticle } from './sanity';

// GROQ queries
export const projectsQuery = `
  *[_type == "project"] | order(date desc) {
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
  *[_type == "project" && slug.current == $slug][0] {
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

// Data fetching functions
export async function getAllProjects(): Promise<SanityProject[]> {
  try {
    const projects = await client.fetch(projectsQuery);
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug });
    return project || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

// Article queries
export const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    featuredImage {
      _type,
      asset {
        _ref,
        _type
      },
      alt
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
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    featuredImage {
      _type,
      asset {
        _ref,
        _type
      },
      alt
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

// Article data fetching functions
export async function getAllArticles(): Promise<SanityArticle[]> {
  try {
    const articles = await client.fetch(articlesQuery);
    return articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  try {
    const article = await client.fetch(articleBySlugQuery, { slug });
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