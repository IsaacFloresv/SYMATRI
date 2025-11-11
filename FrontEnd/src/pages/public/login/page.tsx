import { LoginForm } from "@/components/login-form/login"
import "./style.css"

export default function LoginPage() {
  return (
    <div className="overlay">
      <div className="bg-login flex min-h-svh flex-col items-center justify-center md:p-10">
        <div className="app-container w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
