import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPost, fetchPosts, deletePost } from '../actions/index';
import { Actions } from 'react-native-router-flux';


class PostsShow extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.bookId);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.bookId)
      .then(() => {
        const alertTitle = this.props.post.title + " has been Deleted!";
        Alert.alert(alertTitle, 'Please refresh Book Index to update data', [
          {text: 'OK', onPress: () => Actions.pop({ props: this.props.fetchPosts() }) }
        ]);
      });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <View style={styles.container}><Text>Loading...</Text></View>
    }

    console.log(post);

    return (
      <View style={styles.container}>
        <Text style={styles.dataDisplay}>
          <Text style={styles.label}>ID:  </Text>
          <Text style={styles.text}>{ post.id }</Text>
        </Text>
        <Text style={styles.dataDisplay}>
          <Text style={styles.label}>Categories:  </Text>
          <Text style={styles.text}>{ post.categories }</Text>
        </Text>
        <Text style={styles.dataDisplay}>
          <Text style={styles.label}>Content:  </Text>
          <Text style={styles.text}>{ post.content }</Text>
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.onDeleteClick.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 70
  },
  dataDisplay: {
    padding: 20
  },
  text: {
    fontSize: 14,
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'red',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, fetchPosts, deletePost })(PostsShow);
