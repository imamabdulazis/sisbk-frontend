import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
// utils
// import { fCurrency } from "../../../utils/formatNumber";
//
import ColorPreview from "../../components/ColorPreview";
import Label from "../../components/Label";
import { fCurrency } from "../../utils/formatNumber";

// ----------------------------------------------------------------------

const ContactImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ContactCard.propTypes = {
  item: PropTypes.object,
};

export default function ContactCard({ item }) {
  const { name, email, phone, address, image_url, job_desc, edu_title } = item;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ContactImgStyle alt={name} src={image_url} />
      </Box>

      <Stack spacing={0} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name} {edu_title}
          </Typography>
        </Link>
        <Typography variant="subtitle3">{email}</Typography>
        <Typography variant="subtitle3">{phone}</Typography>
        <Typography variant="subtitle3">{address}</Typography>
      </Stack>
    </Card>
  );
}
