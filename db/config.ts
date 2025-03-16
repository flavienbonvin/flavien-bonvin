import { column, defineDb, defineTable } from "astro:db";

const PageView = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        pathname: column.text({ unique: true }),
        count: column.number({ default: 1 }),
    },
});

const SubscriptionValidation = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        email: column.text(),
        token: column.text(),
        createdAt: column.date(),
    },
});

export default defineDb({
    tables: { PageView, SubscriptionValidation },
});
