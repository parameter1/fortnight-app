import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/email-line-item/create';

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
    setDays(days) {
      this.set('model.dates.days', days);
    },

    /**
     *
     */
    setRange({ start, end }) {
      this.set('model.dates.start', start);
      this.set('model.dates.end', end);
    },

    /**
     *
     */
    async create() {
      this.startAction();
      try {
        const {
          name,
          placement,
          dates,
        } = this.get('model');
        const campaignId = this.get('campaignId');

        const {
          type,
          start,
          end,
          days,
        } = dates;

        if (type === 'range' && (!start || !end)) throw new Error('You must provide a start and end date.');
        if (type === 'days' && (!Array.isArray(days) || !days.length)) throw new Error('You must provide an array of days.');

        const input = {
          name,
          campaignId,
          emailPlacementId: get(placement || {}, 'id'),
          dates,
        };
        const variables = { input };
        const refetchQueries = ['CampaignEmailLineItems'];
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'createEmailLineItem');
        return this.transitionToRoute('manage.campaign.edit.email-line-items');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
