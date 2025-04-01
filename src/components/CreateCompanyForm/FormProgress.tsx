import cn from "@/lib/cn";

export default function ProgressBar({ step }: { step: number }) {
  const steps = ["Company Info", "Address", "Contact", "Upload Logo"];

  return (
    <div className="flex items-center justify-between w-full mx-auto my-6">
      {steps.map((label, index) => (
        <div key={index} className="relative flex items-center w-1/4">
          <div
            className={cn(
              "h-[2px] w-[calc(100%-36px)] bg-gray-300 mx-1",
              { "bg-primary": step >= index },
              { "bg-gradient-to-r from-primary to-transparent": step === index }
            )}
          />

          <div
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-full transition-all",
              step > index
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-600"
            )}
          >
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
