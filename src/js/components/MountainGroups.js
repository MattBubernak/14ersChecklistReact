import React from 'react';
// import MountainStore from '../stores/mountainStore';
// import MountainActions from '../actions/MountainActions';
import MountainRange from './MountainRange';
import firebase, { auth, provider } from '../../firebase.js';
import Grid from 'material-ui/Grid';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class MountainGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mountains: {},
      userChecks: {},
      value: 0
    };

  }

  mountainsGroupedByRangeWithCheck() {
    let mountains = this.state.mountains;
    var ranges = {}
    var self = this;
    Object.keys(mountains).forEach(function(key){
      let mountain = mountains[key];
      if (ranges[mountain.range] == undefined) {
        ranges[mountain.range] = {}
        ranges[mountain.range]['name'] = mountain.range
        ranges[mountain.range]['mountains'] = {}
      }
      mountain['check'] = self.state.userChecks[key];
      ranges[mountain.range]['mountains'][key] = mountain;
    })
    return ranges;
  }


  componentWillReceiveProps(newProps) {
    this.retrieveUserChecks(newProps.user);
  }

  handleChange = (event, value) => {
    var newState = this.state
    newState.value = value
    this.setState(newState);
  };

  handleChangeIndex = index => {
    var newState = this.state
    newState.value = index
    this.setState(newState);
  };


  retrieveUserChecks(user) {
    if (user == undefined) {
      this.setState({ value: this.state.value, mountains: this.state.mountains, userChecks: {}})
      return;
    }
    let userChecks = firebase.database().ref('userChecks/' + user.uid);
    userChecks.on('value', (snapshot) => {
      let userChecks = snapshot.val() == undefined ? {} : snapshot.val();

      this.setState({ value: this.state.value,  mountains: this.state.mountains, userChecks: userChecks });
    })
  }

  componentWillMount() {
    let mountainRef = firebase.database().ref('mountains');
    mountainRef.on('value', (snapshot) => {
      let mountains = snapshot.val();
      this.setState({ value: this.state.value,  mountains: mountains, userChecks: this.state.userChecks });
    })
  }

  // componentWillUnmount() {
  //   MountainStore.removeChangeListener(this._onChange);
  // }

  render() {
    return (
      <div>
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              {Object.values(this.mountainsGroupedByRangeWithCheck()).map((mountainRange) => {
                return (<Tab label={mountainRange.name} />)
              })}
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            {Object.values(this.mountainsGroupedByRangeWithCheck()).map((mountainRange) => {
              return (<TabContainer><MountainRange key={mountainRange.name} mountainRange={mountainRange} user={this.props.user}/></TabContainer>);
            })}
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

export default MountainGroups;
