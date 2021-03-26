import Component from '@ember/component';
import InitValueMixin from 'fortnight/mixins/init-value';
import { computed } from '@ember/object';

export default Component.extend(InitValueMixin, {
  /**
   * The metric options, as an array of metric objects.
   * For example:
   * `[ { key: 'views', label: 'Impressions' } ]`
   *
   * @type {object[]}
   */
  options: null,

  /**
   * The raw metric data
   *
   * @type {object[]}
   */
  rows: null,

  init() {
    this._super(...arguments);
    this.initValue('options', []);
    this.initValue('rows', []);
  },

  metrics: computed('options.[]', 'rows.[]', function() {
    return this.options.map((opt) => ({
      label: opt.label,
      total: this.rows.reduce((sum, { metrics }) => sum += metrics[opt.key] || 0, 0),
    }));
  }),
});
