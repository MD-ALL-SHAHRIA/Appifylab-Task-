import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FeedPostCard() 


{
  return (
    <div className="bg-white dark:bg-[#192D43] dark:text-white dark:border-[#384F68] rounded-[12px] py-6 mb-4 shadow-sm border border-gray-100">
      <div className="px-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="shrink-0">
              <Link href="/profile">
                <Image
                  src="/assets/images/post_img.png"
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
              </Link>
            </div>


            <div>
              <Link href="/profile" className="hover:underline">
                <h4 className="m-0 text-[15px] font-semibold text-gray-900 dark:text-white leading-tight">
                  Karim Saif
                </h4>
              </Link>


              <p className="m-0 text-[13px] text-gray-500 dark:text-white/60 mt-1">
                5 minute ago .{" "}
                <Link
                  href="#0"
                  className="hover:underline text-gray-500 dark:text-white/60"
                >
                  Public
                </Link>
              </p>
            </div>
          </div>
          <div className="relative">


            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 text-gray-400 hover:text-gray-600 transition-colors border-none bg-transparent cursor-pointer focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="17"
                  fill="none"
                  viewBox="0 0 4 17"
                >
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </DropdownMenuTrigger>


              <DropdownMenuContent
                align="end"
                className="w-[280px] p-0 overflow-hidden rounded-[12px] border-none shadow-[0px_4px_14px_rgba(0,0,0,0.06)] mt-2 bg-white dark:bg-[#122031]"
              >
                <ul className="list-none p-0 m-0">
                  <DropdownMenuItem className="p-0">
                    <Link
                      href="#0"
                      className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer text-sm font-medium text-gray-700 dark:text-white/60 border-b border-gray-100 dark:border-[#384F68] last:border-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none rounded-none"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                          />
                        </svg>
                      </span>
                      Save Post
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuItem className="p-0">
                    <Link
                      href="#0"
                      className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer text-sm font-medium text-gray-700 dark:text-white/60 border-b border-gray-100 dark:border-[#384F68] last:border-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none rounded-none"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="22"
                          fill="none"
                          viewBox="0 0 20 22"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      Turn On Notification
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuItem className="p-0">
                    <Link
                      href="#0"
                      className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer text-sm font-medium text-gray-700 dark:text-white/60 border-b border-gray-100 dark:border-[#384F68] last:border-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none rounded-none"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
                          />
                        </svg>
                      </span>
                      Hide
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuItem className="p-0">
                    <Link
                      href="#0"
                      className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer text-sm font-medium text-gray-700 dark:text-white/60 border-b border-gray-100 dark:border-[#384F68] last:border-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none rounded-none"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
                          />
                        </svg>
                      </span>
                      Edit Post
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuItem className="p-0">
                    <Link
                      href="#0"
                      className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors w-full cursor-pointer text-sm font-medium text-gray-700 dark:text-white/60 border-none focus:bg-gray-50 dark:focus:bg-[#192D43] outline-none rounded-none"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-[rgba(24,144,255,0.1)] text-blue-600 dark:text-[#1890FF]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                          />
                        </svg>
                      </span>
                      Delete Post
                    </Link>

                    
                  </DropdownMenuItem>
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3">
          -Healthy Tracking App
        </h4>
        <div className="mb-4 rounded-xl overflow-hidden">
          <Image
            src="/assets/images/timeline_img.png"
            alt=""
            width={600}
            height={400}
            className="w-full h-auto object-cover block"
          />
        </div>

        <div className="px-0 mb-[26px] flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex -space-x-[6px]">
              <Image
                src="/assets/images/react_img1.png"
                alt="Image"
                width={22}
                height={22}
                className="rounded-full border-[1.5px] border-white dark:border-[#192D43] relative z-[5]"
              />
              <Image
                src="/assets/images/react_img2.png"
                alt="Image"
                width={22}
                height={22}
                className="rounded-full border-[1.5px] border-white dark:border-[#192D43] relative z-[4]"
              />
              <Image
                src="/assets/images/react_img3.png"
                alt="Image"
                width={22}
                height={22}
                className="rounded-full border-[1.5px] border-white dark:border-[#192D43] relative z-[3] hidden sm:block"
              />
              <Image
                src="/assets/images/react_img4.png"
                alt="Image"
                width={22}
                height={22}
                className="rounded-full border-[1.5px] border-white dark:border-[#192D43] relative z-[2] hidden sm:block"
              />
              <Image
                src="/assets/images/react_img5.png"
                alt="Image"
                width={22}
                height={22}
                className="rounded-full border-[1.5px] border-white dark:border-[#192D43] relative z-[1] hidden sm:block"
              />
            </div>
            <p className="text-[15px] text-[#666666] dark:text-white/60 ml-[6px] font-normal leading-none m-0 pt-[2px]">
              9+
            </p>
          </div>
          <div className="flex gap-4 text-[13px] text-[#666666] dark:text-white/60 m-0">
            <p className="m-0">
              <Link
                href="#0"
                className="hover:underline text-[#666666] dark:text-white/60"
              >
                <span>12</span> Comment
              </Link>
            </p>
            <p className="m-0 hover:underline cursor-pointer text-[#666666] dark:text-white/60">
              <span>122</span> Share
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 bg-[#FBFCFD] dark:bg-[#122031] p-2 rounded-[8px]">
          <button className="flex items-center justify-center py-[9px] px-2 rounded-md bg-[#F2F3F5] dark:bg-[#1C334A] text-[14px] font-normal text-[#1890FF] hover:bg-[#e8e9eb] dark:hover:bg-[rgba(28,51,74,0.8)] transition-colors flex-1 mx-[2px] border-none cursor-pointer">
            <span className="flex items-center gap-[6px] pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  fill="#FFCC4D"
                  d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
                />
                <path
                  fill="#664500"
                  d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
                />
                <path
                  fill="#fff"
                  d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"
                />
                <path
                  fill="#664500"
                  d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
                />
              </svg>
              Haha
            </span>
          </button>
          <button className="flex items-center justify-center py-[9px] px-2 rounded-md bg-transparent text-[14px] font-normal text-[#666666] dark:text-white/60 hover:bg-[#F2F3F5] dark:hover:bg-[#1C334A] hover:text-gray-900 dark:hover:text-white transition-colors flex-1 mx-[2px] border-none cursor-pointer">
            <span className="flex items-center gap-[6px] pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.938 9.313h7.125M10.5 14.063h3.563"
                />
              </svg>
              Comment
            </span>
          </button>
          <button className="flex items-center justify-center py-[9px] px-2 rounded-md bg-transparent text-[14px] font-normal text-[#666666] dark:text-white/60 hover:bg-[#F2F3F5] dark:hover:bg-[#1C334A] hover:text-gray-900 dark:hover:text-white transition-colors flex-1 mx-[2px] border-none cursor-pointer">
            <span className="flex items-center gap-[6px] pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="21"
                fill="none"
                viewBox="0 0 24 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
                />
              </svg>
              Share
            </span>
          </button>
        </div>

        <div className="mb-4">
          <div className="bg-[#F6F6F6] dark:bg-[#122031] rounded-[18px] py-1 px-[9px] mb-4">
            <form className="flex items-center justify-between flex-wrap w-full relative">
              <div className="flex items-center w-full flex-[1_1] min-w-0 pr-20">
                <div className="shrink-0">
                  <Image
                    src="/assets/images/comment_img.png"
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="w-full ml-2">
                  <textarea
                    className="bg-transparent w-full h-[40px] border-none p-2 text-[14px] resize-none focus:outline-none focus:ring-0 m-0 text-[#666] dark:text-white"
                    placeholder="Write a comment"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-4 absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillOpacity=".46"
                      fillRule="evenodd"
                      d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillOpacity=".46"
                      fillRule="evenodd"
                      d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6">
            <div className="mb-3">
              <button
                type="button"
                className="text-[14px] font-semibold text-[#1890FF] hover:underline bg-transparent border-none cursor-pointer p-0"
              >
                View 4 previous comments
              </button>
            </div>

            <div className="flex gap-3 mb-4">
              <div className="shrink-0 mt-1">
                <Link href="/profile">
                  <Image
                    src="/assets/images/txt_img.png"
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </Link>
              </div>
              <div className="w-full">
                <div className="bg-[#F6F6F6] dark:bg-[#122031] rounded-[18px] p-3 w-full max-w-max relative mb-[18px]">
                  <div>
                    <div>
                      <Link href="/profile" className="hover:underline">
                        <h4 className="text-[14px] font-semibold text-[#112032] dark:text-white m-0">
                          Radovan SkillArena
                        </h4>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-[13px] text-[#666] dark:text-white/60 m-0 leading-[1.6]">
                      <span>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.{" "}
                      </span>
                    </p>
                  </div>

                  <div className="absolute -bottom-[14px] right-2 flex items-center bg-white dark:bg-[#192D43] dark:text-white dark:border-[#384F68] rounded-full shadow-[0px_4px_14px_rgba(0,0,0,0.06)] p-[3px] gap-1 z-10 min-w-[45px] border border-gray-100 dark:border-transparent">
                    <div className="flex -space-x-[3px]">
                      <span className="bg-[#1890FF] rounded-full w-[16px] h-[16px] flex items-center justify-center text-white relative z-20 border-[1.5px] border-white dark:border-[#192D43]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                      </span>
                      <span className="bg-[#E53F71] rounded-full w-[16px] h-[16px] flex items-center justify-center text-white relative z-10 border-[1.5px] border-white dark:border-[#192D43]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </span>
                    </div>
                    <span className="text-[12px] font-normal text-[#666] dark:text-white/60 leading-none pl-1">
                      198
                    </span>
                  </div>
                </div>

                <div className="pl-2">
                  <div>
                    <ul className="flex items-center gap-[12px] list-none p-0 m-0">
                      <li>
                        <span className="text-[12px] font-semibold text-[#666] dark:text-white/60 hover:underline cursor-pointer">
                          Like.
                        </span>
                      </li>
                      <li>
                        <span className="text-[12px] font-semibold text-[#666] dark:text-white/60 hover:underline cursor-pointer">
                          Reply.
                        </span>
                      </li>
                      <li>
                        <span className="text-[12px] font-semibold text-[#666] dark:text-white/60 hover:underline cursor-pointer">
                          Share
                        </span>
                      </li>
                      <li>
                        <span className="font-normal text-[#999] text-[12px]">
                          .21m
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
