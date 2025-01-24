import { TouchableOpacity, StyleSheet, Image, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import topicImageMap from '@/utils/topicImageMap';
import { useState, useEffect } from 'react';
import storage from '@/storage/index.json';
import { iDescription, iTopic } from '@/interfaces/index';

export default function HomeScreen() {
  // const topics = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'SQL', 'noSQL', 'Node.js'];
  const topics = ['HTML', 'CSS', 'JavaScript', 'SQL', 'Node.js', 'React', 'TypeScript', 'noSQL'];
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); // Изменен тип состояния на строку
  const [matchedQuestions, setMatchedQuestions] = useState<iDescription[]>([]); // Для хранения совпадений

  const handleTopicPress = (topic: string) => {
    router.navigate(topic);
  };

  const handleSearch = () => {
    const topicData = storage[searchQuery];
    if (topicData) {
      const results = topicData.description.filter((el:iDescription) =>
        el.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMatchedQuestions(results); 
      if (results.length > 0) {
        router.navigate(results[0].link[0]);
      } else {
        console.log('Нет совпадений'); 
      }
    } else {
      console.log('Нет совпадений2'); 
    }
  };

  useEffect(() => {
   
    setMatchedQuestions(storage[topics[0]].description); 
  }, []);

  return (
    <LinearGradient
      colors={['#A1CEDC', '#e4edef']}
      style={styles.container}
    >

      <Image source={require('@/assets/images/HS.png')} style={{ width: '75%', position: 'relative', bottom: '10%' }} resizeMode='contain' />

      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <ThemedText type='title'>Выберите тему:</ThemedText>

        
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск вопросов..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />

        <View style={styles.topicList}>
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicButton}
              onPress={() => handleTopicPress(topic)}
            >
              <Image source={topicImageMap[topic]} style={styles.topicImage} />
              <ThemedText>{topic}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchInput: {
      width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },


  topicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    zIndex: 100
  },
  topicButton: {
    // backgroundColor: '#f1f1f1',
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    // pointerEvents: 'auto', 
    alignItems: 'center',
  },
  topicImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
});