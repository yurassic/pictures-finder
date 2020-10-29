import axios from "axios";
import { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";

import SearchForm from "./components/SearchForm";
import PicturesList from "./components/PicturesList";

import { getUrl, PER_PAGE } from "./pixabayConfig";
import { calculatePagesCount } from "./helpers";

import "./App.css";

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const keyWordRef = useRef(null);

  const getPictures = async (keyWord, page = 1) => {
    setIsFetching(true);
    setError(null);
    setCurrentPage(page);
    keyWordRef.current = keyWord;

    try {
      const { data } = await axios.get(getUrl(keyWord, page));
      setIsFetching(false);
      setTotalCount({
        pages: calculatePagesCount(data?.totalHits, PER_PAGE),
        pictures: data?.total,
      });
      setPictures(data?.hits);
    } catch (error) {
      setIsFetching(false);
      setError(error?.message);
    }
  };

  const handlePagination = (e, value) => {
    getPictures(keyWordRef.current, value);
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
            {totalCount?.pictures > 0 && (
              <>
                <PicturesList pictures={pictures} />
                <Box m={1} />
                <Pagination
                  count={totalCount?.pages}
                  color="primary"
                  onChange={handlePagination}
                  page={currentPage}
                />
                <Box m={1} />
              </>
            )}
            {totalCount?.pictures === 0 && (
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
