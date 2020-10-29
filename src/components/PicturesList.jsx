import React from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const PicturesList = ({ pictures, onImageClick }) => (
  <GridList cellHeight={160} cols={3}>
    {pictures.map((picture) => (
      <GridListTile key={picture.id} cols={1}>
        <img
          style={{ cursor: "pointer" }}
          data-testid="picture"
          src={picture.webformatURL}
          alt={picture.tags}
          onClick={() => onImageClick(picture.largeImageURL)}
        />
      </GridListTile>
    ))}
  </GridList>
);

PicturesList.propTypes = {
  pictures: PropTypes.array.isRequired,
  onImageClick: PropTypes.func,
};

export default React.memo(PicturesList);
