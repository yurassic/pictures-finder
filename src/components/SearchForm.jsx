import { useRef } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const SearchForm = ({ onSubmit }) => {
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ref?.current?.value);
  };

  return (
    <form
      style={{ width: "100%" }}
      data-testid="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Type words associated with the pictures you are looking for"
        fullWidth
        variant="outlined"
        inputRef={ref}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
