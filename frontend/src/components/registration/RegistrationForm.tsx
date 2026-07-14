"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegisterMutation } from "@/lib/redux/apiSlice";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError("");

    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }).unwrap();

      router.push("/"); 
    } catch (err: any) {
      setError(err.data?.message || "Registration failed");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-wrap -mx-[15px]">
        <div className="w-full px-[15px]">
          <div className="mb-[14px]">
            <Label className="inline-block font-medium text-[16px] leading-[1.4] text-[#4A5568] mb-[8px]">
              First Name
            </Label>
            <Input
              type="text"
              {...register("firstName")}
              className={`w-full bg-white border ${
                errors.firstName ? "border-red-500" : "border-[#F5F5F5]"
              } rounded-[6px] h-[48px] px-[12px] py-[6px] text-[#2D3748] focus:outline-none focus-visible:border-[#86b7fe] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full px-[15px]">
          <div className="mb-[14px]">
            <Label className="inline-block font-medium text-[16px] leading-[1.4] text-[#4A5568] mb-[8px]">
              Last Name
            </Label>
            <Input
              type="text"
              {...register("lastName")}
              className={`w-full bg-white border ${
                errors.lastName ? "border-red-500" : "border-[#F5F5F5]"
              } rounded-[6px] h-[48px] px-[12px] py-[6px] text-[#2D3748] focus:outline-none focus-visible:border-[#86b7fe] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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

        <div className="w-full px-[15px]">
          <div className="mb-[14px]">
            <Label className="inline-block font-medium text-[16px] leading-[1.4] text-[#4A5568] mb-[8px]">
              Repeat Password
            </Label>
            <Input
              type="password"
              {...register("repeatPassword")}
              className={`w-full bg-white border ${
                errors.repeatPassword ? "border-red-500" : "border-[#F5F5F5]"
              } rounded-[6px] h-[48px] px-[12px] py-[6px] text-[#2D3748] focus:outline-none focus-visible:border-[#86b7fe] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.repeatPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-[15px] items-center">
        <div className="w-full px-[15px]">
          <div className="flex items-center gap-[8px] mb-[.125rem]">
            <input
              type="checkbox"
              id="termsCondition"
              defaultChecked
              className="flex-shrink-0 w-[16px] h-[16px] appearance-none border border-[#DFDFDF] rounded-full checked:border-[#1890FF] checked:bg-transparent relative checked:before:content-[''] checked:before:absolute checked:before:top-[3px] checked:before:left-[3px] checked:before:w-[8px] checked:before:h-[8px] checked:before:rounded-full checked:before:bg-[#1890FF] cursor-pointer"
            />
            <Label
              htmlFor="termsCondition"
              className="text-[14px] font-normal text-[#2D3748] leading-[1.4] cursor-pointer whitespace-nowrap"
            >
              I agree to terms & conditions
            </Label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-[15px]">
        <div className="w-full px-[15px]">
          <div className="mt-[40px] mb-[60px] flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="px-[116px] h-auto py-[12px] bg-[#1890FF] hover:bg-[#0070e0] border border-transparent rounded-[6px] font-medium text-[16px] text-white hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow whitespace-nowrap disabled:opacity-70"
            >
              {isLoading ? "Registering..." : "Register now"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
