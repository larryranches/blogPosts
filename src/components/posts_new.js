import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPost, fetchPosts } from '../actions/index';

var Form = t.form.Form;

const Book = t.struct({
  title: t.String,
  categories: t.String,
  content: t.String
})

const options = {
  fields: {
    title: {
      error: 'Enter a Title'
    },
    categories: {
      error: 'Enter Categories'
    },
    content: {
      error: 'Enter Content'
    }
  }
}

class PostsNew extends Component {

  onPress() {
    var formValue = this.refs.form.getValue();

    if (formValue) {
      console.log(formValue);

      this.props.createPost(formValue)
        .then(() => {
          const alertTitle = formValue.title + " has been Added!";
          Alert.alert(alertTitle, 'Please refresh Book Index to update data', [
            {text: 'OK', onPress: () => Actions.pop({ props: this.props.fetchPosts() }) }
          ]);
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Book}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default connect(null, { createPost, fetchPosts })(PostsNew);
