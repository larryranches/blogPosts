
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Actions } from 'react-native-router-flux';
import Separator from './separator';

class PostsIndex extends Component {
  constructor() {
    super();
    
    this.state = {
      isRefeshing: false
    } 
  }
  
  componentWillMount() {
    this.props.fetchPosts();
  }
  
  onRefresh() {
    this.setState({ isRefeshing: true });
    this.props.fetchPosts().then(() => {
      this.setState({ isRefeshing: false });
    })
  }
  
  render() {
    var blogPosts = this.props.posts;
    
    var blogList = blogPosts.map((post, index) => {
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => Actions.postsShow({ bookId: post.id, title: post.title })}
              underlayColor='transparent'>
              <Text style={styles.description}> { post.title } </Text>                       
            </TouchableOpacity>                    
          </View>          
          <Separator />
        </View>         
      )
    })
    
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefeshing}
              onRefresh={this.onRefresh.bind(this)}
              tintColor="#ff0000"
              title="Loading..." />
          }>
          { blogList }
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomContainerText}>
            Pull down and hold scrollview to refresh data
          </Text>
        </View>               
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#ffffff'
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  },
  bottomContainer: {
    height: 50,
    backgroundColor: '#993F6C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainerText: {
    fontSize: 14,
    color: '#ffffff'
  }
});

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

