import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
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
import StorageIcon from '@mui/icons-material/Storage';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const drawerWidthExpanded = 210;
export const drawerWidthCollapsed = 65;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidthExpanded,
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidthCollapsed,
    overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidthExpanded,
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

function TitleBar({ title, open, toggleDrawer }: { title: string, open: boolean, toggleDrawer: any }) {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: "12px", ml: "-14px" }}
                    onClick={toggleDrawer}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Spacer />
                <StorageIcon sx={{ mr: "8px" }} />
                my-sql-db
                <SignalCellularAltIcon sx={{ mr: "8px", ml: "24px" }} />
                Connected
                <SettingsIcon sx={{ ml: "64px" }} />
            </Toolbar>
        </AppBar>
    );
}

export default function MiniDrawer({ title, open, toggleDrawer }: { title: string, open: boolean, toggleDrawer: any }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <TitleBar title={title} open={open} toggleDrawer={toggleDrawer} />
            <Drawer variant="permanent" open={open}>
                <Toolbar />
                <Box height={16} />
                <DrawerItem text="Tables" open={open} icon={<TableChart />} onClick={() => { }} />
                <DrawerItem text="Car Lines" open={open} icon={<DirectionsCarIcon />} onClick={() => { }} />
                <DrawerItem text="Domains" open={open} icon={<PieChartIcon />} onClick={() => { }} />
                <DrawerItem text="Contacts" open={open} icon={<PersonIcon />} onClick={() => { }} />
                <DrawerItem text="Measurements" open={open} icon={<BoltIcon />} onClick={() => { }} />
                <Spacer />
                <DrawerItem text="Assistant" open={open} icon={<AssistantIcon />} onClick={() => { }} />
                <Box height={16} />
            </Drawer>
        </Box >
    );
}
