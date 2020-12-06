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
     */
    async create() {
      this.startAction();
      const {
        name,
        emailDeployment,
      } = this.get('model');

      const payload = { name, deploymentId: get(emailDeployment || {}, 'id') };
      const variables = { input: { payload } };
      const refetchQueries = ['EditEmailDeploymentPlacements'];
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'createEmailPlacement');
        return this.transitionToRoute('manage.email-deployment.edit.email-placements');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    }
  },
});
