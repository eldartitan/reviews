import {useEffect, useState} from "react";
import {usePostReviewMutation} from "../store/api/reviewApi.js";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../firebase.js";
import {v4} from "uuid";
import {useForm} from "react-hook-form";
import ImageList from "../components/createReview/ImageList.jsx";
import ControllerTextField from "../components/createReview/ControllerTextField";
import ControllerProduct from "../components/createReview/ControllerProduct";
import ControllerTag from "../components/createReview/ControllerTag";
import ControllerCategories from "../components/createReview/ControllerCategories";
import {
  Container,
  Typography,
  Box,
  Button,
  Rating, Alert, Snackbar,
} from "@mui/material";

export default function CreateReviewPage() {
  const [postReview, result] = usePostReviewMutation();
  const {control, handleSubmit, reset} = useForm();

  const [user_rating, setRating] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [open, setOpen] = useState(false);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    if (result?.isSuccess) {
      reset(result);
      setImageUpload(null)
      setRating(0)
      setImageUrls([])
      setOpen(true)
    }
  }, [result]);

  useEffect(() => {
    uploadFile();
  }, [imageUpload]);

  const onSubmit = (data) => {
    postReview({...data, user_rating, images: imageUrls});
  };

  return (
    <Container component="main" maxWidth="sm" sx={{mb: 8}}>
      <Typography variant="h6">Creating review</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{mt: 1, width: "100%"}}
      >
        <ControllerTextField control={control} name="Title" rows={7} inputProps={{maxLength: 480}}/>
        <ControllerTextField control={control} name="Text" rows={120} inputProps={{maxLength: 120000}}/>

        <ControllerCategories control={control}/>
        <ControllerProduct control={control}/>
        <ControllerTag control={control}/>

        <ImageList
          images={imageUrls}
          imageUpload={imageUpload}
          setImages={(i) => setImageUpload(i)}
          uploadFile={() => uploadFile()}
        />
        <Box sx={{mt: 2, display: "flex"}}>
          <Typography>Rating</Typography>
          <Rating
            name="simple-controlled"
            value={user_rating}
            max={10}
            sx={{ml: 2}}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="inherit"
          sx={{mt: 2}}
        >
          Submit
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Alert severity="success" sx={{width: '100%'}}>
          Review has been created!
        </Alert>
      </Snackbar>
    </Container>
  );
}
