import React from 'react';

// import MountainStore from '../stores/mountainStore';
import MountainList from './MountainList';
// import elk_mountains from '../../images/elk_mountains.jpg';
import Card, { CardActions, CardContent, CardMedia, CardHeader} from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

class MountainRange extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   mountains: MountainStore.getAllMountains(),
    // };

    // this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    // this.setState({})
    // this.setState({ mountains: MountainStore.getAllMountains() });
  }

  componentWillMount() {
    //MountainStore.addChangeListener(this._onChange);
  }

  getCompletedCount() {
    var completed =  Object.values(this.props.mountainRange.mountains).reduce( function(acc, mountain) {
        acc += (mountain.check && mountain.check.checked) ? 1 : 0;
        return acc;
        }
      , 0)
    var total = Object.keys(this.props.mountainRange.mountains).length;
    return completed + "/" + total
  }


  // componentWillUnmount() {
  //   MountainStore.removeChangeListener(this._onChange);
  // }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card} key={this.props.mountainRange.name}>
          <CardHeader title={this.props.mountainRange.name + " " + this.getCompletedCount() }/>
          <CardMedia
            className={classes.media}
            image={require('../../images/' + this.props.mountainRange.name.replace(/ /g,"_").toLowerCase() + '.jpg')}
          />
          <CardContent>
            <MountainList mountains={this.props.mountainRange.mountains} user={this.props.user}/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

MountainRange.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MountainRange);
