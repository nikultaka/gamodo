import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export function Skeleton_favourite() {
  return (
    <>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={100} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={100} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={100} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={100} />
        </Stack>
      </Grid>
    </>
  );
}

export function Skeleton_search() {
  return (
    <>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={100} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={100} />
        </Stack>
      </Grid>
    </>
  );
}

export function Skeleton_upcomingMovies() {
  return (
    <>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={200} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={200} />
        </Stack>
      </Grid>
    </>
  );
}

export function Skeleton_blogs() {
  return (
    <>
      <Grid item xs={6}>
        <Stack spacing={2} style={{ paddingLeft: "15px" }}>
          <Skeleton variant="rounded" width={150} height={200} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={200} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} style={{ paddingLeft: "15px" }}>
          <Skeleton variant="rounded" width={150} height={200} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={150} height={200} />
        </Stack>
      </Grid>
    </>
  );
}

export function Skeleton_home_blogs() {
  return (
    <>
      <Grid item xs={6}>
        <Stack spacing={2} style={{ paddingLeft: "35px" }}>
          <Skeleton variant="rounded" width={250} height={150} />
        </Stack>
      </Grid>
    </>
  );
}

export function Skeleton_blogDetails_image() {
  return (
    <>
      <Grid item xs={6}>
        <Stack spacing={2} style={{ paddingLeft: "20px" }}>
          <Skeleton variant="rounded" width={200} height={100} />
        </Stack>
      </Grid>
    </>
  );
}

export function Skeleton_text() {
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box>
    </>
  );
}

export function Movie_trailer_skeleton() {
  return (
    <>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <Skeleton
            variant="rounded"
            width={376}
            height={327}
            style={{ borderRadius: "0 0 20px 20px" }}
          />
        </Stack>
      </Grid>
    </>
  );
}
