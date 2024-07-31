import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useContext } from 'react';
import { GameListContext } from '@/context/gameList';
import { GameCard } from '@/components/gameCard';

export default function GamesScreen() {
  const { gameList, isLoading, isRefreshing, handleRefreshing } = useContext(GameListContext);  
  
  return (
    <>
    { isLoading ? <Text>Loading...</Text> :
      <View style={styles.container}>
        <FlatList 
          data={gameList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => 
            <GameCard 
              iconURL={item.iconURL}
              rating={item.rating}
              title={item.title}
              id={item.id}
              key={item.id}
              isFavorite={item.isFavorite}
            />
          }
          refreshing={isRefreshing}
          onRefresh={handleRefreshing}
        />
      </View>
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  loading: {
    color: "white",
    textAlign: "center"
  }
})

