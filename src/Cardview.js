import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Cardview(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         Branch incharge: {props.branch_incharge}
        </Typography>
        <Typography variant="h5" component="h2">
          Name: {props.branch_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Contact: {props.contact}
        </Typography>
        <Typography variant="body2" component="p">
        Address: {props.address}
          <br />
          {props.city}
          <br />
          {props.pincode}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Cardview