import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { colors } from '../../styles/theme';

const contentStyles = makeStyles(theme => ({
  content: {
    fontFamily: '"Cormorant Garamond", serif',
    color: colors.secondaryDark,
  },
  button: {
    fontFamily: 'Tranx, sans-serif',
    color: colors.secondaryLight,
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: colors.secondary,
    color: colors.secondaryLight, // 'white',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: colors.secondaryLight,
  },
  title: {
    fontFamily: 'Tranx, sans-serif',
    letterSpacing: '1px',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography classes={{ root: classes.title }} variant="h6">
        {children.toUpperCase()}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: colors.secondaryLight,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: colors.secondary,
  },
}))(MuiDialogActions);

export default function StoreDialog({
  open = false,
  close,
  closeDialog = 'Close Dialog',
  title = 'Dialog Title',
  body = 'Dialog body',
}) {
  const classes = contentStyles();
  return (
    <div>
      <Dialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={close}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {body.split(`\n`).map((p, idx) => (
            <Typography
              classes={{ root: classes.content }}
              key={idx}
              gutterBottom
            >
              {p}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={close}
            classes={{ root: classes.button }}
            color="primary"
          >
            {closeDialog}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
