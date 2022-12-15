import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useJournalStore } from "../hooks"
import { useMemo } from "react";


export const SidebarItem = (note, imageUrls = [] ) => {

    const { title, body, id, date } = note;



    const { onClickActiveNote  } = useJournalStore()

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[ title ])


    const noteActiveHandle = () => {
        onClickActiveNote( { title, body, id, date, imageUrls })
    }
    



    return(
    <ListItem disablePadding>
        <ListItemButton onClick={ noteActiveHandle }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
    )
} 