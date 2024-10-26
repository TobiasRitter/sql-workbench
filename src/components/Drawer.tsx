import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TableChart from '@mui/icons-material/TableChart';
import AssistantIcon from '@mui/icons-material/Assistant';
import BoltIcon from '@mui/icons-material/Bolt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    width: 65,
    overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

function DrawerItem({ text, open, icon, onClick }: { text: string, open: boolean, icon: any, onClick: any }) {
    return (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={onClick}
                sx={[
                    {
                        minHeight: 48,
                        px: 2.5,
                        justifyContent: open ? "initial" : "center",
                    }
                ]}>
                <ListItemIcon
                    sx={[
                        {
                            minWidth: 0,
                            justifyContent: 'center',
                            mr: open ? "24px" : "auto",
                        },
                    ]}>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    sx={[
                        {
                            opacity: open ? 1 : 0,
                        },
                    ]}
                />
            </ListItemButton>
        </ListItem>
    )
}

function Spacer() {
    return (
        <Box sx={{ flexGrow: 1 }} />
    )
}

export default function MiniDrawer({ title, open, toggleDrawer }: { title: string, open: boolean, toggleDrawer: any }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: "12px", ml: "-14px" }}
                        onClick={toggleDrawer}
                    >
                        {open ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar />
                <DrawerItem text="Tables" open={open} icon={<TableChart />} onClick={() => { }} />
                <DrawerItem text="Car Lines" open={open} icon={<DirectionsCarIcon />} onClick={() => { }} />
                <DrawerItem text="Domains" open={open} icon={<PieChartIcon />} onClick={() => { }} />
                <DrawerItem text="Contacts" open={open} icon={<PersonIcon />} onClick={() => { }} />
                <DrawerItem text="Measurements" open={open} icon={<BoltIcon />} onClick={() => { }} />
                <Spacer />
                <DrawerItem text="Assistant" open={open} icon={<AssistantIcon />} onClick={() => { }} />
                <DrawerItem text="Settings" open={open} icon={<SettingsIcon />} onClick={() => { }} />
            </Drawer>
        </Box >
    );
}
