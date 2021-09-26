import PropTypes from "prop-types";
// material
import { Grid } from "@material-ui/core";
import ContactCard from "./ContactCard";

// ----------------------------------------------------------------------

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default function ContactList({ contacts, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {contacts.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={3}>
          <ContactCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
