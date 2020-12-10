import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import UTCDatesMixin from 'fortnight/mixins/utc-dates-mixin';
import dayjs from 'fortnight/dayjs';

const { isArray } = Array;

export default Mixin.create(UTCDatesMixin, {
  start: null,
  end: null,
  days: null,
  type: null,

  dateFormat: 'ddd MMM Do, YYYY',

  _days: computed('days.[]', function() {
    return this.get('days').map(timestamp => this.utcDateFromTimestamp(timestamp));
  }),

  _range: computed('start', 'end', function() {
    const start = this.get('start');
    const end = this.get('end');
    return {
      start: start ? this.utcDateFromTimestamp(start) : null,
      end: end ? this.utcDateFromTimestamp(end) : null,
    }
  }),

  showDateRange: computed('type', function() {
    return this.get('type') === 'range';
  }),

  isRangeSet: computed('start', 'end', function() {
    if (this.get('start') && this.get('end')) return true;
    return false;
  }),

  daysSorted: computed('_days.[]', function() {
    return this.get('_days').sort((a, b) => {
      if (a.valueOf() > b.valueOf()) return 1;
      if (a.valueOf() < b.valueOf()) return -1;
      return 0;
    });
  }),

  formattedDays: computed('daysSorted.[]', function() {
    return this.get('daysSorted').map(d => dayjs(d).format(this.dateFormat));
  }),

  formattedRange: computed('_range.{start,end}', function() {
    const start = this.get('_range.start');
    const end = this.get('_range.end');
    return {
      start: start ? dayjs(start).format(this.dateFormat) : null,
      end: end ? dayjs(end).format(this.dateFormat) : null,
    }
  }),

  init() {
    this._super(...arguments);
    const days = this.get('days');
    this.set('days', isArray(days) ? days : []);
    const type = this.get('type');
    this.set('type', type || 'days');
  },
});
