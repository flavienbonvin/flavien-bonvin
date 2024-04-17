import { db, eq, PageView } from "astro:db";

export const getPageView = async (pathname: string) => {
    return await db
        .select({ count: PageView.count })
        .from(PageView)
        .where(eq(PageView.pathname, pathname));
};

export const createPageView = async (pathname: string) => {
    await db.insert(PageView).values({
        pathname,
    });
};

export const updatePageViewCount = async (pathname: string, count: number) => {
    await db.update(PageView).set({ count }).where(eq(PageView.pathname, pathname));
};
