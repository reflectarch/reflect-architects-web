import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getArticleBySlug } from '@/lib/queries';
import { urlFor } from '@/lib/sanity';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return notFound();
  }

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-gray-700 leading-relaxed text-base mb-4">{children}</p>
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
  };

  const featuredImageUrl = article.featuredImage
    ? urlFor(article.featuredImage).width(1200).height(630).quality(90).url()
    : '';

  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/news" className="text-sm text-gray-600 hover:text-gray-900">← Back to News</Link>

        <header className="mt-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wide">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 gap-x-3 gap-y-2">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.author && (
              <>
                <span>•</span>
                <span>By {article.author}</span>
              </>
            )}
            {article.category && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                {article.category}
              </span>
            )}
          </div>
          {article.excerpt && (
            <p className="mt-4 text-gray-700 text-base">{article.excerpt}</p>
          )}
        </header>

        {featuredImageUrl && (
          <div className="w-full mb-8">
            <Image
              src={featuredImageUrl}
              alt={article.featuredImage?.alt || article.title}
              width={1200}
              height={630}
              className="w-full h-auto rounded-md object-cover"
              priority
            />
          </div>
        )}

        <article className="prose prose-gray max-w-none">
          <PortableText value={article.content} components={components} />
        </article>
      </div>
    </div>
  );
}
