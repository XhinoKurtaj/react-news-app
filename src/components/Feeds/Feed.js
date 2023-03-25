import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "../Modal/Modal";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import API from "../../config/axiosConfig";
import Swal from "sweetalert2";

export default function Feed(props) {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("feeds");
      setFeeds(response.data.feeds);
    };
    fetchData();
  }, []);

  const handleClick = (item) => {
    props.searchByFeed(item);
  };

  const createFeed = (feed) => {
    let cpFeeds = [...feeds];
    cpFeeds.push(feed);
    setFeeds(cpFeeds);
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
                  <Chip
                    key={item.id}
                    label={`${item.type} | ${item.feed}`}
                    onClick={() => handleClick(item)}
                    onDelete={() => handleDelete(item.id)}
                  />
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
