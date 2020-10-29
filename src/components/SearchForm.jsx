import { useRef, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const SearchForm = ({ onSubmit }) => {
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { current } = ref;

    if (current?.value.length < 2) {
      return setError("Add at least 2 symbol");
    }

    if (current?.value.length > 30) {
      return setError("Can't be more than 30 symbols");
    }

    setError(null);
    onSubmit(current?.value);
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
        helperText={error}
        error={!!error}
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
