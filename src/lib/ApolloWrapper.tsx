"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        companyIds: {
          read() {
            const ids = typeof window !== 'undefined' && localStorage.getItem("companyIds");
            return ids ? JSON.parse(ids) : [];
          },
        },
      },
    },
  },
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://be2-fe-task-us-east-1-staging.dcsdevelopment.me/graphql",
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache,
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
