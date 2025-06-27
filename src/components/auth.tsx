"use client";
import { cn } from "@/lib/utils";
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
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
    const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(e.target.username.value, e.target.password.value)
    const res = await signIn("credentials", {
      redirect: false,
      username: e.target.username.value,
      password: e.target.password.value,
    })

    if (res?.ok) {
      window.location.href = "/admin/dashboard"
    } else {
      toast.error("Invalid username or password")
    }
  }
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to Admin Dashboard</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your admin
            dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
