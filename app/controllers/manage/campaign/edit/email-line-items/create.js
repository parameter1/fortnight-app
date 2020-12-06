import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/email-line-item/create';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     */
    async create() {
      this.startAction();
      const {
        name,
        emailPlacement,
      } = this.get('model');
      const campaignId = this.get('campaignId');

      const input = { name, campaignId, emailPlacementId: get(emailPlacement || {}, 'id') };
      const variables = { input };
      const refetchQueries = ['CampaignEmailLineItems'];
      try {
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
