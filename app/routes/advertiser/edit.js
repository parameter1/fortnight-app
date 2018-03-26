import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/advertiser';
import mutation from 'fortnight/gql/mutations/update-advertiser';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model({ id }) {
    const resultKey = 'advertiser';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  renderTemplate() {
    this.render();
    this.render('advertiser.actions.edit', { outlet: 'actions', into: 'application' });
  },

  actions: {
    update({ id, name, logo }) {
      const resultKey = 'updateAdvertiser';
      const variables = { input: { id, payload: { name, logo } } };
      const refetchQueries = ['advertiser', 'AllAdvertisers'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.get('notify').info('Advertiser saved.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
