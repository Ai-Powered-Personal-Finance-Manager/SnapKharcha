import { Logo } from "@/src/components/home/shared";
import { RightPanelInterface } from "../../interface/register";
import { RegisterForm } from "./RegisterForm";
import { RegisterPreview } from "./RegisterPreview";

export const RightPanel = ({
  form,
  showPassword,
  handleSubmit,
  setShowPassword,
}: RightPanelInterface) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00C950]/5 blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mobile Logo */}
      <Logo showIcon className="mb-6 lg:hidden flex" />

      <div className="w-full max-w-md relative z-10">
        <RegisterPreview />

        {/* Register form*/}
        <RegisterForm
          form={form}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
