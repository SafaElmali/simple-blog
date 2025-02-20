import { Metadata } from "next";
import { RegisterForm } from "@/components/features/forms/register-form";

export const metadata: Metadata = {
  title: "Create Admin Account | Biiheev",
  description: "Create a new admin account",
};

const AdminRegisterPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Admin Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter details below to create a new admin account
          </p>
        </div>
        <RegisterForm
          endpoint="/api/auth/admin/register"
          redirectUrl="/admin/dashboard"
          onSuccess={(data) => {
            console.log("Admin created successfully:", data);
          }}
        />
      </div>
    </div>
  );
};

export default AdminRegisterPage;
