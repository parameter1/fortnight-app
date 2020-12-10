import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/email-deployment/create';

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
        publisher,
      } = this.get('model');

      const payload = { name, publisherId: get(publisher || {}, 'id') };
      const variables = { input: { payload } };
      const refetchQueries = ['EditPublisherEmailDeployments'];
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'createEmailDeployment');
        return this.transitionToRoute('manage.publisher.edit.email-deployments');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    }
  },
});
