import LoginBackgroundShapes from "./LoginBackgroundShapes";
import LoginHeroImage from "./LoginHeroImage";
import LoginHeader from "./LoginHeader";
import GoogleAuthButton from "./GoogleAuthButton";
import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

export default function LoginWrapper() 

{
  return (
    <section className="relative z-10 py-[100px] bg-[#F0F2F5] font-['Poppins'] overflow-hidden">
      <LoginBackgroundShapes />
      


      <div>
        <div className="container max-w-[1320px] mx-auto px-[15px]">
          <div className="flex flex-wrap items-center -mx-[15px]">
            
            <div className="w-full lg:w-2/3 px-[15px]">


              <LoginHeroImage />


            </div>

            <div className="w-full lg:w-1/3 px-[15px]">
              <div className="bg-white p-[48px] rounded-[6px]">

                <LoginHeader />
                <GoogleAuthButton />
                <LoginForm />
                <LoginFooter />


              </div>

            </div>
            
          </div>
        </div>

      </div>


    </section>
  );
}
