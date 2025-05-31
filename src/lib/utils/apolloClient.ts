import { from, HttpLink } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { ApolloClient, InMemoryCache, registerApolloClient } from "@apollo/client-integration-nextjs";
import { GRAPHQL_API_ENDPOINT } from "../constants";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({
  uri: GRAPHQL_API_ENDPOINT,
});

const link = from([removeTypenameLink, httpLink]);

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
    devtools: {
      enabled: true
    }
  });
});
