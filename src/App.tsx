import { AccountCircle, Menu } from '@mui/icons-material';
import './App.css';
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, FormControl, FormHelperText, Icon, IconButton, InputAdornment, OutlinedInput, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

function Column({ children }: any) {
  return (
    <Stack spacing={2} alignItems="center">
      {children}
    </Stack>
  );
}

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

function BottomNav({ children }: any) {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        {children}
      </BottomNavigation>
    </Paper>
  );
}

function MenuBar({ title }: { title: string }) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box width={64}></Box>
      </Toolbar>
    </AppBar>
  );
}


function App() {
  return (
    <div className="App">
      <Column>
        <MenuBar title="Input" />
        <NumericInput label="Weight" unit="kg" />
        <NumericInput label="Number" />
        <PersonInput label="Contact" />
        <Row>
          <Button variant="contained">Text</Button>
          <Button variant="outlined">Text</Button>
        </Row>
      </Column>
      <BottomNav >
        <BottomNavigationAction label="Recents" icon={<AccountCircle />} />
        <BottomNavigationAction label="Favorites" icon={<AccountCircle />} />
        <BottomNavigationAction label="Nearby" icon={<AccountCircle />} />
      </BottomNav>
    </div>
  );
}

export default App;
