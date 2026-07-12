import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() 


{
  return (
    <form className="w-full">
      <div className="flex flex-wrap -mx-[15px]">
        <div className="w-full px-[15px]">
          <div className="mb-[14px]">
            <Label className="inline-block font-medium text-[16px] leading-[1.4] text-[#4A5568] mb-[8px]">
              Email
            </Label>

            <Input
              type="email"
              className="w-full bg-white border border-[#F5F5F5] rounded-[6px] h-[48px] px-[12px] py-[6px] text-[#2D3748] focus:outline-none focus-visible:border-[#86b7fe] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="w-full px-[15px]">
          <div className="mb-[14px]">
            <Label className="inline-block font-medium text-[16px] leading-[1.4] text-[#4A5568] mb-[8px]">
              Password
            </Label>

            <Input
              type="password"
              className="w-full bg-white border border-[#F5F5F5] rounded-[6px] h-[48px] px-[12px] py-[6px] text-[#2D3748] focus:outline-none focus-visible:border-[#86b7fe] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
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
              type="button"
              className="px-[116px] h-auto py-[12px] bg-[#1890FF] hover:bg-[#0070e0] border border-transparent rounded-[6px] font-medium text-[16px] text-white hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-shadow whitespace-nowrap"
            >
              Login now
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
