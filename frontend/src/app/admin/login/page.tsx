import { AuthForm } from "@/components/features/forms/auth-form/auth-form";

const LoginPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the admin panel
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
