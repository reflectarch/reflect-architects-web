import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor, SanityContentBlock, SanityTextBlock, SanityImageBlock, SanityQuoteBlock, SanityGalleryBlock, SanityMapBlock, SanityVideoBlock, SanityTeamBlock, SanityTwoColumnBlock } from '@/lib/sanity';

// Dynamically import the InteractiveMap component to avoid SSR issues
const InteractiveMap = dynamic(() => import('./InteractiveMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-sm text-gray-500">Loading map...</div>
    </div>
  )
});

// Content Block Renderers
export function TextBlockRenderer({ block }: { block: SanityTextBlock }) {
  const portableTextComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-gray-700 leading-relaxed text-sm mb-4">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="text-2xl font-medium text-gray-900 mb-6 uppercase tracking-wide">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-xl font-medium text-gray-900 mb-4 uppercase tracking-wide">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-medium text-gray-900 mb-3 uppercase tracking-wide">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-base font-medium text-gray-900 mb-3 uppercase tracking-wide">{children}</h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-gray-300 pl-6 my-6 text-lg italic text-gray-800">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic">{children}</em>
      ),
      link: (props) => {
        const { children, value } = props;
        const href = value?.href || '#';
        return (
          <a 
            href={href} 
            className="text-gray-900 underline hover:text-gray-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 text-sm">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 text-sm">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="leading-relaxed">{children}</li>
      ),
      number: ({ children }) => (
        <li className="leading-relaxed">{children}</li>
      ),
    },
  };

  return (
    <div className="mb-6">
      <PortableText value={block.content} components={portableTextComponents} />
    </div>
  );
}

export function ImageBlockRenderer({ block }: { block: SanityImageBlock }) {
  const imageUrl = block.image ? urlFor(block.image).width(800).quality(90).url() : '';
  
  if (!imageUrl) return null;
  
  return (
    <div className="mb-6">
      <div className="relative w-full">
        <Image 
          src={imageUrl}
          alt={block.image.alt || 'Project image'} 
          width={800} 
          height={block.ratio ? 800 * block.ratio : 600}
          className="w-full h-auto object-cover" 
        />
      </div>
      {block.caption && (
        <p className="text-xs text-gray-500 uppercase tracking-wider mt-2 text-center">
          {block.caption}
        </p>
      )}
    </div>
  );
}

export function QuoteBlockRenderer({ block }: { block: SanityQuoteBlock }) {
  return (
    <div className="mb-8 py-6 border-l-2 border-gray-300 pl-6">
      <blockquote className="text-lg italic text-gray-800 mb-4">
        &ldquo;{block.quoteText}&rdquo;
      </blockquote>
      {(block.authorName || block.authorTitle) && (
        <div className="text-sm text-gray-600">
          {block.authorName && <div className="font-medium">{block.authorName}</div>}
          {block.authorTitle && <div>{block.authorTitle}</div>}
        </div>
      )}
    </div>
  );
}

export function GalleryBlockRenderer({ block }: { block: SanityGalleryBlock }) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {block.images.map((imageItem) => {
          const imageUrl = imageItem.image ? urlFor(imageItem.image).width(400).quality(90).url() : '';
          
          if (!imageUrl) return null;
          
          return (
            <div key={imageItem._key} className="relative">
              <Image 
                src={imageUrl}
                alt={imageItem.alt || 'Gallery image'} 
                width={400} 
                height={300}
                className="w-full h-auto object-cover" 
              />
              {imageItem.caption && (
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-2 text-center">
                  {imageItem.caption}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MapBlockRenderer({ block }: { block: SanityMapBlock }) {
  return (
    <div className="mb-8">
      <div className="space-y-4">
        {block.title && (
          <div className="text-sm text-gray-600 text-center">
            📍 {block.title}
          </div>
        )}
        <InteractiveMap
          latitude={block.latitude}
          longitude={block.longitude}
          title={block.title || 'Project Location'}
          className=""
        />
        <div className="text-xs text-gray-500 text-center">
          Lat: {block.latitude.toFixed(6)}, Lng: {block.longitude.toFixed(6)}
        </div>
      </div>
    </div>
  );
}

export function VideoBlockRenderer({ block }: { block: SanityVideoBlock }) {
  const isYouTube = block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be');
  const isVimeo = block.videoUrl.includes('vimeo.com');
  
  // Extract video ID for embed URLs
  let embedUrl = block.videoUrl;
  if (isYouTube) {
    const videoIdMatch = block.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      embedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
  } else if (isVimeo) {
    const videoIdMatch = block.videoUrl.match(/vimeo\.com\/(\d+)/);
    if (videoIdMatch) {
      embedUrl = `https://player.vimeo.com/video/${videoIdMatch[1]}`;
    }
  }

  return (
    <div className="mb-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          src={embedUrl}
          title="Video"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      {block.caption && (
        <p className="text-xs text-gray-500 uppercase tracking-wider mt-2 text-center">
          {block.caption}
        </p>
      )}
    </div>
  );
}

export function TeamBlockRenderer({ block }: { block: SanityTeamBlock }) {
  return (
    <div className="mb-8">
      {block.title && (
        <h3 className="text-lg font-medium text-gray-900 mb-6 uppercase tracking-wide">
          {block.title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {block.members.map((member) => {
          const imageUrl = member.image ? urlFor(member.image).width(300).quality(90).url() : '';
          
          return (
            <div key={member._key} className="text-center">
              {imageUrl ? (
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image 
                    src={imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">{member.name.charAt(0)}</span>
                </div>
              )}
              <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                {member.name}
              </h4>
              {member.role && (
                <p className="text-xs text-gray-600 uppercase tracking-wider mt-1">
                  {member.role}
                </p>
              )}
              {member.bio && (
                <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TwoColumnBlockRenderer({ block }: { block: SanityTwoColumnBlock }) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {block.leftColumn.map((subBlock, index) => (
            <ContentBlockRenderer key={subBlock._key || index} block={subBlock} />
          ))}
        </div>
        <div className="space-y-6">
          {block.rightColumn.map((subBlock, index) => (
            <ContentBlockRenderer key={subBlock._key || index} block={subBlock} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContentBlockRenderer({ block }: { block: SanityContentBlock }) {
  switch (block._type) {
    case 'textBlock':
      return <TextBlockRenderer block={block} />;
    case 'imageBlock':
      return <ImageBlockRenderer block={block} />;
    case 'quoteBlock':
      return <QuoteBlockRenderer block={block} />;
    case 'galleryBlock':
      return <GalleryBlockRenderer block={block} />;
    case 'mapBlock':
      return <MapBlockRenderer block={block} />;
    case 'videoBlock':
      return <VideoBlockRenderer block={block} />;
    case 'teamBlock':
      return <TeamBlockRenderer block={block} />;
    case 'twoColumnBlock':
      return <TwoColumnBlockRenderer block={block} />;
    default:
      return null;
  }
} 