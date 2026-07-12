import FeedStories from "./FeedStories";
import FeedCreatePost from "./FeedCreatePost";
import FeedPostCard from "./FeedPostCard";

export default function FeedContent() 

{
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4">
        <FeedStories />

        <FeedCreatePost />

        <FeedPostCard />

        <FeedPostCard />
      </div>
      
    </div>
  );
}
