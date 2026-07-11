import Image from "next/image";

interface AuthHeaderProps 

{
  subtitle: string;
  title: string;
}

export default function AuthHeader({ subtitle, title }: AuthHeaderProps) 
{
  return (
    <>
      <div className="mb-[28px] text-center">
        <Image src="/assets/images/logo.svg" alt="Image" width={161} height={40} className="max-w-[161px] mx-auto mb-[28px]" />
      </div>

      <p className="font-normal leading-[1.4] text-[#2D3748] text-center mb-[8px]">
        {subtitle}
      </p>

      <h4 className="text-[28px] font-medium leading-[1.2] text-[#312000] text-center mb-[50px]">
        {title}
      </h4>
      
    </>
  );
}
