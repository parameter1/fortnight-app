import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { inject } from '@ember/service';

import mutation from 'fortnight/gql/mutations/create-advertiser';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  errorProcessor: inject(),

  model() {
    return { name: '' };
  },
  actions: {
    create({ name }) {
      const variables = { input: { name } };
      const resultKey = 'createAdvertiser';
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(response => this.transitionTo('advertiser.edit', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
