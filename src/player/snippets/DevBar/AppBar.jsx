import * as React from 'react';
import PropTypes from 'prop-types';

// context
import {usePlayer} from '../../context/'

// material
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';

// styles
import {styled} from 'styles/snippets'


const AppBar = styled.custom(MuiAppBar, theme => ({
  pointerEvents: 'all',
  width: 'max-content',
  borderRadius: theme.shape.borderRadius,
  top: theme.spacing(2),
  right: theme.spacing(2),
}))




const ResponsiveAppBar = (props) => {
  const player = usePlayer()
  const {state, cls} = player

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const icons = [
    ['Play/Stop', state.loaded ? 'pause' : 'play_arrow', () => {
      cls.playStop()
    }],
    ['Data state', 'info', () => props.handleMenu('state')],
    ['Debug data', 'tune', () => props.handleMenu('debug')],
    ['Logs', 'notifications', () => props.handleMenu('logs')],
    ['Commands', 'flag', () => props.handleMenu('commands')],
    ['Connection', 'vpn_key', () => props.handleMenu('connection')],
  ].map(([label, icon, onClick]) => ({label, icon, onClick}))

  const settings = [
    ['Restart stream', 'refresh', () => props.onRestart()]
  ].map(([label, icon, onClick]) => ({label, icon, onClick}))

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const renderMenu = (list) => {
    return (
      <div>
        {list.map((item, index) => (
          <MenuItem key={index} onClick={() => {
            handleCloseUserMenu()
            item.onClick()
          }}>
            <ListItemIcon>
              <Icon fontSize="small">{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText>
              {item.label}
            </ListItemText>
          </MenuItem>
        ))}
      </div>
    )
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2 }}
          >
            DEV
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {icons.map((item, index) => (
              <Tooltip key={index} title={item.label}>
                <IconButton
                  onClick={() => {
                    handleCloseNavMenu()
                    item.onClick()
                  }}
                  sx={{ color: 'white' }}>
                  <Icon>{item.icon}</Icon>
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, pl: 0, mr: -1 }}>
            <Tooltip title="Additional">
              <IconButton onClick={handleOpenUserMenu}>
                <Icon>menu</Icon>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {renderMenu(icons)}
                <Divider />
              </Box>
              {renderMenu(settings)}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


ResponsiveAppBar.propTypes = {
  handleMenu: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default ResponsiveAppBar;
