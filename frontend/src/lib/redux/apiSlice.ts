import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "Notification"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    getFeed: builder.query({
      query: (cursor?: string) => cursor ? `/posts/feed?cursor=${cursor}` : "/posts/feed",
      providesTags: ["Post"],
      
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg) {
          
          currentCache.items.push(...newItems.items);
          currentCache.nextCursor = newItems.nextCursor;
        } else {
          
          currentCache.items = newItems.items;
          currentCache.nextCursor = newItems.nextCursor;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
      async onQueryStarted(postData, { dispatch, queryFulfilled }) {
        try {
          const { data: createdPost } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getFeed", undefined, (draft) => {
              if (draft && draft.items) {
                draft.items.unshift(createdPost);
              }
            })
          );
        } catch {}
      },
    }),
    updatePost: builder.mutation({
      query: ({ postId, ...updates }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        body: updates,
      }),
      async onQueryStarted({ postId, ...updates }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getFeed", undefined, (draft) => {
            if (draft && draft.items) {
              const index = draft.items.findIndex((p: any) => p.id === postId);
              if (index !== -1) {
                Object.assign(draft.items[index], updates);
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getFeed", undefined, (draft) => {
            if (draft && draft.items) {
              draft.items = draft.items.filter((p: any) => p.id !== postId);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    likePost: builder.mutation({
      query: (likeData) => ({
        url: `/posts/${likeData.postId}/like`,
        method: "POST",
        body: { reactionType: likeData.reactionType },
      }),
    }),
    createComment: builder.mutation({
      query: (commentData) => ({
        url: `/posts/${commentData.postId}/comments`,
        method: "POST",
        body: { content: commentData.content, parentId: commentData.parentId },
      }),
      async onQueryStarted(commentData, { dispatch, queryFulfilled }) {
        try {
          const { data: createdComment } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getFeed", undefined, (draft) => {
              const post = draft.items.find((p: any) => p.id === commentData.postId);
              if (post) {
                if (!commentData.parentId) {
                  if (!post.comments) post.comments = [];
                  post.comments.push(createdComment);
                } else {
                  const addReply = (comments: any[]) => {
                    for (const c of comments) {
                      if (c.id === commentData.parentId) {
                        if (!c.replies) c.replies = [];
                        c.replies.push(createdComment);
                        return true;
                      }
                      if (c.replies && addReply(c.replies)) {
                        return true;
                      }
                    }
                    return false;
                  };
                  if (post.comments) addReply(post.comments);
                }
              }
            })
          );
        } catch {}
      },
    }),
    likeComment: builder.mutation({
      query: (likeData) => ({
        url: `/posts/${likeData.postId}/comments/${likeData.commentId}/like`,
        method: "POST",
      }),
    }),
    getNotifications: builder.query({
      query: () => "/notifications",
      providesTags: ["Notification"],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllNotificationsRead: builder.mutation({
      query: () => ({
        url: `/notifications/read-all`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { 
  useRegisterMutation,
  useGetFeedQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useCreateCommentMutation,
  useLikeCommentMutation,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation
} = apiSlice;
