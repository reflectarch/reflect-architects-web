import { getAllArticles } from '@/lib/queries';
import { getLocale } from 'next-intl/server';
import NewsGridWithModal from '@/components/NewsGridWithModal';



export default async function News() {
  // Get current locale for language-specific content
  const locale = await getLocale();
  
  // Fetch articles from Sanity for the current language
  const articles = await getAllArticles(locale);

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

        <NewsGridWithModal articles={articles} language={locale} />
      </div>
    </div>
  );
} 