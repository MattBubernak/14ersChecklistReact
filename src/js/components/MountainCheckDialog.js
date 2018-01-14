import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import firebase, { auth, provider } from '../../firebase.js';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import AcUnit from 'material-ui-icons/AcUnit'

import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

import TextField from 'material-ui/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

class MountainCheckDialog extends React.Component {
  constructor(props) {
    super(props);
    // If a check exists.
    this.state = {
      checked: false,
      open: false,
      winter: false,
      mountain: this.props.mountain,
      count: 0,
      notes: "",
      date: ""
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.mountain.check != undefined && newProps.mountain.check.checked) {
      this.state = {
        open: false,
        winter: newProps.mountain.check.winter || false,
        count: newProps.mountain.check.count || 0,
        notes: newProps.mountain.check.notes || "",
        mountain: newProps.mountain,
        checked: newProps.mountain.check.checked || false,
        date: newProps.mountain.check.date || ""
      };
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = () => {
    console.log('handling change');
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var newState = this.state

    newState[name] = value
    this.setState(newState);
  }

  handleSave = () => {
    var userChecks = firebase.database().ref("userChecks/" + this.props.user.uid + "/");
    userChecks.child(this.props.id).set({
      winter: this.state.winter,
      checked: this.state.checked,
      count: this.state.count,
      date: this.state.date,
      notes: this.state.notes,
    })
  }


  render() {
    if (this.props.mountain.check == undefined || this.props.mountain.check.checked == false) {
      return null;
    }
    else {
      return (
        <span>
          <IconButton fab mini aria-label="edit" onClick={this.handleClickOpen}>
            <ModeEditIcon />
          </IconButton>
          <Dialog
            fullWidth={true}
            transition={Slide}
            open={this.state.open}
            onClose={this.handleClose}>
            <DialogTitle id="simple-dialog-title">{this.props.mountain.name}</DialogTitle>
            <div>
              <DialogContent>
                <FormControl component="fieldset">
                  <FormGroup>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="winter"
                            checked={this.state.winter}
                            onChange={this.handleInputChange}
                          />
                        }
                        label="winter"
                      />
                      <AcUnit style={{'display': 'inline-flex', 'vertical-align': 'middle'}}/>
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      name="date"
                      id="date"
                      label="Date"
                      type="date"
                      defaultValue={this.state.date}
                      onChange={this.handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      type="number"
                      name="count"
                      label="Count"
                      value={this.state.count}
                      onChange={this.handleInputChange}
                      margin="normal"
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      name="notes"
                      id="multiline-flexible"
                      label="Notes"
                      multiline
                      rowsMax="10"
                      value={this.state.notes}
                      onChange={this.handleInputChange}
                      margin="normal"
                    />
                  </FormGroup>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Close
                </Button>
                <Button onClick={this.handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </span>
    );}
  }
}

MountainCheckDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MountainCheckDialog);
