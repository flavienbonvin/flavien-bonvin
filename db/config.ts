import { column, defineDb, defineTable } from "astro:db";

const PageView = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        pathname: column.text(),
        count: column.number({ default: 1 }),
    },
});

export default defineDb({
    tables: { PageView },
});
