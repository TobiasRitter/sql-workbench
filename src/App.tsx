import { AccountCircle } from '@mui/icons-material';
import './App.css';
import { AppBar, BottomNavigation, Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import Column from './components/Column';
import MiniDrawer from './components/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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

function TitleBar({ title, open, toggleDrawer }: { title: string, open: boolean, toggleDrawer: any }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function App() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="App">
      <Column>
        <TitleBar title="Contact Details" open={open} toggleDrawer={toggleDrawer} />
        <MiniDrawer title="Contact Details" open={open} toggleDrawer={toggleDrawer} />
        <Row>
          <Box width={open ? 225 : 50}></Box>
          <Column>
            <NumericInput label="Weight" unit="kg" />
            <NumericInput label="Number" />
            <PersonInput label="Contact" />
            <Row>
              <Button variant="contained">Text</Button>
              <Button variant="outlined">Text</Button>
            </Row>
          </Column>
        </Row>
      </Column>
    </div >
  );
}

export default App;
