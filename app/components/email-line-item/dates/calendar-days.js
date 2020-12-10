import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  center: null,
  days: null,

  oldestDay: computed('days.[],length', function() {
    if (!this.get('days.length')) return new Date();
    const oldest = this.get('days').map(d => d.valueOf()).sort()[0];
    return oldest;
  }),

  init() {
    this._super(...arguments);
    this.set('center', this.get('oldestDay'));
  },
});
