"use client";
import { GRAPHQL_API_ENDPOINT } from "@/lib/constants";

import { from, HttpLink } from "@apollo/client";
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from "@apollo/client-integration-nextjs";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

function makeClient() {
  const removeTypenameLink = removeTypenameFromVariables();
  const httpLink = new HttpLink({
    uri: GRAPHQL_API_ENDPOINT,
  });
  const link = from([removeTypenameLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
