import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

const { isArray } = Array;

export default Component.extend({
  start: null,
  end: null,
  days: null,
  type: null,

  dateFormat: 'ddd MMM Do, YYYY',

  showDateRange: computed('type', function() {
    return this.get('type') === 'range';
  }),

  daysFormatted: computed('_days.[]', function() {
    return this.get('_days').map(day => day.format(this.get('dateFormat'))).join(' | ');
  }),

  rangeFormatted: computed('_range.start', '_range.end', function() {
    const start = this.get('_range.start').format(this.get('dateFormat'));
    const end = this.get('_range.end').format(this.get('dateFormat'));
    return `${start} - ${end}`;
  }),

  _days: computed('days.[]', function() {
    return this.get('daysSorted').map(d => moment(d));
  }),

  _range: computed('start', 'end', function() {
    const start = this.get('start');
    const end = this.get('end');
    return {
      start: start ? moment(start) : null,
      end: end ? moment(end) : null,
    }
  }),

  daysSorted: computed('_days.[]', function() {
    return this.get('days').sort();
  }),

  label: computed('type', function() {
    if (this.get('type') === 'range') return 'Date Range:'
    return 'Days:';
  }),

  init() {
    this._super(...arguments);
    const days = this.get('days');
    this.set('days', isArray(days) ? days : []);
    const type = this.get('type');
    this.set('type', type || 'days');
  },
});
