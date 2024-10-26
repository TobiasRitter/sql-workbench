import { BottomNavigation, Paper } from "@mui/material";
import React from "react";

export default function BottomNav({ children }: any) {
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
