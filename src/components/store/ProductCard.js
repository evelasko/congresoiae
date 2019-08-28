import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import { colors } from '../../styles/theme';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    backgroundColor: colors.secondaryLight,
    alignContent: 'left',
    alignItems: 'left',
  },
  header: {
    alignContent: 'left',
    alignItems: 'left',
    alignSelf: 'left',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: '"Cormorant Garamond", serif',
    alignContent: 'left',
    alignItems: 'left',
    color: colors.secondary,
  },
  description: {
    color: colors.secondary,
    fontFamily: 'Tranx, sans-serif',
    fontSize: 12,
  },
  content: {
    fontFamily: '"Cormorant Garamond", serif',
    color: colors.secondaryDark,
  },
  price: {
    fontFamily: 'Tranx, sans-serif',
    fontSize: 24,
    marginLeft: 65,
    color: colors.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: colors.secondary,
  },
}));

export default function ProductCard({
  name,
  description,
  content,
  unitprice,
  iconurl,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{ root: classes.header }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <ShoppingCartSharpIcon />
          </Avatar>
        }
        title={
          <Typography variant="h6" classes={{ root: classes.title }}>
            {name}
          </Typography>
        }
        subheader={
          <Typography variant="caption" classes={{ root: classes.description }}>
            {' '}
            {description.toUpperCase()}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          iconurl ||
          'https://res.cloudinary.com/huh9ixig7/image/upload/v1566920778/congreso/ticket.png'
        }
        title={name}
      />

      <CardActions disableSpacing>
        <Typography
          variant="body2"
          classes={{ root: classes.price }}
          component="p"
        >
          {`${unitprice} €`}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography classes={{ root: classes.content }} paragraph>
            {content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
