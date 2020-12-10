import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/email-deployment/edit';

export default Route.extend(RouteQueryManager, {
  model({ email_deployment_id }) {
    const variables = { input: { id: email_deployment_id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'emailDeployment');
  },
});
