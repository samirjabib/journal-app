import { ImageListItem, ImageList } from '@mui/material';
import { useJournalStore } from '../hooks';


export const ImageGallery = () => {

  const { active  }  = useJournalStore();
  
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { active.imageUrls.map((imgUrl) => (
        <ImageListItem key={imgUrl}>
          <img
            src={`${imgUrl}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${imgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='img-note'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
