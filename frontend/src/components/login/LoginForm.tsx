"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/feed");
      }
    } catch (err: any) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-wrap -mx-[15px]">
        <div className="w-full px-[15px]">
          <div className="mb-[14px]">
            <Label className="inline-block font-medium text-[16px] leading-[1.4] text-[#4A5568] mb-[8px]">
              Email
            </Label>

            <Input
              type="email"
              {...register("email")}
              className={`w-full bg-white border ${
                errors.email ? "border-red-500" : "border-[#F5F5F5]"
              } rounded-[6px] h-[48px] px-[12px] py-[6px] text-[#2D3748] focus:outline-none focus-visible:border-[#86b7fe] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="w-full px-[15px]">
          <div className="mb-[14px]">
            <Label className="inline-block font-medium text-[16px] leading-[1.4] text-[#4A5568] mb-[8px]">
              Password
            </Label>

            <Input
              type="password"
              {...register("password")}
              className={`w-full bg-white border ${
                errors.password ? "border-red-500" : "border-[#F5F5F5]"
              } rounded-[6px] h-[48px] px-[12px] py-[6px] text-[#2D3748] focus:outline-none focus-visible:border-[#86b7fe] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-[15px] items-center">
        <div className="w-1/2 px-[15px]">
          <div className="flex items-center gap-[8px] mb-[.125rem]">
            <input
              type="checkbox"
              id="flexRadioDefault2"
              defaultChecked
              className="flex-shrink-0 w-[16px] h-[16px] appearance-none border border-[#DFDFDF] rounded-full checked:border-[#1890FF] checked:bg-transparent relative checked:before:content-[''] checked:before:absolute checked:before:top-[3px] checked:before:left-[3px] checked:before:w-[8px] checked:before:h-[8px] checked:before:rounded-full checked:before:bg-[#1890FF] cursor-pointer"
            />

            <Label
              htmlFor="flexRadioDefault2"
              className="text-[14px] font-normal text-[#2D3748] leading-[1.4] cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
        </div>

        <div className="w-1/2 px-[15px] text-right sm:text-left">
          <div>
            <p className="text-[#1890FF] text-[14px] leading-[1.4] mt-[2px] sm:ml-[23px] cursor-pointer hover:underline whitespace-nowrap">
              Forgot password?
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-[15px]">
        <div className="w-full px-[15px]">
          <div className="mt-[40px] mb-[60px] flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="px-[116px] h-auto py-[12px] bg-[#1890FF] hover:bg-[#0070e0] border border-transparent rounded-[6px] font-medium text-[16px] text-white hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow whitespace-nowrap disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login now"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
