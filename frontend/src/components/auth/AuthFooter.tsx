import Link from "next/link";

interface AuthFooterProps 
{
  text: string;
  linkText: string;
  href: string;
}

export default function AuthFooter({ text, linkText, href }: AuthFooterProps) 
{
  return (
    <div className="flex flex-wrap -mx-[15px]">

      <div className="w-full px-[15px]">
        <div className="text-center">

          <p className="text-[14px]">

            {text} <Link href={href} className="text-[#1890FF] hover:underline">{linkText}</Link>

          </p>

          
        </div>
      </div>
    </div>
  );
}
