import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/login/LoginForm";

export default function Home() 

{
  return (
    <AuthLayout
      heroImage={{
        lightImageSrc: "/assets/images/login.png",
        darkImageSrc: "/assets/images/login1.png",
        width: 1269,
        height: 1240,
        imageClassName: "max-w-full lg:max-w-[633px] w-auto h-auto",
      }}


      header={{
        subtitle: "Welcome back",
        title: "Login to your account",
      }}

      googleButton={{
        text: "Or sign-in with google",
      }}

      footer={{
        text: "Don't have an account?",
        linkText: "Create New Account",
        href: "/registration",
      }}

    >
      <LoginForm/>
      </AuthLayout>


  );
}
