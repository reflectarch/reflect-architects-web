import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity configuration for read operations
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pg7qj6xh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Use CDN for read operations
});

// Sanity configuration for write operations (server-side only)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pg7qj6xh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Don't use CDN for write operations
  token: process.env.SANITY_API_TOKEN, // Server-side only token for write operations
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Types for Sanity data (matching our content blocks)
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// Content Block Types (matching Sanity schema)
interface BaseContentBlock {
  _type: string;
  _key: string;
}

export interface SanityTextBlock extends BaseContentBlock {
  _type: 'textBlock';
  content: Array<{
    _type: 'block';
    _key: string;
    children: Array<{
      _type: 'span';
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _type: string;
      _key: string;
      href?: string;
    }>;
    style?: string;
  }>;
}

export interface SanityImageBlock extends BaseContentBlock {
  _type: 'imageBlock';
  image: SanityImage;
  ratio?: number;
  caption?: string;
}

export interface SanityQuoteBlock extends BaseContentBlock {
  _type: 'quoteBlock';
  quoteText: string;
  authorName?: string;
  authorTitle?: string;
}

export interface SanityGalleryBlock extends BaseContentBlock {
  _type: 'galleryBlock';
  images: Array<{
    _key: string;
    image?: SanityImage;
    alt: string;
    caption?: string;
  }>;
}

export interface SanityMapBlock extends BaseContentBlock {
  _type: 'mapBlock';
  latitude: number;
  longitude: number;
  title?: string;
}

export interface SanityVideoBlock extends BaseContentBlock {
  _type: 'videoBlock';
  videoUrl: string;
  caption?: string;
  thumbnail?: SanityImage;
}

export interface SanityTeamBlock extends BaseContentBlock {
  _type: 'teamBlock';
  title?: string;
  members: Array<{
    _key: string;
    name: string;
    role?: string;
    image?: SanityImage;
    bio?: string;
  }>;
}

export interface SanityTwoColumnBlock extends BaseContentBlock {
  _type: 'twoColumnBlock';
  leftColumn: SanityContentBlock[];
  rightColumn: SanityContentBlock[];
}

export type SanityContentBlock = 
  | SanityTextBlock 
  | SanityImageBlock 
  | SanityQuoteBlock 
  | SanityGalleryBlock 
  | SanityMapBlock
  | SanityVideoBlock
  | SanityTeamBlock
  | SanityTwoColumnBlock;

// Translation reference interface
export interface SanityTranslation {
  _id: string;
  title: string;
  slug: SanitySlug;
  language: string;
}

// Project type from Sanity
export interface SanityProject {
  _id: string;
  _type: 'project';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  date: string;
  location: string;
  client: string;
  typology: string;
  status: string;
  size?: string;
  language: string;
  heroImage: SanityImage;
  iconSvg?: SanityImage;
  contentBlocks?: SanityContentBlock[];
  _translations?: SanityTranslation[];
}

// Article type from Sanity  
export interface SanityArticle {
  _id: string;
  _type: 'article';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt?: string;
  language: string;
  featuredImage?: SanityImage;
  content: Array<{
    _type: 'block';
    _key: string;
    children: Array<{
      _type: 'span';
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _type: string;
      _key: string;
      href?: string;
    }>;
    style?: string;
  }>;
  author?: string;
  category?: string;
  _translations?: SanityTranslation[];
}

// Consultation Request type from Sanity
export interface SanityConsultationRequest {
  _id: string;
  _type: 'consultationRequest';
  _createdAt: string;
  _updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  projectType?: 'residential' | 'commercial' | 'renovation' | 'interior' | 'other';
  message: string;
  submittedAt: string;
  status: 'new' | 'in-review' | 'contacted' | 'scheduled' | 'completed' | 'archived';
}

// Contact Request type from Sanity
export interface SanityContactRequest {
  _id: string;
  _type: 'contactRequest';
  _createdAt: string;
  _updatedAt: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'in-progress' | 'replied' | 'resolved' | 'archived';
} 