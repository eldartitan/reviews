import {useGetReviewsQuery} from "../store/api/reviewApi.js";
import {useLocation} from "react-router";
import {Grid, Container} from "@mui/material";
import TagsPanel from "../components/TagsPanel.jsx";
import Card from "../components/card/Card.jsx";
import {useState} from "react";

const MainPage = () => {
  const location = useLocation();
  const [params, setParams] = useState(null);
  const {data: reviews, error, isLoading} = useGetReviewsQuery({...location?.state, ...params})

  return (
    <>
      {reviews && Array.isArray(reviews) && (
        <Container maxWidth="sm" sx={{my: 2}}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1.5}
          >
            <Grid item>
              <TagsPanel setSort={(s) => setParams(s)} params={params?.params} />
            </Grid>
            {!isLoading &&
              reviews?.map((review) => {
                return (
                  <Grid item key={review._id}>
                    <Card data={review} />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      )}
    </>
  );
};
export default MainPage;
