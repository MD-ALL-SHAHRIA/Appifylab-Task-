import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StoryCardProps 


{
  imageSrc: string;
  profileSrc?: string;
  fallbackText?: string;
  name: string;
  isYourStory?: boolean;
}

export default function StoryCard({
  imageSrc,
  profileSrc,
  fallbackText = "U",
  name,
  isYourStory = false,
}: StoryCardProps) {
  return (
    <div className="w-1/4 shrink-0 cursor-pointer group">
      <div className="rounded-xl overflow-hidden relative h-[200px]">
        <div className="w-full h-full">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div
            className={`absolute bottom-0 left-0 w-full ${isYourStory ? "p-4 flex flex-col items-center" : "p-3"} bg-gradient-to-t from-black/70 to-transparent`}
          >
            {isYourStory && (
              <div className="mb-2">
                <button className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="none"
                    viewBox="0 0 10 10"
                  >
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      d="M.5 4.884h9M4.884 9.5v-9"
                    />
                  </svg>
                </button>
              </div>
            )}
            <p
              className={`text-white text-sm font-medium ${!isYourStory && "truncate"}`}
            >
              {name}
            </p>
          </div>
          {!isYourStory && profileSrc && (
            <div className="absolute top-3 left-3 rounded-full border-2 border-blue-600 overflow-hidden w-10 h-10">
              <Avatar className="w-full h-full">
                <AvatarImage src={profileSrc} alt={name} />
                <AvatarFallback>{fallbackText}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
