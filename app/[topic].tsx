import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import storage from '../storage/index.json';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { CodeComponent } from '@/components/CodeComponent';
import { iDescription, iTopic } from '@/interfaces/index';

import topicImageMap from '@/utils/topicImageMap';
import Star from '@/assets/images/starLight';
import StarDark from '@/assets/images/starDark';

export default function DescriptionScreen() {
  const { topic } = useLocalSearchParams() as { topic: keyof typeof storage };
  const [activeTopic, setActiveTopic] = useState<iTopic>();
  const [favorites, setFavorites] = useState<iDescription[]>([]);

  useEffect(() => {
    if (topic) {
      setActiveTopic(storage[topic]);
    }
  }, [topic]);

  const toggleFavorite = useCallback((item: iDescription) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.includes(item)) {
        console.log( [...prevFavorites, item]);
        return [...prevFavorites, item];
      } 
      return prevFavorites
    })
  }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#bde1eb', dark: '#473c1d' }}
      headerImage={<Image source={topicImageMap[topic]} style={styles.topicImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{topic}</ThemedText>
      </ThemedView>

      {activeTopic?.description &&
        activeTopic?.description.map((el, index: number) => (
          <Collapsible key={index} title={el.question}>
            <TouchableOpacity style={{pointerEvents:'auto'}} onPress={() => toggleFavorite(el)}>
            {favorites.includes(el) ? <StarDark /> : <Star />}
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
});