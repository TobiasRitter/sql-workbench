import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Stack } from '@mui/material';

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

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
                    },
                    open
                        ? {
                            justifyContent: 'initial',
                        }
                        : {
                            justifyContent: 'center',
                        },
                ]}
            >
                <ListItemIcon
                    sx={[
                        {
                            minWidth: 0,
                            justifyContent: 'center',
                        },
                        open
                            ? {
                                mr: 2,
                            }
                            : {
                                mr: 'auto',
                            },
                    ]}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    sx={[
                        open
                            ? {
                                opacity: 1,
                            }
                            : {
                                opacity: 0,
                            },
                    ]}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default function MiniDrawer() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open}>
                <DrawerItem text="Menu" open={open} icon={<MenuIcon />} onClick={handleDrawerClose} />
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, _index) => (
                        DrawerItem({ text, open, icon: <InboxIcon />, onClick: handleDrawerClose })
                    ))}
                </List>
            </Drawer>
        </Box >
    );
}
