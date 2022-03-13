/* Usage

// material
import Button from '@mui/material/Button';

// components
import CustomDialog from 'components/Dialog/'

function demo() {
  const refDialog = React.useRef(null)

  return (
    <div>
      <CustomDialog
        ref={refDialog}
        title="Some title"
        subtitle="Some subtitle"
        closeIcon
        showActions
      >
        <div>Dialog content</div>
      </CustomDialog>

      <Button onClick={() => refDialog.current.open()}>
        Open dialog
      </Button>

      <Button onClick={() => refDialog.current.close()}>
        Close dialog
      </Button>

    </div>
  )
}
*/

import * as React from 'react';
import PropTypes from 'prop-types';

// material
import {styled} from 'styles/snippets'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MiuDialogContentText from '@mui/material/DialogContentText';
import MuiDialogTitle from '@mui/material/DialogTitle';



const Dialog = styled.custom(MuiDialog, theme => ({

}))

const DialogTitle = styled.custom(MuiDialogTitle, theme => ({
  padding: theme.spacing(3, 4),
  '&[data-variant="icon"]': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottom: `solid 1px ${theme.palette.divider}`,
    '& > button': {
      marginRight: theme.spacing(-1),
    }
  },

}))

const DialogContent = styled.custom(MuiDialogContent, theme => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
}))

const DialogContentText = styled.custom(MiuDialogContentText, theme => ({
  paddingBottom: theme.spacing(3),
}))

const DialogActions = styled.custom(MuiDialogActions, theme => ({
  padding: theme.spacing(4),
  '&[data-variant="actions"]': {
    padding: theme.spacing(3, 4),
    borderTop: `solid 1px ${theme.palette.divider}`,
  },
}))

function CustomDialog({buttonConfirm, ...props}) {
  const [open, setOpen] = React.useState(false);

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({

		open: () => {
      handleClickOpen()
    },
    close: () => {
      handleClose()
    },

	}));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose()
  };

  let variant
  if(props.closeIcon) variant = 'icon'
  if(props.showActions) variant = 'actions'


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={props.maxWidth}>
        <DialogTitle data-variant={variant}>
          {props.title}
          {props.closeIcon && (
            <IconButton onClick={handleClose}>
              <Icon>close</Icon>
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>

          {props.subtitle ? (
            <DialogContentText>
              {props.subtitle}
            </DialogContentText>
          ) : ''}

          {props.children}
        </DialogContent>
        {props.showActions && (
          <DialogActions data-variant={variant}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              color={buttonConfirm.color}
              disabled={buttonConfirm.disabled}
              variant="contained"
              onClick={async () => {
                const res = await buttonConfirm.onClick()
                if(typeof res === 'boolean' && res === false) return ;

                handleClose()
              }}>
              {buttonConfirm.label}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

CustomDialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  closeIcon: PropTypes.bool,
  showActions: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  buttonConfirm: PropTypes.exact({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  maxWidth: PropTypes.string,
}

CustomDialog.defaultProps = {
  showActions: true,
  closeIcon: true,
  onClose: () => {},
  buttonConfirm: {
    label: 'Confirm',
    onClick: () => {},
    color: 'primary',
    disabled: false,
  },
  maxWidth: 'sm',
}


export default React.forwardRef((props, ref) => (
	<CustomDialog {...props} innerRef={ref} />
))
