import Image from "next/image";

interface AuthHeroImageProps 

{
  lightImageSrc: string;
  darkImageSrc?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
}

export default function AuthHeroImage({ lightImageSrc, darkImageSrc, width = 1269, height = 1240, imageClassName = "w-full max-w-full h-auto" }: AuthHeroImageProps) 

{
  return (
    <div>


      <div className="text-center md:text-left">


        <Image src={lightImageSrc} alt="Image" width={width} height={height} className={`${imageClassName} ${darkImageSrc ? 'dark:hidden' : ''}`} priority />


        {darkImageSrc && (
          <Image src={darkImageSrc} alt="Image" width={width} height={height} className={`${imageClassName} hidden dark:block`} priority />
          
        )}


      </div>
    </div>
  );
}
