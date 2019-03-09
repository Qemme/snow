import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockOpen from '@material-ui/icons/LockOpen';
import DraftsIcon from '@material-ui/icons/Drafts';
import FaceIcon from '@material-ui/icons/Face';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

const styles = theme => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},
  });
  

class ProfileMenu extends React.Component {

    state = {
        open: false,
        anchorEl:null
      };
    
      handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          open: !state.open,
        }));
      };

      handleClose = event => {
        
        this.setState({ open: false });
      };

  render(){
      const {classes} = this.props;
      const { anchorEl, open } = this.state;
    
    return (
        <div>
            <Badge badgeContent={4}  id="Progress1" color="secondary"  >
                <Avatar alt="Remy Sharp" src="/static/1.jpg" onClick={this.handleClick}/>
            </Badge>

        <Popper open={open} anchorEl={anchorEl} transition disablePortal  placement="bottom-end" >
            {({ TransitionProps, placement }) => (
              <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                        <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Profile settings" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <LockOpen />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Sign off" />
                        </MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
              </Grow>
            )}
        </Popper>
      </div>
    );
  }
}


export default  withStyles(styles)(ProfileMenu);