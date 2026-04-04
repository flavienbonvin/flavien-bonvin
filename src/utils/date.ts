export const getFormattedDate = (date?: Date) => {
    if (!date) {
        return null;
    }

    return date.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
