import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const emailDeployment = this.modelFor('manage.email-deployment.edit');
    return {
      emailDeployment,
    };
  },
});
