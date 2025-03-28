import { ApolloError } from "@apollo/client";

export default function apiError(error: unknown) {
  let errorMessage = "An unexpected error occurred.";

  if (error instanceof ApolloError) {
    if (error.graphQLErrors?.length) {
      errorMessage = error.graphQLErrors.map((e) => e.message).join(", ");
    } else if (error.networkError) {
      errorMessage = "Network error: " + error.networkError.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return new Error(errorMessage);
}
