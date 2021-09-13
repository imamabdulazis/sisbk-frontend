import React from "react";
import { Button, Card, Container, Stack, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import saveFill from "@iconify/icons-eva/save-fill";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";

function EditUser() {
  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={saveFill} />}
          >
            Sampan
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            Content
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

export default EditUser;
