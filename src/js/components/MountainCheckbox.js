import React from 'react';
// import MountainStore from '../stores/mountainStore';
// import MountainActions from '../actions/MountainActions';
import Checkbox from 'material-ui/Checkbox';
import firebase, { auth, provider } from '../../firebase.js';
import { FormGroup, FormControlLabel } from 'material-ui/Form';


class MountainCheckbox extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChecked(event){
    var userChecks = firebase.database().ref("userChecks/" + this.props.user.uid + "/");
    var newCheckedState = this.props.check ? !this.props.check.checked : true
    userChecks.child(this.props.id).set({
      checked: newCheckedState
    })
  }

  render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            label="{this.props.name}"
            id={this.props.id}
            type="checkbox"
            onChange={this.handleChecked.bind(this)}
            checked={this.props.check ? this.props.check.checked : false}
            disabled={this.props.user ? false : true}
          />
        }
        label={this.props.name}
      />
    );
  }
}

export default MountainCheckbox;
