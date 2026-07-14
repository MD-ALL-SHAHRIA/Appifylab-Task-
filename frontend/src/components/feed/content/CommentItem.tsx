import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Comment } from "@/types";
import { useLikeCommentMutation, useCreateCommentMutation } from "@/lib/redux/apiSlice";

export function CommentItem({ comment, postId, userId }: { comment: Comment, postId: string, userId?: string }) {
  const [likeComment] = useLikeCommentMutation();
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const localReplies = comment.replies || [];
  const [showAllReplies, setShowAllReplies] = useState(false);
  const visibleReplies = showAllReplies ? localReplies : [];

  const hasLiked = comment.likes?.some(like => like.userId === userId) || false;
  const [userHasLiked, setUserHasLiked] = useState(hasLiked);
  const [likesCount, setLikesCount] = useState(comment.likes?.length || 0);

  const handleLike = async () => {
    const isRemoving = userHasLiked;
    setUserHasLiked(!isRemoving);
    setLikesCount(prev => isRemoving ? prev - 1 : prev + 1);
    try {
      await likeComment({ postId, commentId: comment.id }).unwrap();
    } catch (error) {
      console.error("Failed to like comment", error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    try {
      await createComment({ postId, content: replyContent, parentId: comment.id }).unwrap();
      setReplyContent("");
      setIsReplying(false);
      setShowAllReplies(true);
    } catch (error) {
      console.error("Failed to reply", error);
    }
  };

  return (
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
            <Link href="/profile" className="hover:underline">
              <h4 className="text-[14px] font-semibold text-[#112032] dark:text-white m-0">
                {comment.author?.firstName} {comment.author?.lastName}
              </h4>
            </Link>
          </div>
          <div className="mt-1">
            <p className="text-[13px] text-[#666] dark:text-white/60 m-0 leading-[1.6]">
              {comment.content}
            </p>
          </div>

          <div className="absolute -bottom-[14px] right-2 flex items-center bg-white dark:bg-[#192D43] dark:text-white dark:border-[#384F68] rounded-full shadow-[0px_4px_14px_rgba(0,0,0,0.06)] p-[3px] gap-1 z-10 min-w-[45px] border border-gray-100 dark:border-transparent">
            <div className="flex -space-x-[3px]">
              <span className="bg-[#1890FF] rounded-full w-[16px] h-[16px] flex items-center justify-center text-white relative z-20 border-[1.5px] border-white dark:border-[#192D43]">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              </span>
            </div>
            <span className="text-[12px] font-normal text-[#666] dark:text-white/60 leading-none pl-1">
              {likesCount}
            </span>
          </div>
        </div>

        <div className="pl-2 mb-2">
          <ul className="flex items-center gap-[12px] list-none p-0 m-0">
            <li>
              <span 
                onClick={handleLike}
                className={`text-[12px] font-semibold hover:underline cursor-pointer ${userHasLiked ? 'text-[#1890FF]' : 'text-[#666] dark:text-white/60'}`}
              >
                Like.
              </span>
            </li>
            <li>
              <span 
                onClick={() => setIsReplying(!isReplying)}
                className="text-[12px] font-semibold text-[#666] dark:text-white/60 hover:underline cursor-pointer"
              >
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
                {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : "Just now"}
              </span>
            </li>
          </ul>
        </div>
        
        {isReplying && (
          <form onSubmit={handleReplySubmit} className="mt-2 mb-4 flex gap-2 w-full">
            <input
              type="text"
              placeholder="Write a reply..."
              className="flex-1 bg-gray-100 dark:bg-[#122031] dark:text-white text-[14px] rounded-full px-4 py-2 outline-none border-none"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting || !replyContent.trim()} className="text-[#1890FF] font-semibold text-[14px]">
              Post
            </button>
          </form>
        )}

        {localReplies.length > 0 && (
          <div className="mt-2 border-l-[2px] border-gray-200 dark:border-gray-700 pl-4">
            {visibleReplies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} postId={postId} userId={userId} />
            ))}
            {localReplies.length > 0 && (
              <button 
                onClick={() => setShowAllReplies(!showAllReplies)} 
                className="text-[13px] font-semibold text-[#666] dark:text-white/60 hover:underline mt-2 bg-transparent border-none cursor-pointer p-0"
              >
                {showAllReplies ? "Hide replies" : `View ${localReplies.length} replies`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
