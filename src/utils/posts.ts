import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'memorias'>;

export async function getPublishedMemorias(): Promise<Post[]> {
  const all = await getCollection('memorias');
  return all
    .filter((post) => post.data.published !== false)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function postUrl(post: Post): string {
  return `/memorias/${post.data.slug}`;
}
