import * as React from 'react';

// material
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// snippets
import PreloaderProgress from '../Preloader/Progress'


function ContentDialog() {

  return (
    <Box sx={{mb: 4}}>

      <Typography variant="h5">
        Right now, MetaEditor is running a streaming server with Unreal Engine.
      </Typography>

      <Box sx={{my: 3}}>
        <PreloaderProgress />
      </Box>

      <Typography variant="body1" sx={{mb: 1}}>
        This is a demo version, and in production, the launch takes a couple of seconds.
      </Typography>
      <Typography variant="body1">
        While it's loading, let's get to know each other!
      </Typography>

    </Box>
  );
}

export default ContentDialog
