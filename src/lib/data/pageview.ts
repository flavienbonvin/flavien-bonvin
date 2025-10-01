import { db, PageView, sql } from "astro:db";

export const upsertPageView = async (pathname: string) => {
    await db
        .insert(PageView)
        .values({ pathname, count: 1 })
        .onConflictDoUpdate({
            target: PageView.pathname,
            set: { count: sql`${PageView.count} + 1` },
        });
};
