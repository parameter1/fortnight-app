import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/email-placement/create';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async create({ name, emailDeployment }) {
      this.startAction();
      const payload = { name, deploymentId: get(emailDeployment || {}, 'id') };
      const variables = { input: { payload } };
      try {
        if (!payload.deploymentId) throw new Error('You must select an email deployment to continue.');
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createEmailPlacement');
        this.get('notify').info('Email placement successfully created.');
        return this.transitionToRoute('manage.email-placement.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    }
  },
});
