const oneMinuteMS = 60 * 1e3;
const thirtyMinutesMS = 30 * oneMinuteMS;
const formatDateForDatetime = (date) => {
  return date.toISOString().split("T")[0];
};
const isDateSmallerThan30Minutes = (date) => {
  const now = /* @__PURE__ */ new Date();
  return now.getTime() - date.getTime() < thirtyMinutesMS;
};

export { formatDateForDatetime as f, isDateSmallerThan30Minutes as i };
