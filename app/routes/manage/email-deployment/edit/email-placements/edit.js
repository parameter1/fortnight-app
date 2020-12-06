import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/email-placement/edit';

export default Route.extend(RouteQueryManager, {
  model({ email_placement_id }) {
    const variables = { input: { id: email_placement_id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailPlacement');
  },
});
