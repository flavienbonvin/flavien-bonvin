const oneMinuteMS = 60 * 1000;
const thirtyMinutesMS = 30 * oneMinuteMS;

export const formatDateForDatetime = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

export const isDateSmallerThan30Minutes = (date: Date): boolean => {
    const now = new Date();
    return now.getTime() - date.getTime() < thirtyMinutesMS;
};
