import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import minMax from 'dayjs/plugin/minMax';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// setup ant design date picker plugins
// https://github.com/ant-design/ant-design/issues/26190

const initDayjs = () => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  dayjs.extend(isoWeek);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(utc);
  dayjs.extend(minMax);
  dayjs.extend(timezone);
  dayjs.extend(isBetween);
  dayjs.extend(isSameOrBefore);
  dayjs.locale('es');
  dayjs.extend(relativeTime);
  dayjs.tz.setDefault('America/Los_Angeles');

  return dayjs;
};

export default initDayjs;
