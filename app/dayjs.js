import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';


dayjs
  .extend(utc)
  .extend(timezone)
  .extend(advancedFormat);

export default dayjs;
