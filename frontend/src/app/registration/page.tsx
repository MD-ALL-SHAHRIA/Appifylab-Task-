import AuthLayout from "@/components/auth/AuthLayout";
import RegistrationForm from "@/components/registration/RegistrationForm";

export default function RegistrationPage() 


{
  return (
    <AuthLayout
      heroImage={{
        lightImageSrc: "/assets/images/registration.png",
        darkImageSrc: "/assets/images/registration1.png",
        width: 1928,
        height: 1422,
      }}
      header={{
        subtitle: "Get Started Now",
        title: "Registration",
      }}

      googleButton={{
        text: "Register with google",
      }}

      footer={{
        text: "Already have an account?",
        linkText: "Login",
        href: "/",
      }}
    >
      <RegistrationForm />
    </AuthLayout>
  );
}
