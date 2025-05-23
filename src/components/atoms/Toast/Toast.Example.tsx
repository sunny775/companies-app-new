import { ToastPosition, ToastType } from ".";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";

const ToastDemo = () => {
  const { toast, success, error, info, warning } = useToast();

  const showBasicToast = (): void => {
    toast("Longer text, This is a basic toast message, This is a basic toast message, This is a basic toast message");
  };

  const showSuccessToast = (): void => {
    success("Operation completed successfully!", { autoClose: false });
  };

  const showErrorToast = (): void => {
    error("An error has occurred");
  };

  const showInfoToast = (): void => {
    info("Here is some information for you");
  };

  const showWarningToast = (): void => {
    warning("Warning: This action cannot be undone");
  };

  const showCustomToast = (): void => {
    toast("This toast will close in 10 seconds", {
      autoClose: 10000, // 10 seconds
      type: ToastType.INFO,
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-surface mt-10 rounded-xl shadow-md flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center mb-4">Toast Demo</h1>

      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" onClick={showBasicToast}>
        Show Basic Toast
      </button>

      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded" onClick={showSuccessToast}>
        Show Success Toast
      </button>

      <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded" onClick={showErrorToast}>
        Show Error Toast
      </button>

      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={showInfoToast}>
        Show Info Toast
      </button>

      <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded" onClick={showWarningToast}>
        Show Warning Toast
      </button>

      <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded" onClick={showCustomToast}>
        Show Custom Toast (10s)
      </button>
    </div>
  );
};

export const ToastExample = () => {
  return (
    <ToastProvider position={ToastPosition.TOP_RIGHT}>
      <ToastDemo />
    </ToastProvider>
  );
};
