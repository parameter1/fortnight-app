import Mixin from '@ember/object/mixin';
import dayjs from 'fortnight/dayjs';

export default Mixin.create({
  utcDateFromTimestamp(timestamp) {
    const coverted = dayjs(timestamp).tz('UTC');
    return coverted.$d;
  },

  utcDateFromDate(date) {
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ));
  },

  utcEndDateFromDate(date) {
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999,
    ));
  },
});
