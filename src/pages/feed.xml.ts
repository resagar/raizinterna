import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedMemorias, postUrl } from '../utils/posts';

export async function GET(context: APIContext) {
  const memorias = (await getPublishedMemorias()).slice(0, 10);

  return rss({
    title: 'Raíz Interna',
    description:
      'Memorias de criar y pensar en voz alta. Historias de un padre neurodivergente (TDAH + AACC) sobre la crianza, la escritura y la vida en bruto.',
    site: context.site!,
    customData:
      '<language>es-ES</language>' +
      '<managingEditor>rsamuelgarcia@gmail.com (René Garcia)</managingEditor>' +
      '<webMaster>rsamuelgarcia@gmail.com (René Garcia)</webMaster>',
    items: memorias.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.summary ?? '',
      link: new URL(postUrl(post), context.site).toString(),
      categories: [post.data.category],
      author: 'rsamuelgarcia@gmail.com (René Garcia)',
    })),
    stylesheet: false,
  });
}
