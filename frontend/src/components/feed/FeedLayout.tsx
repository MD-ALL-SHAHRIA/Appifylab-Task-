import React, { ReactNode } from "react";
import FeedNavbar from "./navbar/FeedNavbar";
import FeedLeftSidebar from "./sidebar-left/FeedLeftSidebar";
import FeedRightSidebar from "./sidebar-right/FeedRightSidebar";
import ModeSwitcher from "./ModeSwitcher";

export default function FeedLayout({ children }: { children: ReactNode }) 


{
  return (
    <div className="min-h-screen flex flex-col bg-[#F0F2F5] dark:bg-[#122031] pb-[80px] lg:pb-0 relative transition-colors duration-200">
      <ModeSwitcher />
      <FeedNavbar />
      <div className="w-full max-w-[1320px] mx-auto px-4 lg:px-[15px] pt-[30px] lg:pt-[100px]">
        <div className="flex flex-col lg:flex-row -mx-[15px]">
          <div className="hidden lg:block w-full lg:w-3/12 px-[15px]">
            <FeedLeftSidebar />
          </div>
          <main className="flex-1 min-w-0 w-full lg:w-6/12 px-[15px]">
            {children}
          </main>
          <div className="hidden lg:block w-full lg:w-3/12 px-[15px]">
            <FeedRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
