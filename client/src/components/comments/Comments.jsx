import {useState} from "react";
import {useGetCommentsQuery, usePostCommentMutation} from "../../store/api/reviewApi";
import {Box, Button, Input, Stack, Typography} from "@mui/material";
import {formatFromNow} from "../../utils";

export default function Comments({review_id, user_id}) {
  const {data: comments, error, isLoading} = useGetCommentsQuery(review_id);
  const [postComment] = usePostCommentMutation();

  const [focus, setFocus] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleClickCansel = () => {
    setFocus(false);
    setCommentInput("");
  };

  const commentSubmit = () => {
    handleClickCansel();
    if (user_id) {
      postComment({
        user_id,
        review_id,
        text: commentInput,
      });
    } else {
      alert("")
    }
  };

  return (
    <>
      <Stack sx={{mt: 2, mb: 6}} spacing={2}>
        <Typography>{comments?.length} comments</Typography>
        <Input
          placeholder="Add a comment..."
          multiline
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onFocus={() => {
            if (!focus) setFocus(true);
            console.log(focus);
          }}
        />
        <Box display={focus ? "flex" : "none"} justifyContent="flex-end">
          <Button
            color="inherit"
            size="small"
            sx={{mr: 1}}
            onClick={handleClickCansel}
          >
            Cansel
          </Button>
          <Button
            color="inherit"
            size="small"
            onClick={commentSubmit}
            disabled={commentInput?.length === 0}
          >
            Comment
          </Button>
        </Box>
        {comments?.map((comment) => (
          <Stack spacing={1} key={comment._id}>
            <Stack direction="row" spacing={1}>
              <Typography fontWeight={700} variant="caption">
                {comment.username}
              </Typography>
              <Typography variant="caption">
                {formatFromNow(comment.createdAt)}
              </Typography>
            </Stack>
            <Typography variant="body2">{comment.text}</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
