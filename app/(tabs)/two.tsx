import { FlatList, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { useContext } from 'react';
import { GameCard } from '@/components/gameCard';
import { GameListContext } from '@/context/gameList';

export default function FavoriteScreen() {
  const { gameList, isLoading } = useContext(GameListContext);
    
  return (
    <View style={styles.container}>
      <FlatList 
       data={gameList}
       showsVerticalScrollIndicator={false}
       renderItem={({ item }) => item.isFavorite ?
        <GameCard 
          iconURL={item.iconURL}
          rating={item.rating}
          title={item.title}
          key={item.id}
          id={item.id}
          isFavorite={item.isFavorite}
        /> : <></>
       }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  }
})
