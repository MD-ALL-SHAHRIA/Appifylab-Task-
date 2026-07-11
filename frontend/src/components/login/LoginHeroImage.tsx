import Image from "next/image";

export default function LoginHeroImage() 

{
  return (
    <div>

      <div className="text-center md:text-left">


        <Image src="/assets/images/login.png" alt="Image" width={1269} height={1240} className="max-w-full lg:max-w-[633px] w-auto h-auto" priority />

        
      </div>


    </div>
  );
}
