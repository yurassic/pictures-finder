import axios from "axios";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import SearchForm from "./components/SearchForm";
import PicturesList from "./components/PicturesList";

import { getUrl } from "./pixabayConfig";

import "./App.css";

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [nothingFound, setNothingFound] = useState(false);

  const getPictures = async (keyWord) => {
    setIsFetching(true);
    setError(null);

    try {
      const { data } = await axios.get(getUrl(keyWord));
      setIsFetching(false);
      setNothingFound(data?.total === 0);
      setPictures(data?.hits);
    } catch (error) {
      setIsFetching(false);
      setError(error?.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid
        className="app-wrapper"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <SearchForm onSubmit={getPictures} />
        <Box m={2} />
        {isFetching ? (
          <CircularProgress size={70} disableShrink />
        ) : (
          <>
            <PicturesList pictures={pictures} />
            {nothingFound && (
              <Alert variant="filled" severity="error">
                We don't found any picture, please try again with another words
              </Alert>
            )}
            {error && (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default App;
