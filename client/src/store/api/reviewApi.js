import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_REACT_API_URL;

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  tagTypes: ['Reviews', 'Comments', 'Product'],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (params) => ({
        url: "/api/reviews",
        params: {data: JSON.stringify(params)}
      }),
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Product', id })),
          { type: 'Reviews', id: 'LIST' },
        ]
        : [{ type: 'Reviews', id: 'LIST' }],
    }),
    postReview: builder.mutation({
      query: (body) => ({
        url: "/api/reviews/create",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    likeReview: builder.mutation({
      query: (body) => {
        console.log(body)
        return {
          url: "/api/reviews/like",
          method: "POST",
          body,
          credentials: "include",
        }
      },
      invalidatesTags: [{type: 'Reviews', id: 'LIST'}]
    }),
    dislikeReview: builder.mutation({
      query: (body) => {
        console.log(body)
        return {
          url: "/api/reviews/dislike",
          method: "POST",
          body,
          credentials: "include",
        }
      },
      invalidatesTags: [{type: 'Reviews', id: 'LIST'}]
    }),
    getTags: builder.query({
      query: (params) => ({
        url: "/api/other/tags",
        params
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/api/other/categories"
      }),
    }),
    getProducts: builder.query({
      query: (params) => {
        console.log(params)
        return {
          url: `/api/products`,
          params
        }
      },
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Product', id })),
          { type: 'Product', id: 'LIST' },
        ]
        : [{ type: 'Product', id: 'LIST' }],
    }),
    getComments: builder.query({
      query: (data) => ({
        url: `/api/comments/${data ? data : ""}`,
      }),
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Comments', id })),
          { type: 'Comments', id: 'LIST' },
        ]
        : [{ type: 'Comments', id: 'LIST' }],
    }),
    postComment: builder.mutation({
      query: (body) => ({
        url: "/api/comments/create",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: [{type: 'Comments', id: 'LIST'}]
    }),
    postRating: builder.mutation({
      query: (body) => ({
        url: "/api/products/rating",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: [{type: 'Product', id: 'LIST'}]
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetTagsQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetCommentsQuery,
  usePostReviewMutation,
  useLikeReviewMutation,
  useDislikeReviewMutation,
  usePostCommentMutation,
  usePostRatingMutation
} = reviewApi;
