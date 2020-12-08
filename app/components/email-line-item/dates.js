import Component from '@ember/component';
import { computed } from '@ember/object';
import dayjs from 'fortnight/dayjs';

const { isArray } = Array;

export default Component.extend({
  classNames: ['form-group'],

  start: null,
  end: null,
  days: null,
  type: null,

  format: 'ddd MMM Do, YYYY',

  showDateRange: computed('type', function() {
    return this.get('type') === 'range';
  }),

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

  daysSorted: computed('_days.[]', function() {
    return this.get('_days').sort((a, b) => {
      if (a.valueOf() > b.valueOf()) return 1;
      if (a.valueOf() < b.valueOf()) return -1;
      return 0;
    });
  }),

  formattedDays: computed('daysSorted.[]', function() {
    return this.get('daysSorted').map(d => dayjs(d).format(this.format));
  }),

  formattedRange: computed('_range.{start,end}', function() {
    const start = this.get('_range.start');
    const end = this.get('_range.end');
    return {
      start: start ? dayjs(start).format(this.format) : null,
      end: end ? dayjs(end).format(this.format) : null,
    }
  }),

  isRangeSet: computed('start', 'end', function() {
    if (this.get('start') && this.get('end')) return true;
    return false;
  }),

  init() {
    this._super(...arguments);
    this.set('options', [
      { key: 'range', label: 'By Range' },
      { key: 'days', label: 'By Days' },
    ]);
    const days = this.get('days');
    this.set('days', isArray(days) ? days : []);
    const type = this.get('type');
    this.set('type', type || 'days');
  },

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

  actions: {
    setType(value) {
      this.set('type', value);
      this.get('on-type-change')(value);
    },

    setDays(value) {
      this.get('on-days-change')(value.map(d => this.utcDateFromDate(d).valueOf()));
    },

    setRange(value) {
      const { start, end } = value;
      this.get('on-range-change')({
        start: start ? this.utcDateFromDate(start).valueOf() : null,
        end: end ? this.utcEndDateFromDate(end).valueOf() : null,
      });
    },
  },
});
