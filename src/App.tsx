import './App.css';
import { Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, Stack, TextField } from '@mui/material';

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
    <TextField label={label} slotProps={{
      input: {
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
      },
    }}></TextField>
  );
}


function App() {
  return (
    <div className="App">
      <Column>
        <UnitInput label="Weight" unit="kg" />
        <Row>
          <Button variant="contained">Text</Button>
          <Button variant="outlined">Text</Button>
        </Row>
      </Column>
    </div>
  );
}

export default App;
