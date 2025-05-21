import { providerMap, signIn } from "@/lib/utils/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage(props: { searchParams: Promise<{ callbackUrl: string | undefined }> }) {
  const { callbackUrl } = await props.searchParams;
  const { NEXT_PUBLIC_SIGNIN_ERROR_URL: SIGNIN_ERROR_URL } = process.env;
  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.name}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: callbackUrl ?? "/companies",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }

              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
