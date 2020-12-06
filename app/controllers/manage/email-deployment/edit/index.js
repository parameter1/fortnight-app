import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/email-deployment/update';
import deleteEmailDeplyoment from 'fortnight/gql/mutations/email-deployment/delete';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async update({ id, name, publisher }) {
      this.startAction();
      const payload = { name, publisherId: get(publisher || {}, 'id') };
      const variables = { input: { id, payload } };
      try {
        if (!payload.publisherId) throw new Error('You must select a publisher to continue.');
        await this.get('apollo').mutate({ mutation, variables }, 'updateEmailDeployment');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Deletes the deployment
     *
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteEmailDeplyoment;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteEmailDeployment');
        await this.transitionToRoute('manage.email-deployment.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
