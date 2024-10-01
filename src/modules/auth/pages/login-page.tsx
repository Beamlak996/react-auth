import { LoginContent } from "../components/login-content";
import { LoginForm } from "../components/login-form";

export function LoginPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <LoginContent />
      <LoginForm />
    </div>
  );
}
