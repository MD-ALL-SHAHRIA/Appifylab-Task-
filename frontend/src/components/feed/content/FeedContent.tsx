"use client";
import { useState } from "react";
import FeedCreatePost from "./FeedCreatePost";
import FeedPostCard from "./FeedPostCard";
import FeedStories from "./FeedStories";
import { Post } from "@/types";
import { Button } from "@/components/ui/button";
import { useGetFeedQuery } from "@/lib/redux/apiSlice";

export default function FeedContent() {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const { data, isLoading, isFetching, error } = useGetFeedQuery(cursor);

  const posts = data?.items || [];
  const nextCursor = data?.nextCursor;

  const loadMore = () => {
    if (nextCursor && !isFetching) {
      setCursor(nextCursor);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4">
        <FeedStories />
        <FeedCreatePost />
        
        {error ? (
          <div className="text-red-500 py-4 text-center">Failed to load feed.</div>
        ) : (
          posts.map((post: Post) => (
            <FeedPostCard key={post.id} post={post} />
          ))
        )}

        {isLoading && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            Loading posts...
          </div>
        )}
        
        {nextCursor && !isLoading && (
          <div className="flex justify-center mt-4">
            <Button 
              onClick={loadMore} 
              disabled={isFetching}
              className="bg-[#1890FF] hover:bg-[#0070e0] text-white"
            >
              {isFetching ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
