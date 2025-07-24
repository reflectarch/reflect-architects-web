import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getAllArticles } from '@/lib/queries';
import { urlFor, SanityArticle } from '@/lib/sanity';

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Portable Text components for rendering content
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-light text-gray-900 mb-3 tracking-wide">{children}</h2>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a 
        href={value.href} 
        className="text-gray-900 hover:text-gray-600 underline"
        target={value.href?.startsWith('http') ? '_blank' : undefined}
        rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
};

export default async function News() {
  // Fetch articles from Sanity
  const articles = await getAllArticles();

  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-8 tracking-wide">
            NEWS & INSIGHTS
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest projects, architectural insights, 
            and industry developments. Discover the stories behind our designs 
            and our vision for the future of architecture.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="mt-16 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-2">No Articles Found</h2>
            <p className="text-gray-600">News articles will appear here once they're added to your Sanity CMS.</p>
          </div>
        ) : (
          <div className="mt-16 space-y-12">
            {articles.map((article) => (
              <article key={article._id} className="border-b border-gray-200 pb-12 last:border-b-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    {article.featuredImage?.asset?._ref ? (
                      <div className="aspect-video relative overflow-hidden bg-gray-200 rounded-sm">
                        <Image
                          src={urlFor(article.featuredImage).width(600).height(400).url()}
                          alt={article.featuredImage.alt || article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-200 aspect-video rounded-sm"></div>
                    )}
                  </div>
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-4 mb-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {formatDate(article.publishedAt)}
                      </p>
                      {article.category && (
                        <>
                          <span className="text-gray-300">•</span>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            {article.category}
                          </p>
                        </>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
                      {article.title}
                    </h2>
                    
                    {article.excerpt ? (
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                    ) : (
                      <div className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        <PortableText 
                          value={article.content.slice(0, 2)} 
                          components={portableTextComponents}
                        />
                      </div>
                    )}
                    
                    {article.author && (
                      <p className="text-sm text-gray-500 mb-4">
                        By {article.author}
                      </p>
                    )}
                    
                    <button className="text-sm text-gray-900 hover:text-gray-600 uppercase tracking-wide font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 