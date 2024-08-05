const oneMinute = 60 * 1000;
const thirtyMinutes = 30 * oneMinute;

export const formatDateForDatetime = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

export const isDateSmallerThan30Minutes = (date: Date): boolean => {
    const now = new Date();
    return now.getTime() - date.getTime() < thirtyMinutes;
};
