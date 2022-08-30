import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getSingleProduct,
  reviewProduct,
} from "../../redux/actions/productAction";
import { useAlert } from "react-alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
  height: "80vh",
  overflow: "auto",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const alert = useAlert();

  const {
    isReady,
    query: { pid },
  } = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  //formdata handling==========================================
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [email,setEmail] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
    if (isReady) {
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("comment", comment);
      myForm.set("rating", rating);
      myForm.set("subject", subject);
      myForm.set("id", pid);
      dispatch(reviewProduct(myForm));
      setName("");
      setSubject("");
      setEmail("");
      setComment("");
      setOpen(false);
      alert.success("Your review has been sent");
    }
  };

  return (
    <div className="">
      <Button
        className="bg-[#081828] hover:bg-[#0167f3]  text-white p-3 rounded-sm "
        onClick={handleOpen}
      >
        Leave a Review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="" sx={style}>
          <Typography
            className="p-8 text-2xl"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Leave a Review
          </Typography>
          <form action="" className="" onSubmit={submitHandle}>
            <div className="flex-wrap p-4 capitalize sm:flex border-y">
              <div className="p-3 basis-1/2">
                <label htmlFor="name">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border"
                  name="name"
                  type="text"
                  required
                />
              </div>
              <div className="p-3 basis-1/2">
                <label htmlFor="subject">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border"
                  name="subject"
                  type="text"
                  required
                />
              </div>
              <div className="p-3 basis-1/2">
                <label htmlFor="email">your email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="border" name="subject" type="email" />
              </div>
              <div className="p-3 basis-1/2">
                <label>Rating</label>
                <select
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  className="block p-3 w-full rounded-md border outline-none"
                  name=""
                  id=""
                  required
                >
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
              </div>
              <div className="p-3 w-full">
                <label htmlFor="review">Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="block w-full rounded-md border"
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>
            <Button
              className="bg-[#0167f3] hover:bg-[#081828] trnasition duration-300 ease text-white p-3 rounded-sm m-8"
              type="submit"
            >
              Leave a Review
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
