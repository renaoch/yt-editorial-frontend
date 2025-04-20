import { Apple, Chrome } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import logo from "../../assets/image.png";
import { Label } from "../ui/label";
import VantaBackground from "../ui/VantaBG";

export function LoginForm({ onToggleAuthForm, className, ...props }) {
  return (
    <div
      className={cn(
        "relative z-10 flex min-h-screen items-center justify-center px-4",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow-xl ring-1 ring-white/20 border border-white/10">
        <form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 backdrop-blur-sm shadow">
                  <img className="rounded-md" src={logo} alt="" />
                </div>
                <h1 className="text-xl font-bold text-white">
                  Welcome to Stream Forge.
                </h1>
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="bg-white/10 text-white placeholder-black border-white/30 focus:ring-white/50"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="bg-white/10 text-white placeholder-white/70 border-white/30 focus:ring-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white/90 text-black hover:bg-white"
              >
                Log In
              </Button>
            </div>

            <div className="relative text-center text-sm text-white/70 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-white/20">
              <span className="relative z-10 bg-white/10 px-2">or</span>
            </div>

            <div className="">
              <Button
                variant="outline"
                className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
                asChild
              >
                <a
                  href="/auth/google"
                  className="flex items-center justify-center"
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </a>
              </Button>
            </div>
          </div>
        </form>
        <div className="text-center text-sm mt-3 text-white/70">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onToggleAuthForm} // Now it should work correctly
            className="underline underline-offset-4 hover:text-white"
          >
            Sign up
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-white/60 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-white">
          By clicking continue, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
