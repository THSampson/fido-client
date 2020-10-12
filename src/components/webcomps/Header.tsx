import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const Header = (props: any) => {
const classes = useStyles();
return (
    <div className={classes.root}>
    <header>
    <h2>Welcome Back {props.firstName}</h2>
    <Avatar alt="UserAvatar" src={props.photos} />
    </header>
    </div>
);
};

export default Header;