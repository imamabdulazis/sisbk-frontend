import PropTypes from "prop-types";
// material
import { Grid } from "@material-ui/core";
import CategoryQuizCard from "./CatetoryQuizCard";

// ----------------------------------------------------------------------

CategoryQuizList.propTypes = {
  category: PropTypes.array.isRequired,
};

export default function CategoryQuizList({ category, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {category.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={3}>
          <CategoryQuizCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
