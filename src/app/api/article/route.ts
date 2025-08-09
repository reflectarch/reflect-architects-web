import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/queries';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const language = searchParams.get('lang') || 'en';

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const article = await getArticleBySlug(slug, language);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error in GET /api/article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
