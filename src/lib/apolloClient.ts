import { from, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache, registerApolloClient } from "@apollo/experimental-nextjs-app-support";

import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({
  uri: "https://be2-fe-task-us-east-1-staging.dcsdevelopment.me/graphql",
});

const link = from([removeTypenameLink, httpLink]);

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
});
