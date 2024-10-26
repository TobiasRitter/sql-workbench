import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
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
                            mr: open ? 2 : "auto",
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

export default function MiniDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open}>
                <DrawerItem text="Menu" open={open} icon={open ? <CloseIcon /> : <MenuIcon />} onClick={toggleDrawer} />
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, _index) => (
                        DrawerItem({ text, open, icon: <InboxIcon />, onClick: toggleDrawer })
                    ))}
                </List>
            </Drawer>
        </Box >
    );
}
