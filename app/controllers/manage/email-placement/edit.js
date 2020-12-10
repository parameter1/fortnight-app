import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/email-placement/update';
import deleteEmailPlacement from 'fortnight/gql/mutations/email-placement/delete';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async update({ id, name, emailDeployment }) {
      this.startAction();
      const payload = { name, deploymentId: get(emailDeployment || {}, 'id') };
      const variables = { input: { id, payload } };
      try {
        if (!payload.deploymentId) throw new Error('You must select an email deployment to continue.');
        await this.get('apollo').mutate({ mutation, variables }, 'updateEmailPlacement');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Deletes the placement
     *
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteEmailPlacement;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteEmailPlacement');
        await this.transitionToRoute('manage.email-placement.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
