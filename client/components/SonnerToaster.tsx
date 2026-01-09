import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      theme="light"
      expand={true}
      visibleToasts={3}
    />
  );
}
