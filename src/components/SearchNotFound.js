import PropTypes from "prop-types";
// material
import { Paper, Typography } from "@material-ui/core";

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Tidak ditemukan
      </Typography>
      <Typography variant="body2" align="center">
        Tidak ada hasil yang ditemukan untuk &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Coba periksa kesalahan ketik
        atau menggunakan kata-kata lengkap.
      </Typography>
    </Paper>
  );
}
