import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from './Typography';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';


const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://media.cnn.com/api/v1/images/stellar/prod/comfy-shoes-nike-new-lead.jpg?c=16x9&q=h_720,w_1280,c_fill',
    title: 'Shoes',
    width: '40%',
  },
  {
    url: 'https://static2.bigstockphoto.com/9/8/1/large1500/189060841.jpg',
    title: 'Jeans',
    width: '20%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYcpnZM0EfjnEXNfr-wk614g-efOr_VkJb1A&usqp=CAU',
    title: 'Coats',
    width: '40%',
  },
  {
    url: 'https://5.imimg.com/data5/ANDROID/Default/2023/1/FT/TQ/MC/16516658/product-jpeg-500x500.jpg',
    title: 'T-Shirts',
    width: '38%',
  },
  {
    url: 'https://media.istockphoto.com/id/484543793/photo/leather-jacket.jpg?s=612x612&w=0&k=20&c=4zu12-S24tSXMTkIa3KbVBbTwuYqLIyBa3xslfrz02A=',
    title: 'Jackets',
    width: '38%',
  },
  {
    url: 'https://cdn.create.vista.com/api/media/small/443110732/stock-photo-top-view-glass-bottle-nail-polish-pocket-pants-isolated-yellow',
    title: 'Trousers',
    width: '24%',
  }
];

export default function ProductCategories() {
  const navigate = useNavigate();
  const handleButtonClick = (url : any) => {
    navigate(url)
  };
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Select one of the categories
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
            onClick={() => handleButtonClick(`/products`)}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}