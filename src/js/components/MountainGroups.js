import React from 'react';
// import MountainStore from '../stores/mountainStore';
// import MountainActions from '../actions/MountainActions';
import MountainRange from './MountainRange';
import firebase, { auth, provider } from '../../firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Grid from 'material-ui/Grid';

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

  retrieveUserChecks(user) {
    if (user == undefined) {
      this.setState({ mountains: this.state.mountains, userChecks: {}})
      return;
    }
    let userChecks = firebase.database().ref('userChecks/' + user.uid);
    userChecks.on('value', (snapshot) => {
      let userChecks = snapshot.val() == undefined ? {} : snapshot.val();

      this.setState({ mountains: this.state.mountains, userChecks: userChecks });
    })
  }

  componentWillMount() {
    let mountainRef = firebase.database().ref('mountains');
    mountainRef.on('value', (snapshot) => {
      let mountains = snapshot.val();
      this.setState({ mountains: mountains, userChecks: this.state.userChecks });
    })
  }

  // componentWillUnmount() {
  //   MountainStore.removeChangeListener(this._onChange);
  // }

  render() {
    return (
      <div className={styles.root}>
        <Grid container spacing={24} justify='center'>
          {Object.values(this.mountainsGroupedByRangeWithCheck()).map((mountainRange) => {
            return (<Grid item xs={12} md={6} sm={12} lg={3}><MountainRange key={mountainRange.name} mountainRange={mountainRange} user={this.props.user}/></Grid>);
          })}
        </Grid>
      </div>
    );
  }
}

export default MountainGroups;
