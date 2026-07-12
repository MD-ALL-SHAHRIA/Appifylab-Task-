import Link from "next/link";
import Image from "next/image";

export default function FeedRightSidebar() 


{
  return (
    <aside className="w-full hidden lg:block shrink-0 overflow-y-auto sticky top-[100px] h-[calc(100vh-100px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="w-full">
        <div className="mb-[16px]">
          <div className="pt-[24px] pb-[24px] px-[24px] rounded-[6px] bg-white dark:bg-[#192D43] dark:text-white dark:border-[#384F68]">
            <div className="flex items-center justify-between mb-[24px]">
              <h4 className="text-[20px] font-medium text-[#212121] dark:text-white m-0 leading-[1.4]">
                You Might Like
              </h4>
              <span>
                <Link
                  className="text-[12px] font-medium text-[#1890FF] hover:underline leading-[18px]"
                  href="#0"
                >
                  See All
                </Link>
              </span>
            </div>
            <hr className="bg-[#F0F2F5] my-[4px] mb-[10px] border-none h-[1px]" />

            <div className="flex flex-col">
              <div className="flex items-center my-[24px]">
                <div className="shrink-0 mr-[20px]">
                  <Link href="/profile">
                    <Image
                      src="/assets/images/Avatar.png"
                      alt="Image"
                      width={66}
                      height={66}
                      className="w-[66px] h-[66px] rounded-full object-cover"
                    />
                  </Link>
                </div>
                <div>
                  <Link
                    href="/profile"
                    className="hover:text-[#1890FF] text-[#212121] dark:text-white"
                  >
                    <h4 className="m-0 text-[16px] font-medium leading-[24px]">
                      Radovan SkillArena
                    </h4>
                  </Link>
                  <p className="m-0 text-[12px] font-normal text-[#666666] dark:text-white/60 leading-[18px]">
                    Founder & CEO at Trophy
                  </p>
                </div>
              </div>
              <div className="flex w-full gap-[8px]">
                <button
                  type="button"
                  className="flex-1 py-[9px] rounded-[6px] border border-[#f1f1f1] bg-transparent hover:bg-[#377DFF] hover:text-white text-[#959eae] dark:text-white/60 text-[14px] font-medium leading-[22px] transition-all text-center"
                >
                  Ignore
                </button>
                <button
                  type="button"
                  className="flex-1 py-[9px] rounded-[6px] border border-[#377DFF] bg-[#377DFF] hover:bg-[#1890FF] text-white text-[14px] font-medium leading-[22px] transition-all text-center"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-[16px]">
          <div className="pt-[24px] pb-[6px] px-[24px] rounded-[6px] bg-white dark:bg-[#192D43] dark:text-white dark:border-[#384F68]">
            <div className="mb-[24px]">
              <div className="flex items-center justify-between mb-[24px]">
                <h4 className="text-[20px] font-medium text-[#212121] dark:text-white m-0 leading-[1.4]">
                  Your Friends
                </h4>
                <span>
                  <Link
                    className="text-[12px] font-medium text-[#1890FF] hover:underline leading-[18px]"
                    href="/find-friends"
                  >
                    See All
                  </Link>
                </span>
              </div>
              <form className="relative mb-[24px]">
                <svg
                  className="absolute left-[18px] top-[12px] text-[#666666] dark:text-white/60"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="none"
                  viewBox="0 0 17 17"
                >
                  <circle cx="7" cy="7" r="6" stroke="currentColor"></circle>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M16 16l-3-3"
                  ></path>
                </svg>
                <input
                  className="w-full bg-[#F5F5F5] border border-[#F5F5F5] hover:border-[#1890FF] transition-all rounded-[32px] h-[40px] pl-[47px] pr-[47px] py-[7px] text-[16px] text-[#212121] dark:text-white focus:outline-none placeholder:text-[rgba(0,0,0,0.25)] placeholder:font-normal"
                  type="search"
                  placeholder="input search text"
                  aria-label="Search"
                />
              </form>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-[24px] p-[6px] rounded-[8px] hover:bg-[#e4e6e9] transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] shrink-0 mr-[16px]">
                    <Link href="/profile">
                      <Image
                        src="/assets/images/people1.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[50%] object-cover"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/profile"
                      className="hover:text-[#1890FF] text-[#212121] dark:text-white"
                    >
                      <h4 className="m-0 text-[14px] font-medium leading-[1.4]">
                        Steve Jobs
                      </h4>
                    </Link>
                    <p className="m-0 text-[11px] font-[300] text-[#212121] dark:text-white leading-[1.4]">
                      CEO of Apple
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-normal text-[rgba(0,0,0,0.46)] dark:text-white/60 leading-[21px]">
                    5 minute ago
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-[24px] p-[6px] rounded-[8px] hover:bg-[#e4e6e9] transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] shrink-0 mr-[16px]">
                    <Link href="/profile">
                      <Image
                        src="/assets/images/people2.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[50%] object-cover"
                      />
                    </Link>
                  </div>
                  <div>
                    
                    <Link
                      href="/profile"
                      className="hover:text-[#1890FF] text-[#212121] dark:text-white"
                    >
                      <h4 className="m-0 text-[14px] font-medium leading-[1.4]">
                        Ryan Roslansky
                      </h4>
                    </Link>
                    <p className="m-0 text-[11px] font-[300] text-[#212121] dark:text-white leading-[1.4]">
                      CEO of Linkedin
                    </p>
                  </div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <rect
                      width="12"
                      height="12"
                      x="1"
                      y="1"
                      fill="#0ACF83"
                      stroke="#fff"
                      strokeWidth="2"
                      rx="6"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between mb-[24px] p-[6px] rounded-[8px] hover:bg-[#e4e6e9] transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] shrink-0 mr-[16px]">
                    <Link href="/profile">
                      <Image
                        src="/assets/images/people3.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[50%] object-cover"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/profile"
                      className="hover:text-[#1890FF] text-[#212121] dark:text-white"
                    >
                      <h4 className="m-0 text-[14px] font-medium leading-[1.4]">
                        Dylan Field
                      </h4>
                    </Link>
                    <p className="m-0 text-[11px] font-[300] text-[#212121] dark:text-white leading-[1.4]">
                      CEO of Figma
                    </p>
                  </div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <rect
                      width="12"
                      height="12"
                      x="1"
                      y="1"
                      fill="#0ACF83"
                      stroke="#fff"
                      strokeWidth="2"
                      rx="6"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between mb-[24px] p-[6px] rounded-[8px] hover:bg-[#e4e6e9] transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] shrink-0 mr-[16px]">
                    <Link href="/profile">
                      <Image
                        src="/assets/images/people3.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[50%] object-cover"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/profile"
                      className="hover:text-[#1890FF] text-[#212121] dark:text-white"
                    >
                      <h4 className="m-0 text-[14px] font-medium leading-[1.4]">
                        Dylan Field
                      </h4>
                    </Link>
                    <p className="m-0 text-[11px] font-[300] text-[#212121] dark:text-white leading-[1.4]">
                      CEO of Figma
                    </p>
                  </div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <rect
                      width="12"
                      height="12"
                      x="1"
                      y="1"
                      fill="#0ACF83"
                      stroke="#fff"
                      strokeWidth="2"
                      rx="6"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between mb-[24px] p-[6px] rounded-[8px] hover:bg-[#e4e6e9] transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] shrink-0 mr-[16px]">
                    <Link href="/profile">
                      <Image
                        src="/assets/images/people3.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[50%] object-cover"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/profile"
                      className="hover:text-[#1890FF] text-[#212121] dark:text-white"
                    >
                      <h4 className="m-0 text-[14px] font-medium leading-[1.4]">
                        Dylan Field
                      </h4>
                    </Link>
                    <p className="m-0 text-[11px] font-[300] text-[#212121] dark:text-white leading-[1.4]">
                      CEO of Figma
                    </p>
                  </div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <rect
                      width="12"
                      height="12"
                      x="1"
                      y="1"
                      fill="#0ACF83"
                      stroke="#fff"
                      strokeWidth="2"
                      rx="6"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between mb-[24px] p-[6px] rounded-[8px] hover:bg-[#e4e6e9] transition-all cursor-pointer">
                <div className="flex items-center">
                  <div className="w-[40px] h-[40px] shrink-0 mr-[16px]">
                    <Link href="/profile">
                      <Image
                        src="/assets/images/people1.png"
                        alt=""
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-[50%] object-cover"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/profile"
                      className="hover:text-[#1890FF] text-[#212121] dark:text-white"
                    >
                      <h4 className="m-0 text-[14px] font-medium leading-[1.4]">
                        Steve Jobs
                      </h4>
                    </Link>
                    <p className="m-0 text-[11px] font-[300] text-[#212121] dark:text-white leading-[1.4]">
                      CEO of Apple
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-normal text-[rgba(0,0,0,0.46)] dark:text-white/60 leading-[21px]">
                    5 minute ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
