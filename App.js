import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { TextInput,StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state=
    {chatmessage:"",
     chatmessage:[]
    }


    
  }

  componentDidMount(){
    this.socket = io('exp://127.0.0.1:19000');
    this.socket.on("chat message", msg=>{
      this.setState({chatmessage:[...this.state.chatmessage,msg]})
    })
  }

  submitChatmessage(){
    this.socket.emit("Chat Message",this.state.chatmessage)
    this.setState({chatmessage:""});
  }
  render(){
    const chatmessages = this.state.chatmessage.map(chatmessage=><Text key={chatmessage}>{chatmessage}</Text>)
    return (
      <View style={styles.container}>
        <Text>Socket is its working ???? </Text>
        <TextInput 
        style={{height:40,borderWidth:3}}
        autoCorrect={false}
        value={this.state.chatmessage}
        onSubmitEditing={()=>this.submitChatmessage()}
        onChangeText={chatmessage=>this.setState({chatmessage})}
        
        />
      <StatusBar style="auto" />
      {chatmessages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
