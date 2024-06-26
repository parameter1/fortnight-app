import Route from '@ember/routing/route';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import { getObservable } from 'ember-apollo-client';

import query from 'fortnight/gql/queries/campaign/email-line-items/all';

export default Route.extend(RouteQueryManager, {
  queryParams: {
    phrase: {
      refreshModel: true
    },
    first: {
      refreshModel: true
    },
    after: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  model({ first, after, sortBy, ascending }) {
    const { id: campaignId } = this.modelFor('manage.campaign.edit');
    const controller = this.controllerFor(this.get('routeName'));
    const pagination = { first, after };
    const sort = { field: sortBy, order: ascending ? 1 : -1 };

    const variables = { campaignId, pagination, sort };
    const resultKey = 'campaign';
    controller.set('resultKey', resultKey);
    if (!sortBy) delete variables.sort.field;
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey)
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      }).catch(e => this.get('graphErrors').show(e))
    ;
  },

  actions: {
    setDetailsForm(instance) {
      this.controllerFor(this.get('routeName')).set('detailsForm', instance);
    },
    setModal(instance) {
      this.controllerFor(this.get('routeName')).set('modal', instance);
    },
    hideModal() {
      this.controllerFor(this.get('routeName')).get('modal').send('hide');
    },
  }
});
