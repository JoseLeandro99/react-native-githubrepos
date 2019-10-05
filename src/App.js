import React, {useState} from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {

  const [user,setUser] = useState('');
  const [repos,setRepos] = useState([]);

  async function getRepos() {
    let response = await api.get(`/users/${user}/repos`);
    setRepos(response.data);
  }

  return (
    <View style={styles.container}>
     
      <View style={styles.search}>
        <TextInput style={styles.input} onChangeText={text => {setUser(text)}} placeholder="usuário.." />
        <TouchableOpacity style={styles.button} onPress={() => {getRepos()}}>
          <Text style={styles.buttonText}>buscar</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.results}>

        {repos.map(repo => (
          <View key={repo.id} style={styles.repo}>
            <Text style={styles.repoTitle}>{repo.name}</Text>
          <Text numberOfLines={3} style={styles.repoDescription}>
            {repo.description}
          </Text>
        </View>
        ))}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FBCEEB',
  },
  search: {
    borderRadius: 4,
    backgroundColor: '#ffffff',
    padding: 8,
    flexDirection: 'row',
  },
  input: {
    width: '75%',
    borderColor: '#eeeeee',
    color: '#555555',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 20,
  },
  button: {
    width: '25%',
    backgroundColor: '#006CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  results: {
    paddingHorizontal: 8,
    paddingTop: 4,
    marginTop: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  repo: {
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    marginVertical: 4,
  },
  repoTitle: {
    color: '#555555',
    fontSize: 22,
    fontWeight: '400',
  },
  repoDescription: {
    fontSize: 14,
    color: '#333333',
    marginTop: 5,
  },
  labelUsername: {
    fontSize: 14,
    color: '#444444',
  },
});
