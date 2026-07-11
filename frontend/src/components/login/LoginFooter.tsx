import Link from "next/link";

export default function LoginFooter() 


{
  return (
    <div className="flex flex-wrap -mx-[15px]">

      <div className="w-full px-[15px]">

        <div className="text-center">
          <p className="text-[14px]">

            Dont have an account? <Link href="/register" className="text-[#1890FF] hover:underline">Create New Account</Link>
          </p>

        </div>
        
      </div>

    </div>
  );
}
