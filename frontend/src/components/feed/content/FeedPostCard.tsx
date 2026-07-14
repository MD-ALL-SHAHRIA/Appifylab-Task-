"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post, Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useLikePostMutation, useCreateCommentMutation, useUpdatePostMutation, useDeletePostMutation } from "@/lib/redux/apiSlice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { CommentItem } from "./CommentItem";

export default function FeedPostCard({ post }: { post: Post }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const isAuthor = userId === post.author?.id;
  
  const [commentContent, setCommentContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || "");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  

  const commentsList = post.comments || [];
  const commentsCount = post.commentsCount !== undefined ? post.commentsCount : commentsList.length;
  const recentLikes = post.recentLikes || post.likes || [];
  
  const [likesCount, setLikesCount] = useState(post.likesCount !== undefined ? post.likesCount : post.likes?.length || 0);
  const initialReaction = post.userReaction !== undefined ? post.userReaction : post.likes?.find(like => like.userId === userId)?.reactionType || null;
  const [userReaction, setUserReaction] = useState<string | null>(initialReaction);
  
  const [showAllComments, setShowAllComments] = useState(false);
  const visibleComments = showAllComments ? commentsList : commentsList.slice(0, 2);
  
  useEffect(() => {
    const currentReaction = post.userReaction !== undefined ? post.userReaction : post.likes?.find((l) => l.userId === userId)?.reactionType || null;
    setUserReaction(currentReaction);
    setLikesCount(post.likesCount !== undefined ? post.likesCount : post.likes?.length || 0);
  }, [post.likes, post.likesCount, post.userReaction, userId]);

  const [likePost] = useLikePostMutation();
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleTurnOnNotification = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success("Notifications turned on for this post!");
  };

  const handleHidePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await updatePost({ postId: post.id, visibility: 'PRIVATE' }).unwrap();
      toast.success("Post hidden (set to private).");
    } catch (error) {
      toast.error("Failed to hide post.");
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id).unwrap();
      toast.success("Post deleted successfully.");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete post.");
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;
    try {
      await updatePost({ postId: post.id, content: editContent }).unwrap();
      setIsEditing(false);
      toast.success("Post updated!");
    } catch (error) {
      toast.error("Failed to update post.");
    }
  };

  const handleLike = async (reactionType: string = 'LIKE') => {
    try {
      const isRemoving = userReaction === reactionType;
      const wasEmpty = !userReaction;
      const optimisticReaction = isRemoving ? null : reactionType;
      
      setUserReaction(optimisticReaction);
      setLikesCount((prev) => {
        if (isRemoving) return prev - 1;
        if (wasEmpty) return prev + 1;
        return prev;
      });
      
      await likePost({ postId: post.id, reactionType }).unwrap();
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    try {
      await createComment({ postId: post.id, content: commentContent }).unwrap();
      setCommentContent("");
      setShowAllComments(true);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };
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
                  {post.author?.firstName} {post.author?.lastName}
                </h4>
              </Link>

              <p className="m-0 text-[13px] text-gray-500 dark:text-white/60 mt-1">
                {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : "Just now"} .{" "}
                <Link
                  href="#0"
                  className="hover:underline text-gray-500 dark:text-white/60 flex items-center gap-1 inline-flex"
                >
                  {post.visibility === 'PRIVATE' ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      Private
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                      Public
                    </>
                  )}
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
                      onClick={handleTurnOnNotification}
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

                  {isAuthor && (
                    <>
                      <DropdownMenuItem className="p-0">
                        <Link
                          href="#0"
                          onClick={handleHidePost}
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
                          Hide Post
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="p-0">
                        <Link
                          href="#0"
                          onClick={(e) => { e.preventDefault(); setIsEditing(true); setEditContent(post.content || ""); }}
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
                          onClick={(e) => { e.preventDefault(); setIsDeleteDialogOpen(true); }}
                          className="flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full cursor-pointer text-sm font-medium text-red-600 dark:text-red-400 border-none focus:bg-red-50 dark:focus:bg-red-900/20 outline-none rounded-none"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
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
                    </>
                  )}
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isEditing ? (
          <div className="mb-4 flex flex-col gap-2">
            <textarea
              className="w-full bg-gray-50 dark:bg-[#122031] text-gray-900 dark:text-white p-3 rounded-lg border border-gray-200 dark:border-[#384F68] focus:ring-1 focus:ring-blue-500 outline-none resize-none min-h-[100px]"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="What's on your mind?"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => { setIsEditing(false); setEditContent(post.content || ""); }}
                className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#192D43] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-4 py-1.5 rounded-md text-sm font-medium bg-[#1890FF] text-white hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-3 break-words whitespace-pre-wrap">
            {post.content}
          </h4>
        )}
        
        {post.images && post.images.length > 0 && post.images[0] !== '' && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <img
              src={post.images[0]?.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin.replace('3000', '3001') : 'http://localhost:3001')}${post.images[0]}` : post.images[0]}
              alt="Post image"
              className="w-full h-auto object-cover block"
            />
          </div>
        )}

        <div className="px-0 mb-[26px] flex justify-between items-center">
          <div className="flex items-center">
            {likesCount > 0 && (
              <div className="flex -space-x-[6px]">
                {recentLikes.slice(0, 5).map((like, i) => (
                  <div
                    key={like.id}
                    className={`rounded-full border-[1.5px] border-white dark:border-[#192D43] relative z-[${5 - i}] flex items-center justify-center w-[22px] h-[22px] bg-blue-500 text-white text-[10px] font-bold`}
                    title={like.user ? `${like.user.firstName} ${like.user.lastName}` : "User"}
                  >
                    {like.user ? like.user.firstName.charAt(0).toUpperCase() : "U"}
                  </div>
                ))}
              </div>
            )}
            <p className="text-[15px] text-[#666666] dark:text-white/60 ml-[6px] font-normal leading-none m-0 pt-[2px]">
              {likesCount}
            </p>
          </div>
          <div className="flex gap-4 text-[13px] text-[#666666] dark:text-white/60 m-0">
            <p className="m-0">
              <Link
                href="#0"
                className="hover:underline text-[#666666] dark:text-white/60"
              >
                <span>{commentsCount}</span> Comment
              </Link>
            </p>
            <p className="m-0 hover:underline cursor-pointer text-[#666666] dark:text-white/60">
              <span>0</span> Share
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 bg-[#FBFCFD] dark:bg-[#122031] p-2 rounded-[8px]">
          <div className="relative group flex-1 flex mx-[2px]">
            {}
            <div className="absolute bottom-full left-0 pb-2 hidden group-hover:flex z-50">
              <div className="flex bg-white dark:bg-[#192D43] shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-full px-3 py-2 gap-3 border border-gray-100 dark:border-[#384F68]">
                <button type="button" onClick={() => handleLike('LIKE')} className="hover:scale-125 transition-transform text-2xl px-1 border-none bg-transparent cursor-pointer" title="Like">👍</button>
                <button type="button" onClick={() => handleLike('LOVE')} className="hover:scale-125 transition-transform text-2xl px-1 border-none bg-transparent cursor-pointer" title="Love">❤️</button>
                <button type="button" onClick={() => handleLike('HAHA')} className="hover:scale-125 transition-transform text-2xl px-1 border-none bg-transparent cursor-pointer" title="Haha">😂</button>
              </div>
            </div>
            
            <button onClick={() => handleLike(userReaction || 'LIKE')} className={`flex items-center justify-center py-[9px] px-2 rounded-md ${userReaction ? 'bg-blue-50 dark:bg-[#1C334A] text-blue-600 dark:text-[#1890FF]' : 'bg-[#F2F3F5] dark:bg-[#1C334A] text-[#1890FF]'} text-[14px] font-normal hover:bg-[#e8e9eb] dark:hover:bg-[rgba(28,51,74,0.8)] transition-colors flex-1 border-none cursor-pointer w-full`}>
              <span className="flex items-center gap-[6px] pointer-events-none">
                {userReaction === 'LOVE' ? (
                  <span className="text-lg">❤️</span>
                ) : userReaction === 'HAHA' ? (
                  <span className="text-lg">😂</span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="none"
                    viewBox="0 0 19 19"
                  >
                    <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
                    <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z" />
                    <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z" />
                    <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z" />
                  </svg>
                )}
                {userReaction === 'LOVE' ? 'Loved' : userReaction === 'HAHA' ? 'Haha' : userReaction ? 'Liked' : 'Like'}
              </span>
            </button>
          </div>
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
            <form onSubmit={handleComment} className="flex items-center justify-between flex-wrap w-full relative">
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
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleComment(e as unknown as React.FormEvent);
                      }
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-4 absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={handleComment}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer p-0 flex items-center justify-center disabled:opacity-50"
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


            {visibleComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} postId={post.id} userId={userId} />
            ))}
            {commentsList.length > 2 && (
              <button 
                onClick={() => setShowAllComments(!showAllComments)} 
                className="text-[13px] font-semibold text-[#666] dark:text-white/60 hover:underline mt-2 bg-transparent border-none cursor-pointer p-0"
              >
                {showAllComments ? "Hide comments" : `View ${commentsCount - 2} more comments`}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#192D43] rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Post</h3>
            <p className="text-gray-500 dark:text-white/60 text-sm mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#122031] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
