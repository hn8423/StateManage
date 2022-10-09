import React,{useState} from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import useTodos from "../hooks/useTodos";
import useTodosAction from "../hooks/useTodosActions";

function BlackButton({onPress,title}:{onPress(): void; title: string}){
  return(
    <Pressable
      style={styles.button}
      onPress={onPress}
      android_ripple={{color: 'white'}}
      
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )
}

function TodoItem({id, text, done}: {id: number; text:string; done:boolean}){
  const {toggle, remove} = useTodosAction()

  const onToggle = () => {
  toggle(id)
  }
  const onRemove = () =>{
   remove(id)
  }

  return(
    <View style={styles.todo} >
      <Pressable onPress={onToggle} style={styles.toggle}>
        <Text style={done && styles.doneText}>{text}</Text>
      </Pressable>
      <BlackButton onPress={onRemove} title='삭제'/>
    </View>
  )
}

function Todos(){
  const todos = useTodos()

  return(
    <FlatList
    style={styles.todos}
    data={todos}
    renderItem={({item}) => (
      <TodoItem id={item.id} done={item.done} text={item.text}/>

    )}
    keyExtractor={(item) => item.id.toString()}
    ItemSeparatorComponent={() => <View style={styles.separator}/>
  }
    ListFooterComponent={() => <View style={styles.separator}/>}
/>

  )
}

function TodoInput(){
  const [text, setText] = useState('')
  const {add} = useTodosAction()


  const onPress = () => {
    add(text)
    setText('')
  }

  return(
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder='할일을 입력하세요'
        value={text}
        onChangeText={setText}
      />
      <BlackButton onPress={onPress} title='등록'/>
    </View>
  )
}



const styles = StyleSheet.create({
  block:{
    flex:1
  },
  inputWrapper:{
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  input:{
    flex:1
  },

  button:{
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    color: 'white'
  },
  todos:{
    flex:1
  },
  todo:{
    flexDirection:'row'
  },
  toggle:{
    justifyContent:'center',
    flex:1
  },
  doneText:{
    textDecorationLine:'line-through'
  },
  separator:{
    height:1,
    backgroundColor:'black'
  }
})

function TodoApp(){
  return(
    <SafeAreaView style={styles.block}>
      <Todos/>
      <TodoInput/>
    </SafeAreaView>
  )
}

export default TodoApp