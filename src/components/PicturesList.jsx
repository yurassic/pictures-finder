import React from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const PicturesList = ({ pictures }) => (
  <GridList cellHeight={160} cols={3}>
    {pictures.map((picture) => (
      <GridListTile key={picture.id} cols={1}>
        <img src={picture.webformatURL} alt={picture.tags} />
      </GridListTile>
    ))}
  </GridList>
);

PicturesList.propTypes = {
  pictures: PropTypes.array.isRequired,
};

export default React.memo(PicturesList);
