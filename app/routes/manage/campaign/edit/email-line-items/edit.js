import Route from '@ember/routing/route';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

import query from 'fortnight/gql/queries/campaign/email-line-items/edit';

export default Route.extend(RouteQueryManager, {
  model({ line_item_id }) {
    const input = { id: line_item_id };
    const variables = { input };
    return this.get('apollo').watchQuery({ query, variables, refetchPolicy: 'network-only' }, 'emailLineItem');
  },

  setupController(controller, model) {
    this._super(controller, model);
    const { id } = this.modelFor('manage.campaign.edit');
    this.controllerFor(this.get('routeName')).set('campaignId', id);
  },
});
