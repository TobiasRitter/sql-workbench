import { AccountCircle } from '@mui/icons-material';
import './App.css';
import { AppBar, BottomNavigation, Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import Column from './components/Column';
import MiniDrawer from './components/Drawer';
import { drawerWidthCollapsed, drawerWidthExpanded } from "./components/Drawer";

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

function App() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="App">
      <Column>
        <MiniDrawer title="Add New Contact" open={open} toggleDrawer={toggleDrawer} />
        <Toolbar />
        <Row>
          <Box width={(open ? drawerWidthExpanded : drawerWidthCollapsed) - 15}></Box>
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
