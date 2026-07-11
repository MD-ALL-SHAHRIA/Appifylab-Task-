import Image from "next/image";

export default function LoginHeader() 
{
  return (
    <>
      <div className="mb-[28px] text-center">
        <Image src="/assets/images/logo.svg" alt="Image" width={161} height={40} className="max-w-[161px] mx-auto mb-[28px]" />
      </div>

      <p className="font-normal leading-[1.4] text-[#2D3748] text-center mb-[8px]">


        Welcome back

      </p>

      <h4 className="text-[28px] font-medium leading-[1.2] text-[#312000] text-center mb-[50px]">


        Login to your account

        
      </h4>
    </>
  );
}
