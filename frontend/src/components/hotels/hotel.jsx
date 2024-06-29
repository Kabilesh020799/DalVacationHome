import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Hotel() {
  return (
    <ImageList 
    sx={{
      paddingTop: '60px',
      margin: '0 80px',
      overflowX: 'hidden',
      overflowY: 'hidden'
    }}
    cols={4} // Adjust the number of columns as needed
    gap={16} // Adjust the gap between items as needed
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1713192706971-03900dcf5706?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWxzJTIwYW5kJTIwcm9vbXMlMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzJTIwYW5kJTIwcm9vbXMlMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1713192705328-66dc7c972953?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1718359759373-1b2670b7478b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1713192707550-8748c992fc7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1706756601729-6dcba36e6ce1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1651987089530-1a9a0d7dcd06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1588013279432-6f35538c93cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1640598783301-3551c3e5e1f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fGhvdGVscyUyMGFuZCUyMHJvb21zJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];