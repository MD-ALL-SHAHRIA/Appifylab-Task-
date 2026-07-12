"use client";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileDropdown() 


{
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center relative cursor-pointer outline-none bg-transparent border-none">
        <div className="mr-[8px] w-[24px]">
          <Avatar className="w-[24px] h-[24px]">
            <AvatarImage src="/assets/images/profile.png" alt="Profile" />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>
        </div>



        <div className="flex items-center cursor-pointer text-gray-800 dark:text-white/60">
          <p className="m-0 font-normal text-[16px] leading-[24px]">
            Dylan Field
          </p>
          <div className="bg-transparent border border-transparent p-0 ml-1 outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                fill="currentColor"
                d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
              />
            </svg>
          </div>
        </div>
      </DropdownMenuTrigger>



      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={10}
        className="w-[312px] p-0 overflow-hidden rounded-xl border-none shadow-[0px_10px_20px_rgba(0,0,0,0.08)] bg-white dark:bg-[#122031] z-[1050]"
      >
        <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-[#384F68]">
          <div className="shrink-0">
            <Avatar className="w-[48px] h-[48px]">
              <AvatarImage src="/assets/images/profile.png" alt="Profile" />
              <AvatarFallback>DF</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h4 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">

              
              Dylan Field
            </h4>
            <Link
              href="/profile"
              className="text-sm text-blue-600 dark:text-[#1890FF] hover:underline"
            >
              View Profile
            </Link>
          </div>
        </div>

        <ul className="list-none p-0 m-0">
          <DropdownMenuItem className="p-0">
            <Link
              href="#0"
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer border-b border-gray-100 dark:border-[#384F68] last:border-none rounded-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none"
            >
              <div className="flex items-center gap-3 font-medium text-gray-700 dark:text-white/60">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    fill="none"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fill="currentColor"
                      d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17zm0 1.375h-1.17c-.287 0-.562.113-.764.312-.179.177-.288.41-.308.628l-.012.29c-.098 1.262-1.172 2.253-2.486 2.253a2.475 2.475 0 01-1.013-.231l-.182-.095a1.1 1.1 0 00-1.488.407l-.616.993a1.05 1.05 0 00.296 1.392l.247.153A2.43 2.43 0 013.181 9.5c0 .802-.401 1.552-1.095 2.023l-.147.091c-.486.276-.674.873-.448 1.342l.053.102.597 1.01c.14.248.374.431.652.509.246.069.51.05.714-.04l.103-.05a2.506 2.506 0 011.882-.248 2.456 2.456 0 011.823 2.1l.02.335c.059.535.52.95 1.079.95h1.17c.566 0 1.036-.427 1.08-.95l.005-.104a2.412 2.412 0 01.726-1.732 2.508 2.508 0 011.779-.713c.331.009.658.082.992.23l.3.15c.469.202 1.026.054 1.309-.344l.068-.105.61-1a1.045 1.045 0 00-.288-1.383l-.257-.16a2.435 2.435 0 01-1.006-1.389 2.393 2.393 0 01.25-1.847c.181-.31.429-.575.752-.795l.152-.095c.485-.278.672-.875.448-1.346l-.067-.127-.012-.027-.554-.945a1.095 1.095 0 00-1.27-.487l-.105.041-.098.049a2.515 2.515 0 01-1.88.259 2.47 2.47 0 01-1.511-1.122 2.367 2.367 0 01-.325-.97l-.012-.24a1.056 1.056 0 00-.307-.774 1.096 1.096 0 00-.779-.323zm-.58 5.02c1.744 0 3.16 1.39 3.16 3.105s-1.416 3.105-3.16 3.105c-1.746 0-3.161-1.39-3.161-3.105s1.415-3.105 3.16-3.105zm0 1.376c-.973 0-1.761.774-1.761 1.729 0 .955.788 1.73 1.76 1.73s1.76-.775 1.76-1.73-.788-1.73-1.76-1.73z"
                    />
                  </svg>
                </span>
                Settings
              </div>
              <div className="bg-transparent border-none text-gray-900 dark:text-white opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    fill="currentColor"
                    d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                  />
                </svg>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <Link
              href="#0"
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer border-b border-gray-100 dark:border-[#384F68] last:border-none rounded-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none"
            >
              <div className="flex items-center gap-3 font-medium text-gray-700 dark:text-white/60">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 19a9 9 0 100-18 9 9 0 000 18z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009"
                    />
                  </svg>
                </span>
                Help & Support
              </div>
              <div className="bg-transparent border-none text-gray-900 dark:text-white opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    fill="currentColor"
                    d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                  />
                </svg>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <Link
              href="#0"
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer border-b border-gray-100 dark:border-[#384F68] last:border-none rounded-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none"
            >
              <div className="flex items-center gap-3 font-medium text-gray-700 dark:text-white/60">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="none"
                    viewBox="0 0 19 19"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"
                    />
                  </svg>
                </span>
                Log Out
              </div>
              <div className="bg-transparent border-none text-gray-900 dark:text-white opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    fill="currentColor"
                    d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                  />
                </svg>
              </div>
            </Link>
          </DropdownMenuItem>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
