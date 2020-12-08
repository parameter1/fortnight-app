import Component from '@ember/component';
import { computed } from '@ember/object';
import LineItemDatesMixin from 'fortnight/mixins/line-item-dates-mixin';

export default Component.extend(LineItemDatesMixin, {
  joinedDays: computed('formattedDays.[]', function() {
    return this.get('formattedDays').join(' | ');
  }),

  joinedRange: computed('formattedRange.{start,end}', function() {
    const start = this.get('formattedRange.start');
    const end = this.get('formattedRange.end');
    return `${start} - ${end}`;
  }),

  label: computed('type', function() {
    if (this.get('type') === 'range') return 'Date Range:'
    return 'Days:';
  }),
});
