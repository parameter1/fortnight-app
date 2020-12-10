import Component from '@ember/component';
import LineItemDatesMixin from 'fortnight/mixins/line-item-dates-mixin';

export default Component.extend(LineItemDatesMixin, {
  classNames: ['form-group'],

  init() {
    this._super(...arguments);
    this.set('options', [
      { key: 'range', label: 'By Range' },
      { key: 'days', label: 'By Days' },
    ]);
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
