import FeedLayout from "@/components/feed/FeedLayout";

export default function Layout({ children }: { children: React.ReactNode }) 
{
  return 
  
    <FeedLayout>
    {children}
    </FeedLayout>;
}
