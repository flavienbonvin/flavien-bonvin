export const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
