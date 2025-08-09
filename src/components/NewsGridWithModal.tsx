'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { SanityArticle } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
// Simple inline spinner for loading state

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NewsGridWithModal({
  articles,
  language,
}: {
  articles: SanityArticle[];
  language: string;
}) {
  const [view, setView] = useState<'grid' | 'detail'>('grid');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<SanityArticle | null>(null);

  const components: PortableTextComponents = useMemo(
    () => ({
      block: {
        normal: ({ children }) => (
          <p className="text-gray-700 leading-relaxed text-base mb-4">{children}</p>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-medium text-gray-900 mb-4 uppercase tracking-wide">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-medium text-gray-900 mb-3 uppercase tracking-wide">{children}</h3>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-gray-300 pl-6 my-6 text-lg italic text-gray-800">{children}</blockquote>
        ),
      },
      marks: {
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
          const href = value?.href ?? '#';
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
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
        ),
        number: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
        ),
      },
      listItem: {
        bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
        number: ({ children }) => <li className="leading-relaxed">{children}</li>,
      },
    }),
    []
  );

  const openArticle = useCallback(
    async (slug: string) => {
      try {
        setView('detail');
        setLoading(true);
        const res = await fetch(`/api/article?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(language)}`);
        if (!res.ok) throw new Error('Failed to load article');
        const data: SanityArticle = await res.json();
        setSelected(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [language]
  );

  const close = useCallback(() => {
    setView('grid');
    setSelected(null);
  }, []);

  return (
    <>
      {view === 'grid' && (
        <>
          {articles.length === 0 ? (
            <div className="mt-16 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-2">No Articles Found</h2>
              <p className="text-gray-600">News articles will appear here once they&apos;re added to your Sanity CMS.</p>
            </div>
          ) : (
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {article.featuredImage && (
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={urlFor(article.featuredImage).width(400).height(300).url()}
                        alt={article.featuredImage.alt || article.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                      {article.author && (
                        <>
                          <span className="mx-2">•</span>
                          <span>By {article.author}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h2>
                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between">
                      {article.category && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      )}
                      <button
                        onClick={() => openArticle(article.slug.current)}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {view === 'detail' && (
        <div className="max-w-3xl mx-auto mt-10">
          <div className="mb-6">
            <button onClick={close} className="text-sm text-gray-600 hover:text-gray-900">← Back to News</button>
          </div>
          {loading && (
            <div className="p-12 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700" aria-label="Loading" />
            </div>
          )}
          {!loading && selected && (
            <div className="p-0">
              <header className="mb-6">
                <h1 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wide">
                  {selected.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 gap-x-3 gap-y-2">
                  <time dateTime={selected.publishedAt}>{formatDate(selected.publishedAt)}</time>
                  {selected.author && (
                    <>
                      <span>•</span>
                      <span>By {selected.author}</span>
                    </>
                  )}
                  {selected.category && (
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                      {selected.category}
                    </span>
                  )}
                </div>
                {selected.excerpt && (
                  <p className="mt-4 text-gray-700 text-base">{selected.excerpt}</p>
                )}
              </header>

              {selected.featuredImage && (
                <div className="w-full mb-8">
                  <Image
                    src={urlFor(selected.featuredImage).width(1200).quality(90).url()}
                    alt={selected.featuredImage.alt || selected.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto rounded-md object-cover"
                  />
                </div>
              )}

              <article className="prose prose-gray max-w-none">
                <PortableText value={selected.content} components={components} />
              </article>
            </div>
          )}
        </div>
      )}
    </>
  );
}
