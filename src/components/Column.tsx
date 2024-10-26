import { Stack } from "@mui/material";

export default function Column({ children }: any) {
    return (
        <Stack spacing={2} alignItems="center">
            {children}
        </Stack>
    );
}
