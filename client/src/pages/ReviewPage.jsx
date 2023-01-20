import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {Rating, Stack, Typography, Container} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import SimpleSlider from "../components/slider/SimpleSlider.jsx";
import MyButton from "../components/ButtonBorderRadius.jsx";
import TagsPanel from "../components/TagsPanel";
import {average, formatFromNow} from "../utils/index.js";
import {
  useDislikeReviewMutation,
  useGetProductsQuery,
  useGetReviewsQuery, useLikeReviewMutation, usePostRatingMutation,
} from "../store/api/reviewApi";
import Comments from "../components/comments/Comments";

const ReviewPage = () => {
  const {id} = useParams();
  const {user} = useSelector((state) => state.user);

  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsLoading,
  } = useGetReviewsQuery({_id: id});
  const review = !reviewsLoading && reviews ? reviews[0] : undefined;

  const {
    data: products,
    error: productsError,
    isLoading: productsIsLoading,
  } = useGetProductsQuery({value: review?.product});
  const product = !productsIsLoading && products ? products[0] : undefined;
  console.log(product)

  const [likeReview] = useLikeReviewMutation();
  const [dislikeReview] = useDislikeReviewMutation();
  const [postRating] = usePostRatingMutation();

  const liked = review?.likes.includes(user?._id);
  const rating = product?.rating?.find((f) => f.user_id === user?._id)?.value;

  const handleLikeClick = () => {
    if (!liked) likeReview({review_id: review._id, user_id: user});
    else dislikeReview({review_id: review._id, user_id: user});
  };

  const handleChangeRating = (event) => {
    postRating({
      product: review?.product,
      user_id: user?._id,
      value: event.target.value,
    })
  };

  if (review)
    return (
      <>
        <Container maxWidth="md" sx={{mt: 3, fontFamily: "Roboto"}}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography fontWeight={700} variant="caption">
                {review.username}
              </Typography>
              <Typography variant="caption">
                posted {formatFromNow(review.createdAt)}
              </Typography>
            </Stack>

            <Typography variant={"h6"}>{review.title}</Typography>
            <TagsPanel tags={review.tags}/>
            <Typography variant="body2" whiteSpace="pre-line">
              {review.text}
            </Typography>

            <SimpleSlider images={review?.images}/>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
            >
              <Stack>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {product?.value} &#183; {review.category}{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    alignItems: "center",
                    display: "inline",
                  }}
                >
                  Review rating:
                  <Rating
                    defaultValue={review.user_rating}
                    max={10}
                    readOnly
                    size="small"
                  />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    alignItems: "center",
                    display: "inline",
                  }}
                >
                  Users average rating: {average(product?.rating)}
                </Typography>
                {user && (
                  <Typography
                    variant="body1"
                    sx={{
                      alignItems: "center",
                      display: "inline",
                    }}
                  >
                    Your rating:{" "}
                    <Rating
                      onChange={(event) => handleChangeRating(event)}
                      value={Number(rating)}
                      max={5}
                      size="small"
                    />
                  </Typography>
                )}
              </Stack>
              <MyButton onClick={handleLikeClick}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={liked ? {color: "#ff4500"} : null}
                >
                  {liked ? (
                    <Favorite sx={{height: 22, width: 22}}/>
                  ) : (
                    <FavoriteBorderOutlined sx={{height: 22, width: 22}}/>
                  )}
                  <span>{review.likes?.length}</span>
                </Stack>
              </MyButton>
            </Stack>
          </Stack>
          <Comments review_id={id} user_id={user?._id} />
        </Container>
      </>
    );
};

export default ReviewPage;
