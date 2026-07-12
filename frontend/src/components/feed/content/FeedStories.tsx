import Image from "next/image";
import Link from "next/link";
import StoryCard from "./StoryCard";

export default function FeedStories() 


{
  return (
    <>
      <div className="mb-4 hidden md:block relative">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <StoryCard
            imageSrc="/assets/images/card_ppl1.png"
            name="Your Story"
            isYourStory={true}
          />

          <StoryCard
            imageSrc="/assets/images/card_ppl2.png"
            name="Ryan Roslansky"
            profileSrc="/assets/images/mini_pic.png"
            fallbackText="RR"
          />

          <StoryCard
            imageSrc="/assets/images/card_ppl3.png"
            name="Dylan Field"
            profileSrc="/assets/images/mini_pic.png"
            fallbackText="DF"
          />

          <StoryCard
            imageSrc="/assets/images/card_ppl4.png"
            name="Ryan Roslansky"
            profileSrc="/assets/images/mini_pic.png"
            fallbackText="RR"
          />
        </div>
      </div>

      <div className="md:hidden mb-4 overflow-x-auto flex gap-3 pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Link href="#0" className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-gray-200">
            <Image
              src="/assets/images/card_ppl1.png"
              alt="Your Story"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/20 flex items-center justify-center">
              <button className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white absolute bottom-[-4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 2.5v7M2.5 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-700 dark:text-white/60">
            Your Story
          </p>
        </Link>

        <Link href="#0" className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-blue-600 p-[2px]">
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <Image
                src="/assets/images/card_ppl2.png"
                alt="Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-700 dark:text-white/60">
            Ryan...
          </p>
        </Link>

        <Link href="#0" className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-gray-300 p-[2px]">
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <Image
                src="/assets/images/card_ppl3.png"
                alt="Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-500 dark:text-white/60">
            Dylan...
          </p>
        </Link>
      </div>
    </>
  );
}
