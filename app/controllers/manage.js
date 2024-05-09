import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  /**
   *
   */
  session: inject(),

  isChangePasswordOpen: false,
  isUpdateProfileOpen: false,

  /**
   *
   */
  isInstanceLocked: computed.reads('session.data.authenticated.locked'),

  actions: {
    displayChangePassword() {
      this.set('isChangePasswordOpen', true);
    },
    displayUpdateProfile() {
      this.set('isUpdateProfileOpen', true);
    },
  },
});
