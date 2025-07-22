"use client";

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
import { authClient } from "@/lib/authClient";
import { GithubIcon, Loader } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function LoginForm() {
//   const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
//   const [googlePending, startGoogleTransition] = useTransition();
  const [email, setEmail] = useState("");

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Singned in with GitHub, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

//   async function signInWithGoogle() {
//     startGoogleTransition(async () => {
//       await authClient.signIn.social({
//         provider: "google",
//         callbackURL: "/",
//         fetchOptions: {
//           onSuccess: () => {
//             toast.success("Singned in with Google, you will be redirected...");
//           },
//           onError: () => {
//             toast.error("Internal Server Error");
//           },
//         },
//       });
//     });
//   }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">Welcome back!</CardTitle>
        <CardDescription className="text-center">
          Login with your GitHub or Google Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          className="w-full cursor-pointer"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              SignIn with GitHub
            </>
          )}
        </Button>
        {/* <Button
          onClick={signInWithGoogle}
          disabled={googlePending}
          className="w-full cursor-pointer"
          variant="outline"
        >
          {googlePending ? (
            <>
              <Loader className="size-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <GoogleIcon />
              SignIn with Google
            </>
          )}
        </Button> */}

        <div
          className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2
            after:z-0 after:flex after:items-center after:border-t after:border-border"
        >
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          {/* <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Continue with Email
              </>
            )}
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
}