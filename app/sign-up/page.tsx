"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email")?.toString() || "";
    if (email?.length > 0  ){
      router.push("/dashboard");
    }
  }, []);

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 7;

    let strength = "Weak";
    let color = "text-red-600";

    if (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isValidLength
    ) {
      strength = "Strong";
      color = "text-green-600";
      setPasswordError("");
    } else if (
      (hasUpperCase || hasLowerCase) &&
      hasNumber &&
      hasSpecialChar &&
      isValidLength
    ) {
      strength = "Medium";
      color = "text-yellow-600";
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must be at least 7 characters long, include uppercase, lowercase, number, and special character."
      );
    }

    setPasswordStrength(strength);
    setPasswordStrengthColor(color);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (passwordError) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/sign-up", {
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
      });
      console.log(res, "res");

      if (res.status === 201) {
        toast.success("Account created successfully!");
        localStorage.setItem("email", res.data?.user?.email);
        router.push("/dashboard");
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err: any) {
      setError("An error occurred. Please try again.");
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md mx-auto p-6">
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  aria-label="First name"
                  className="px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
                  name="firstName"
                  onChange={onChange}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  aria-label="Last name"
                  className="px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
                  name="lastName"
                  onChange={onChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                aria-label="Email"
                className="px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
                name="email"
                onChange={onChange}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                aria-label="Password"
                className="px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
                name="password"
                onChange={onChange}
                disabled={loading}
              />
              <div className="text-sm">
                <div className={passwordStrengthColor}>
                  Password strength: {passwordStrength}
                </div>
                {passwordError && (
                  <div className="text-red-600">{passwordError}</div>
                )}
              </div>
            </div>
            {error && <div className="text-red-600">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 mt-2 dark:bg-primary border-primary hover:bg-primary hover:text-white  border text-primary dark:text-white hover:opacity-70 rounded-md"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create an account"}
            </button>
            <div
              className={`border relative border-gray-400 rounded-md hover:bg-slate-50 ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
             <button  className="w-full pb-1 text-black dark:text-primary dark:hover:text-black active:bg-white focus:bg-transparent focus-within:bg-white mt-2 bg-transparent hove:bg-transparent">
                Sign up with Google
              </button>

              <div className="opacity-[0.0002] max-sm:overflow-hidden absolute top-0">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    setLoading(true);
                    var decoded = jwtDecode(
                      // @ts-ignore
                      credentialResponse?.credential
                    );
                    console.log(decoded, " button");
                    async function googleLogin() {
                      const res = await axios.post("/api/google-sign-up", {
                        decoded: decoded,
                      });
                      if (res.status === 201) {
                        toast.success("Account created successfully!");
                        localStorage.setItem("email", res.data?.user?.email);
                        router.push("/dashboard");
                      } else {
                        setError("An error occurred. Please try again.");
                      }
                      // console.log("google run api Successfull", res);
                    }
                    googleLogin();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                    setLoading(false);
                  }}
                  type="standard"
                  theme="filled_blue"
                  size="large"
                  text="signup_with"
                  auto_select={true}
                  width="340"
                />
              </div>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className={`underline ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      {
        loading && ( <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-100 opacity-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
      </div>)
       }
    </div>
  );
}
