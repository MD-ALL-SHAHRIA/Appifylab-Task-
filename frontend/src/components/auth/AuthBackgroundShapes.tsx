import Image from "next/image";

export default function AuthBackgroundShapes() 


{
  return (
    <>
      <div className="hidden min-[992px]:block absolute top-0 left-0 w-[150px] min-[1500px]:w-[176px] -z-10">
        <Image
          src="/assets/images/shape1.svg"
          alt=""
          width={176}
          height={540}
          className="w-full h-auto"
          priority
        />

        <Image
          src="/assets/images/dark_shape.svg"
          alt=""
          width={176}
          height={540}
          className="w-full h-auto hidden"
        />
      </div>

      <div className="hidden min-[992px]:block absolute top-0 right-[20px] w-[450px] min-[1500px]:w-[568px] -z-10">
        <Image
          src="/assets/images/shape2.svg"
          alt=""
          width={568}
          height={400}
          className="w-full h-auto"
          priority
        />

        <Image
          src="/assets/images/dark_shape1.svg"
          alt=""
          width={576}
          height={408}
          className="w-full h-auto hidden opacity-5"
        />
      </div>

      <div className="hidden min-[992px]:block absolute bottom-0 right-0 w-[494px] min-[1500px]:right-[226px] min-[1500px]:w-[400px] min-[1600px]:right-[327px] min-[1600px]:w-[568px] -z-10">
        <Image
          src="/assets/images/shape3.svg"
          alt=""
          width={568}
          height={548}
          className="w-full h-auto"
          priority
        />

        <Image
          src="/assets/images/dark_shape2.svg"
          alt=""
          width={568}
          height={548}
          className="w-full h-auto hidden opacity-5"
        />
      </div>
    </>
  );
}
