import { HttpLink, makeVar, ReactiveVar } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const companyIdsInitialValue: string[] = [];

export const companyIdsVar: ReactiveVar<string[]> = makeVar<string[]>(
  companyIdsInitialValue
);

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        companyIds: {
          read() {
            localStorage.companyIds = JSON.stringify(companyIdsVar());
            return companyIdsVar();
          },
        },
      },
    },
  },
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache,
    link: new HttpLink({
      uri: "https://be2-fe-task-us-east-1-staging.dcsdevelopment.me/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
