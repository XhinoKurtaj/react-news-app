import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "../Modal/Modal";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import API from "../../config/axiosConfig";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";

import { updateFeed } from "../../redux/feedsReducer";

export default function Feed(props) {
  const [feeds, setFeeds] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState("");

  const dispatch = useDispatch();
  const feedsData = useSelector((state) => state.FeedsReducer.feeds);

  useEffect(() => {
    if (feedsData.length > 0) {
      setFeeds(feedsData);
    } else {
      fetchData();
    }
  }, [feedsData]);

  const fetchData = async () => {
    const response = await API.get("feeds");
    setFeeds(response.data.feeds);
    dispatch(updateFeed(response.data.feeds));
  };

  const handleClick = (item) => {
    setSelectedFeed(item.id);
    props.searchByFeed(item);
  };

  const createFeed = (feed) => {
    let cpFeeds = [...feeds];
    cpFeeds.push(feed);
    setFeeds(cpFeeds);
    dispatch(updateFeed(cpFeeds));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await API.delete(`feed/${id}`);
        const updateFeeds = feeds.filter((object) => object.id !== id);
        setFeeds(updateFeeds);
        dispatch(updateFeed(updateFeeds));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={10}>
          <Stack direction="row" spacing={1}>
            <Grid container spacing={1}>
              {feeds.map((item) => (
                <Grid item xs={6} lg={2}>
                  {item.id === selectedFeed ? (
                    <Chip
                      key={item.id}
                      label={`${item.type} | ${item.feed}`}
                      onClick={() => handleClick(item)}
                      onDelete={() => handleDelete(item.id)}
                    />
                  ) : (
                    <Chip
                      key={item.id}
                      label={`${item.type} | ${item.feed}`}
                      onClick={() => handleClick(item)}
                      onDelete={() => handleDelete(item.id)}
                      variant="outlined"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Modal onCreate={createFeed} />
        </Grid>
      </Grid>
    </Container>
  );
}
