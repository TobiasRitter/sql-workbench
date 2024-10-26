import { AccountCircle } from '@mui/icons-material';
import './App.css';
import { BottomNavigation, BottomNavigationAction, Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, Paper, Stack, TextField } from '@mui/material';
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

function UnitInput({ label, unit }: { label: string, unit: string }) {
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
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
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


function App() {
  return (
    <div className="App">
      <Column>
        <UnitInput label="Weight" unit="kg" />
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
