"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import axios from "axios";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const email = localStorage.getItem("email")?.toString() || "";
    if (email?.length > 0) {
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/sign-in", {
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 200) {
        toast.success("Logged in successfully!");
        localStorage.setItem("email", res.data?.user?.email);
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background px-4 relative">
        <Card className="w-full max-w-md mx-auto p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className={`text-sm underline ${
                      loading ? "opacity-50 pointer-events-none" : ""
                    } `}
                  >
                    Forgot your password?
                  </Link>
                </div>
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
              </div>
              {error && <div className="text-red-600">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 mt-2 dark:bg-primary border-primary hover:bg-primary hover:text-white  border text-primary dark:text-white hover:opacity-70 rounded-md"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div
              className={`border mt-6 relative border-gray-400 rounded-md hover:bg-slate-50 ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button className="w-full pb-1 text-black dark:text-primary dark:hover:text-black active:bg-white focus:bg-transparent focus-within:bg-white mt-2 bg-transparent hove:bg-transparent">
                Sign In with Google
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
                      const res = await axios.post("/api/google-sign-in", {
                        decoded: decoded,
                      });
                      console.log("google run api Successfull", res);
                      setLoading(false);
                      if (res.status === 200) {
                        toast.success("Logged in successfully!");
                        localStorage.setItem("email", res.data?.user?.email);
                        router.push("/dashboard");
                      } else {
                        setError(
                          "Invalid email or password. Please try again."
                        );
                        setLoading(false);
                      }
                    }
                    googleLogin();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                    setLoading(false);
                  }}
                  type="standard"
                  theme="outline"
                  size="large"
                  text="signin_with"
                  auto_select={true}
                  width="350"
                />
              </div>
            </div>
            <div className="mt-6 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className={`underline ${
                  loading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                Sign up
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
    </>
  );
}

// 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
