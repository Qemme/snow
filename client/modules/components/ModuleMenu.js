import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ModuleIcon  from './ModuleIcon.js';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from "react-redux";
import router from 'next/router';
import Link from "next/link"; 
import { menuClick, moduleClick } from "../../redux/actions";

const styles = theme => ({
    root: {
      width: '100%',  
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    details :{
        padding:0,
        display:'block'
    },
    active:{
      'background-color':theme.palette.action.selected
    }
  });
  
  
class ModuleMenu extends Component{
  
    menuClick = (item)=>{
      this.props.menuClick(item.name)
      router.push(item.url);
     
    }

    render() {
        const { classes, moduleClick,selectedModule } = this.props;

        return  (<div className={classes.root}>
            {this.props.modules.map((item)=>{
            const { classes, drawerOpen, moduleClick,selectedModule } = this.props;
            let currActive = selectedModule === item.name;
          return  <ExpansionPanel key={item.name} 
              expanded={currActive}
              onChange={ ()=> moduleClick(item.name)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemIcon>
                        <ModuleIcon path={item.icon} />
                    </ListItemIcon>
              {drawerOpen  ?
                <Typography className={classes.heading}>{item.name}</Typography> :''}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                {
                  item.menuItems.map((item) =>{
                      let mnuActive = item.name==this.props.selectedMenu;
                     
                      return   <ListItem button key={item.name} className={mnuActive?classes.active :''}
                      onClick={() => this.menuClick(item)}
                         >
                      <ListItemIcon>
                          <ModuleIcon path={item.icon} />
                      </ListItemIcon>
                      {item.url.startsWith('http') ? 
                      <a href={item.url} target="_blank">
                        <ListItemText primary={item.name} />
                        </a>
                        :
                        <Link href={item.url}>
                        <ListItemText primary={item.name} />
                        </Link>}
                      </ListItem>;
                  })
                }
             
              </ExpansionPanelDetails>
            </ExpansionPanel>
            })}
          </div>
            )
      }
  
}
const mapStateToProps = state => {
    return { 
      drawerOpen:state.menu.drawerOpen,
      selectedMenu: state.menu.selectedMenu,
      selectedModule: state.menu.selectedModule
    };
};

const toExp = connect(mapStateToProps,
  {menuClick, moduleClick}
  )(withStyles(styles)(ModuleMenu));
export default toExp;