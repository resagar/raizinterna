const WORDS_PER_MINUTE_SPANISH = 200;

export function readingTimeMinutes(body: string | undefined): number {
  if (!body) return 1;
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~`\-]{1,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE_SPANISH));
}

export function readingTimeISO(minutes: number): string {
  return `PT${minutes}M`;
}
