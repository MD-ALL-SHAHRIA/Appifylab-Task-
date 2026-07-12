import AuthBackgroundShapes from "./AuthBackgroundShapes";
import AuthHeroImage from "./AuthHeroImage";
import AuthHeader from "./AuthHeader";
import AuthGoogleButton from "./AuthGoogleButton";
import AuthFooter from "./AuthFooter";
import { ReactNode } from "react";

interface AuthLayoutProps 

{
  heroImage: {
    lightImageSrc: string;
    darkImageSrc?: string;
    width?: number;

    height?: number;
    imageClassName?: string;
  };
  header: {
    subtitle: string;
    title: string;
  };
  googleButton: {
    text: string;
  };
  footer: {
    text: string;
    linkText: string;
    href: string;
  };
  children: ReactNode;
}



export default function AuthLayout({
  heroImage,
  header,
  googleButton,
  footer,
  children,
}: AuthLayoutProps) 

{
  return (
    <section className="relative z-10 py-[100px] bg-[#F0F2F5] font-['Poppins'] overflow-hidden">

      <AuthBackgroundShapes />


      <div>
        <div className="container max-w-[1320px] mx-auto px-[15px]">
          <div className="flex flex-wrap items-center -mx-[15px]">
            <div className="w-full lg:w-2/3 px-[15px]">
              <AuthHeroImage
                lightImageSrc={heroImage.lightImageSrc}
                darkImageSrc={heroImage.darkImageSrc}
                width={heroImage.width}
                height={heroImage.height}
                imageClassName={heroImage.imageClassName}
              />
            </div>

            <div className="w-full lg:w-1/3 px-[15px]">
              <div className="bg-white p-[48px] rounded-[6px]">
                <AuthHeader subtitle={header.subtitle} title={header.title} />
                <AuthGoogleButton text={googleButton.text} />
                {children}
                <AuthFooter
                  text={footer.text}
                  linkText={footer.linkText}
                  href={footer.href}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
