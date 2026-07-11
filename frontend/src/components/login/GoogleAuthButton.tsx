import Image from "next/image";
import { Button } from "@/components/ui/button";




export default function GoogleAuthButton() 
{


  return (
    <>
      <Button 
        type="button" 
        variant="outline"
        className="flex items-center justify-center bg-white border h-auto border-[#F0F2F5] rounded-[6px] py-[12px] px-[60px] mb-[40px] hover:bg-gray-50 transition-colors mx-auto"

      >
        <Image src="/assets/images/google.svg" alt="Image" width={20} height={20} className="max-w-[20px] mr-[8px]" />
        <span className="font-medium text-[16px] leading-[1.4] text-[#312000] flex-none">

          Or sign-in with google

        </span>

      </Button>

      <div className="text-center relative mb-[40px]">
        
        <div className="absolute left-0 bottom-[11px] w-[108px] h-[2px] border border-[#DFDFDF] rounded-[6px]"></div>

        <span className="font-normal text-[14px] leading-[1.4] text-[#C4C4C4]">

          Or

        </span>


        <div className="absolute right-0 bottom-[11px] w-[108px] h-[2px] border border-[#DFDFDF] rounded-[6px]"></div>

        
      </div>

    </>
  );
}
