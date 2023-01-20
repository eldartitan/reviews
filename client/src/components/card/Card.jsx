import InfoBlock from "./InfoBlock";
import ContentBock from "./ContentBock";
import ButtonsBlock from "./ButtonsBlock";
import Box from "@mui/material/Box";

export default function Card({ data }) {

  return (
    <Box
      sx={{
        borderRadius: 1,
        color: "#898989",
      }}
    >
      <InfoBlock
        username={data.username}
        created={data.createdAt}
        rating={data.user_rating}
        product={data.product}
      />
      <ContentBock
        id={data._id}
        text={data.text}
        title={data.title}
        tags={data.tags}
        images={data.images}
      />
      <ButtonsBlock
        likes={data.likes}
        comments={data.comments}
        id={data._id}
      />
    </Box>
  );
}
