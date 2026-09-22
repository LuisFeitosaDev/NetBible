// Gerado por scripts/build-covers.mjs — não edite à mão.
export const COVER_SLUGS: ReadonlySet<string> = new Set(["1co","1cr","1jo","1pe","1rs","1sm","1tm","1ts","2co","2cr","2jo","2pe","2rs","2sm","2tm","2ts","3jo","ag","am","ap","at","cl","ct","dn","dt","ec","ed","ef","et","ex","ez","fm","fp","gl","gn","hb","hc","is","jd","jl","jn","jo","job","jr","js","jz","lc","lm","lv","mc","ml","mq","mt","na","ne","nm","ob","os","pv","rm","rt","sf","sl","tg","tt","zc"]);

export const hasCover = (slug: string) => COVER_SLUGS.has(slug);
export const posterUrl = (slug: string) => `/capas/poster/${slug}.webp`;
export const wideUrl = (slug: string) => `/capas/wide/${slug}.webp`;
