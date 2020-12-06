import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import lineitemDateDays from 'fortnight/gql/mutations/email-line-item/date-days';
import lineitemDateRange from 'fortnight/gql/mutations/email-line-item/date-range';
import lineitemDetials from 'fortnight/gql/mutations/email-line-item/details';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    setDateType(type) {
      this.set('model.dates.type', type);
      if (type === 'range') this.set('model.dates.days', []);
      if (type === 'days') {
        this.set('model.dates.start', undefined);
        this.set('model.dates.end', undefined);
      }
    },

    /**
     *
     */
    async setDays(days) {
      this.startAction();
      this.set('model.dates.days', days);
      const input = { id: this.get('model.id'), days };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: lineitemDateDays, variables }, 'lineitemDateDays');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    async setRange({ start, end }) {
      this.set('model.dates.start', start);
      this.set('model.dates.end', end);
      if (start && end) {
        this.startAction();
        const input = { id: this.get('model.id'), start, end };
        const variables = { input };
        try {
          await this.get('apollo').mutate({ mutation: lineitemDateRange, variables }, 'lineitemDateRange');
        } catch (e) {
          throw this.get('graphErrors').handle(e);
        } finally {
          this.endAction();
        }
      }
    },

    /**
     *
     */
    async update() {
      try {
        const {
          id,
          name,
          placement,
        } = this.get('model');

        this.startAction();
        const input = {
          id,
          name,
          emailPlacementId: get(placement || {}, 'id'),
        };
        const variables = { input };
        await this.get('apollo').mutate({ mutation: lineitemDetials, variables }, 'emailLineItemDetails');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
