import {useSelector} from "react-redux";
import {Container, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useGetReviewsQuery} from "../store/api/reviewApi.js";

const columns = [
  {field: "title", headerName: "title", width: 320, editable: true},
  {field: "text", headerName: "text", width: 320, editable: true},
  {
    field: "rating",
    headerName: "rating",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    field: "product",
    headerName: "product",
    width: 90,
  },
];

export default function AccountPage() {
  const {user} = useSelector((state) => state.user);
  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useGetReviewsQuery({user_id: user?._id});

  const rows = reviews?.map((review) => ({
    id: review._id,
    text: review.text,
    title: review.title,
    rating: review.user_rating,
    product: review.product,
  }));

  return (
    <Container>
      <Typography variant="h6">{user?.username}</Typography>

      {!reviewsIsLoading && (
        <>
          <div style={{height: 400, width: "100%", marginTop: 10}}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </>
      )}
    </Container>
  );
}
