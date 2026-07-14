import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NotificationItemProps 

{
  imageSrc: string;
  imageAlt: string;
  fallbackText: string;
  timeText: string;
  isUnread?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function NotificationItem({
  imageSrc,
  imageAlt,
  fallbackText,
  timeText,
  isUnread = false,
  children,
  onClick,
}: NotificationItemProps) {
  return (
    <div onClick={onClick} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#192D43] transition-colors cursor-pointer border-b border-gray-50 dark:border-[#384F68]">
      <div className="shrink-0">
        <Avatar className="w-[48px] h-[48px]">
          <AvatarImage src={imageSrc} alt={imageAlt} />
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <p className="m-0 text-sm text-gray-800 dark:text-white/60 leading-snug">
          {children}
        </p>
        <div className="mt-1">
          <span
            className={`text-xs font-medium ${isUnread ? "text-blue-600 dark:text-[#1890FF]" : "text-gray-500 dark:text-white/60"}`}
          >
            {timeText}
          </span>
        </div>
      </div>
    </div>
  );
}
