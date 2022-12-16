import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useAuthStore } from '../../auth/hooks';
import { useJournalStore } from '../hooks';
import { SidebarItem } from './SidebarItem';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useAuthStore();
    const {  notes } = useJournalStore();

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                   notes.map( note => {

                    const noteWithImg = {
                        ...note,
                        imageUrl:[]
                    }
                    
                    return(
                        <SidebarItem key={note.id} {...noteWithImg} />
                    )
                   })
                }
            </List>

        </Drawer>

    </Box>
  )
}
