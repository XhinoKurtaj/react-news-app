const getLastSevenDays = () => {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  const sevenDaysAgoTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000;
  const sevenDaysAgoDate = new Date();
  sevenDaysAgoDate.setTime(sevenDaysAgoTimestamp);
  return sevenDaysAgoDate;
};

export { getLastSevenDays };
