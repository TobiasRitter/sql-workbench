import { AccountCircle } from '@mui/icons-material';
import './App.css';
import { AppBar, BottomNavigation, Box, Button, InputAdornment, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import Column from './components/Column';
import MiniDrawer from './components/Drawer';

function Row({ children }: any) {
  return (
    <Stack spacing={2} direction="row">
      {children}
    </Stack>
  );
}

function NumericInput({ label, unit }: { label: string, unit?: string }) {
  if (!unit) {
    unit = "";
  }

  return (
    <TextField label={label} type="number" slotProps={{
      input: {
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
      },
    }}></TextField>
  );
}

function PersonInput({ label }: { label: string }) {
  return (
    <TextField label={label} slotProps={{
      input: {
        endAdornment: <InputAdornment position="end"> <AccountCircle /></InputAdornment>,
      },
    }}></TextField>
  );
}

function TitleBar({ title }: { title: string }) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h3" >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="App">
      <MiniDrawer open={open} toggleDrawer={toggleDrawer} />
      <Row>
        <Box width={open ? 225 : 50}></Box>
        <Column>
          <TitleBar title="Contact Details" />
          <NumericInput label="Weight" unit="kg" />
          <NumericInput label="Number" />
          <PersonInput label="Contact" />
          <Row>
            <Button variant="contained">Text</Button>
            <Button variant="outlined">Text</Button>
          </Row>
        </Column>
      </Row>
    </div >
  );
}

export default App;
