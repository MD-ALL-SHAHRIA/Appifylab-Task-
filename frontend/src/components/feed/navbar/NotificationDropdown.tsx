"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown() 

{
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative block px-[16px] pt-[22px] pb-[26px] cursor-pointer group w-fit outline-none border-none bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          fill="none"
          viewBox="0 0 20 22"
        >
          <path
            className="fill-[#000] fill-opacity-60 dark:fill-[#fff] dark:fill-opacity-100 group-hover:fill-[#1890FF] group-hover:fill-opacity-100 transition-all"
            fillRule="evenodd"
            d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
            clipRule="evenodd"
          />
        </svg>
        <span className="absolute top-[16px] right-[10px] bg-[#1890FF] border border-white rounded-[9px] min-w-[17px] h-[17px] flex items-center justify-center text-[11px] font-normal leading-[1.4] text-white p-[3px]">
          6
        </span>
        <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-[2px] bg-[#00ACFF] transition-all" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        alignOffset={-110}
        sideOffset={10}
        className="w-[400px] p-0 rounded-xl border-none shadow-[0px_8px_24px_rgba(149,157,165,0.2)] bg-white dark:bg-[#122031] z-[1050]"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#384F68]">
          <h4 className="m-0 text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </h4>
          <div className="relative">
            <button
              type="button"
              className="bg-transparent border-none outline-none text-[#C4C4C4] hover:text-[#1890FF] transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="17"
                fill="none"
                viewBox="0 0 4 17"
              >
                <circle cx="2" cy="2" r="2" fill="currentColor"></circle>
                <circle cx="2" cy="8" r="2" fill="currentColor"></circle>
                <circle cx="2" cy="15" r="2" fill="currentColor"></circle>
              </svg>
            </button>
          </div>
        </div>

        <ScrollArea className="max-h-[400px]">
          <div className="flex gap-2 p-4">
            <button className="bg-blue-100 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF] px-4 py-1.5 rounded-full text-sm font-medium border-none cursor-pointer">
              All
            </button>
            <button className="bg-gray-100 dark:bg-[#192D43] text-gray-600 dark:text-white/60 px-4 py-1.5 rounded-full text-sm font-medium border-none hover:bg-gray-200 dark:hover:bg-[#1F3A53] transition-colors cursor-pointer">
              Unread
            </button>
          </div>
          <div className="flex flex-col">
            <NotificationItem
              imageSrc="/assets/images/friend-req.png"
              imageAlt="Steve Jobs"
              fallbackText="SJ"
              timeText="42 minutes ago"
              isUnread={true}
            >
              <span className="font-semibold text-gray-900 dark:text-white mr-1">
                Steve Jobs
              </span>
              posted a link in your timeline.
            </NotificationItem>

            <NotificationItem
              imageSrc="/assets/images/profile-1.png"
              imageAlt="Admin"
              fallbackText="A"
              timeText="42 minutes ago"
            >
              An admin changed the name of the group
              <span className="font-semibold text-gray-900 dark:text-white mx-1">
                Freelacer usa
              </span>
              to
              <span className="font-semibold text-gray-900 dark:text-white ml-1">
                Freelacer usa
              </span>
            </NotificationItem>

            <NotificationItem
              imageSrc="/assets/images/friend-req.png"
              imageAlt="Steve Jobs"
              fallbackText="SJ"
              timeText="42 minutes ago"
            >
              <span className="font-semibold text-gray-900 dark:text-white mr-1">
                Steve Jobs
              </span>
              posted a link in your timeline.
            </NotificationItem>
          </div>
        </ScrollArea>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
