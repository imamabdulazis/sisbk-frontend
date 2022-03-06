import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
// utils
// import { fCurrency } from "../../../utils/formatNumber";
//
import ColorPreview from "../../components/ColorPreview";
import Label from "../../components/Label";
import { fCurrency } from "../../utils/formatNumber";
import moment from "moment";

// ----------------------------------------------------------------------

const ContactImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

CategoryQuizCard.propTypes = {
  item: PropTypes.object,
};

export default function CategoryQuizCard({ item }) {
  const { title, users, updated_at } = item;

  return (
    <Card>
      <Box sx={{ pt: "0%", position: "relative" }}></Box>

      <Stack spacing={0} sx={{ p: 3 }}>
        <Link
          to={`/app/tes_siswa/${item.id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="caption">{users.name}</Typography>
        <Typography variant="caption">
          {moment(updated_at).format("DD MMM yyyy")}
        </Typography>
      </Stack>
    </Card>
  );
}
