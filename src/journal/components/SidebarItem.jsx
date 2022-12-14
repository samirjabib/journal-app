import { useJournalStore } from "../hooks"

export const SidebarItem = ({title, body, id, date, imageUrls = [] }) => {


    const { onClickActiveNote } = useJournalStore()


    const onClickNote = () => {
        onClickActiveNote ( {title, body, id, date, imageUrls})
    }


    
    const newTitle = useMemo( () => { //con esta funcion reducimos el tamaño del title si es muy largo. 
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[ title ])

    return(
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
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