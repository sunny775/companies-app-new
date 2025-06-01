import { github, google } from "@/assets";
import Button from "@/components/ui/atoms/Button";
import Logo from "@/components/ui/molecules/Logo";
import { providerMap, signIn } from "@/lib/utils/auth";
import { AuthError } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const icons = {
  google: <Image src={google} width={16} height={16} className="w-6 h-6" alt="Google Logo" />,
  github: <Image src={github} width={16} height={16} className="w-6 h-6 dark:invert" alt="Github Logo" />,
};

export default async function SignInPage(props: { searchParams: Promise<{ callbackUrl: string | undefined }> }) {
  const { callbackUrl } = await props.searchParams;
  const { NEXT_PUBLIC_SIGNIN_ERROR_URL: SIGNIN_ERROR_URL } = process.env;
  return (
    <div className="h-[calc(100vh-64px)] bg-[rgb(50,60,50)] bg-[linear-gradient(-45deg,#fff_5px,transparent_200px)] dark:bg-[linear-gradient(-45deg,#000_5px,transparent_200px)] bg-[length:50px_50px]">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] w-full p-4 bg-surface/50">
        <Logo className="my-8" />
        <div className="w-full max-w-xl border border-border shadow-md rounded-lg p-6 bg-white/10 dark:bg-gray-600/5 backdrop-blur-sm">
          <h2 className="h-12 flex items-center justify-center text-lg font-bold">SIGN IN</h2>
          <div className="flex flex-col gap-4  items-center justify-center min-h-[30vh]">
            {Object.values(providerMap).map((provider) => (
              <form
                className="w-full"
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
                <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2 rounded-full">
                  <span>Sign in with {provider.name}</span>
                  <span>{icons[provider.name.toLowerCase() as keyof typeof icons]}</span>
                </Button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
