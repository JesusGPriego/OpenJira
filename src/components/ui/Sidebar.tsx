import { useContext } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EmailOutlined } from '@mui/icons-material';
import { UIContext } from '../../context/ui';

const menuItem: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
  return (
    <Drawer anchor='left' open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 200 }}>
        <Box>
          <Typography
            variant='h4'
            align='center'
            sx={{
              padding: '5px',
            }}
          >
            Menú
          </Typography>
        </Box>
        <List>
          {menuItem.map((item, index) => (
            <ListItemButton key={item}>
              <ListItemIcon>
                {index % 2 ? <AccessTimeIcon /> : <EmailOutlined />}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {menuItem.map((item, index) => (
            <ListItemButton key={item}>
              <ListItemIcon>
                {index % 2 ? <AccessTimeIcon /> : <EmailOutlined />}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
