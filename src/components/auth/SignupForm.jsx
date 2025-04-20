import React, { useState } from "react";
import { Apple, Chrome } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import logo from "../../assets/image.png";
import { useAuthStore } from "../../store/useAuthStore"; // adjust path if needed

export function SignupForm({ className, onToggleAuthForm, ...props }) {
  const [role, setRole] = useState("editor");
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  return (
    <div
      className={cn(
        "relative z-10 flex min-h-screen items-center justify-center px-4",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md p-8 shadow-xl ring-1 ring-white/20 border border-white/10">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6">
            {/* Logo and heading */}
            <div className="flex flex-col items-center gap-2">
              <a
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 backdrop-blur-sm shadow">
                  <img className="rounded-md" src={logo} alt="logo" />
                </div>
                <h1 className="text-xl font-bold text-white">
                  Create Your Account
                </h1>
              </a>
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="yourname"
                  required
                  className="bg-white/10 text-white placeholder-white/70 border-white/30 focus:ring-white/50"
                />
              </div>

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
                  className="bg-white/10 text-white placeholder-white/70 border-white/30 focus:ring-white/50"
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
                  autoComplete="new-password"
                  required
                  className="bg-white/10 text-white placeholder-white/70 border-white/30 focus:ring-white/50"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="bg-white/10 text-white placeholder-white/70 border-white/30 focus:ring-white/50"
                />
              </div>

              {/* Role Selection */}
              <div className="grid gap-2">
                <Label className="text-white">Select your role</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="editor"
                      id="editor"
                      className="border-white/30"
                    />
                    <Label htmlFor="editor" className="text-white">
                      Editor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="creator"
                      id="creator"
                      className="border-white/30"
                    />
                    <Label htmlFor="creator" className="text-white">
                      Creator
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-white/90 text-black hover:bg-white"
              >
                Sign Up
              </Button>
            </div>

            {/* Divider */}
            <div className="relative text-center text-sm text-white/70 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-white/20">
              <span className="relative z-10 bg-white/10 px-2">or</span>
            </div>

            {/* Google Sign in */}
            <Button
              variant="outline"
              className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => loginWithGoogle(role)}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </form>

        <div className="text-center text-sm mt-3 text-white/70">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onToggleAuthForm}
            className="underline underline-offset-4 hover:text-white"
          >
            Log in
          </button>
        </div>

        <div className="text-center text-sm mt-3 text-white/70">
          By clicking Sign Up, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-white"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-white"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
