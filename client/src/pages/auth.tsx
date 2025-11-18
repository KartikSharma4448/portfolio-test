import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect } from "wouter";
import { Lock, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { z } from "zod";

const registrationSchema = insertUserSchema.extend({
  registrationSecret: z.string().min(1, "Registration secret is required"),
});

type RegistrationData = z.infer<typeof registrationSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm<RegistrationData>({
    resolver: zodResolver(isLogin ? insertUserSchema : registrationSchema),
    defaultValues: {
      username: "",
      password: "",
      registrationSecret: "",
    },
  });

  if (user) {
    return <Redirect to="/admin" />;
  }

  const onSubmit = (data: RegistrationData) => {
    if (isLogin) {
      loginMutation.mutate({ username: data.username, password: data.password });
    } else {
      registerMutation.mutate(data);
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Login Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isLogin ? "Admin Login" : "Create Admin Account"}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? "Sign in to access the admin dashboard"
                  : "Register a new admin account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              placeholder="Enter your username"
                              className="pl-9"
                              data-testid="input-username"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type="password"
                              placeholder="Enter your password"
                              className="pl-9"
                              data-testid="input-password"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!isLogin && (
                    <FormField
                      control={form.control}
                      name="registrationSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Secret</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                type="password"
                                placeholder="Enter registration secret"
                                className="pl-9"
                                data-testid="input-registration-secret"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    data-testid={isLogin ? "button-login" : "button-register"}
                  >
                    {isPending ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                  </Button>

                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        form.reset();
                      }}
                      className="text-primary hover:underline"
                      data-testid="button-toggle-mode"
                    >
                      {isLogin
                        ? "Need an account? Register"
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Hero Section */}
        <div className="hidden md:block">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Admin Access</h2>
                <p className="text-muted-foreground">Secure portfolio management</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">Manage Content</h3>
                <p className="text-sm text-muted-foreground">
                  Add, edit, and organize your projects, certificates, skills, and services from one central dashboard.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">Secure Access</h3>
                <p className="text-sm text-muted-foreground">
                  Your admin panel is protected with authentication to ensure only authorized users can make changes.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Changes you make are immediately reflected on your public portfolio for a seamless experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
