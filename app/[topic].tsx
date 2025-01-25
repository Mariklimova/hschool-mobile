import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import storage from '../storage/index.json';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { CodeComponent } from '@/components/CodeComponent';
import { iDescription, iTopic } from '@/interfaces/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

import topicImageMap from '@/utils/topicImageMap';
import Heart from '@/assets/images/heartDislike';
import HeartDark from '@/assets/images/heartLike';

export default function DescriptionScreen() {
  const { topic } = useLocalSearchParams() as { topic: keyof typeof storage };
  const [activeTopic, setActiveTopic] = useState<iTopic>();
  const [favorites, setFavorites] = useState<iDescription[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadLikedQuestions = async () => {
    const storedLikes = await AsyncStorage.getItem('favoriteQuestions')
    if (storedLikes) {
      setFavorites(JSON.parse(storedLikes))
    }
  }

  const addToFavorites = async (item: iDescription) => {
    const updatedFavorites = favorites.some(fav => fav.id === item.id)
      ? favorites.filter(fav => fav.id !== item.id)
      : [...favorites, item];

    setFavorites(updatedFavorites)
    await AsyncStorage.setItem('favoriteQuestions', JSON.stringify(updatedFavorites));
    console.log(updatedFavorites);
  };

  useEffect(() => {
    setActiveTopic(storage[topic]);
    loadLikedQuestions()
  }, [topic]);

  const filteredDescriptions = activeTopic?.description.filter(el =>
    el.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#bde1eb', dark: '#473c1d' }}
      headerImage={<Image source={topicImageMap[topic]} style={styles.topicImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{topic}</ThemedText>
      </ThemedView>

      <TextInput
        style={styles.searchInput}
        placeholder="Поиск вопроса..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredDescriptions && filteredDescriptions.map((el, index: number) => (
        <Collapsible key={index} title={el.question}>
          <TouchableOpacity style={{ pointerEvents: 'auto' }} onPress={() => addToFavorites(el)}>
            {favorites.some(fav => fav.id === el.id) ? <Heart /> : <HeartDark />}
          </TouchableOpacity>

          <ThemedText>{el.answer}</ThemedText>

          {el.code && <CodeComponent code={el.code} />}


          {el.link && el.link.map((el, index) => el && <ExternalLink key={index} href={el}>
            <ThemedText type="link">Узнать больше #{index + 1}</ThemedText>
          </ExternalLink>)}
        </Collapsible>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicImage: {
    height: 250,
    width: 250,
    position: 'absolute',
    left: '20%',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
});