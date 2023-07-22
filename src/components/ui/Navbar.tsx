import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { UIContext } from '../../context/ui';
export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuIcon />
        </IconButton>
        <Link
          component={NextLink}
          href='/'
          passHref
          underline='none'
          color={'white'}
        >
          <Typography variant='h5'>OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
