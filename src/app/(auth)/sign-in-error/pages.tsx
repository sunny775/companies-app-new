export default async function Page(props: {
  searchParams: { error: string | undefined };
}) {
  return (
    <div className="flex flex-col gap-2">
      {props.searchParams.error}: Unable to complete sign in
    </div>
  );
}
