export const formatDateForDatetime = (date: Date): string => {
  return date.toISOString().split('T')[0];
}
