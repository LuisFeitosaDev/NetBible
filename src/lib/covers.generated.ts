// Gerado por scripts/build-covers.mjs — não edite à mão.
export const COVER_SLUGS: ReadonlySet<string> = new Set(["1cr","1pe","1rs","1sm","2cr","2pe","2rs","2sm","am","ap","ct","dn","dt","ec","ed","et","ex","ez","gn","is","jn","job","jr","js","jz","lc","lm","lv","mc","mq","mt","ne","nm","pv","rt","sl","zc"]);

export const hasCover = (slug: string) => COVER_SLUGS.has(slug);
export const posterUrl = (slug: string) => `/capas/poster/${slug}.webp`;
export const wideUrl = (slug: string) => `/capas/wide/${slug}.webp`;
