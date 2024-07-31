import { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import AntDesign from '@expo/vector-icons/AntDesign';

import { GameListContext, GameProps } from "@/context/gameList";

const GameCard = ({ title, iconURL, rating, id, isFavorite }: GameProps, href: string) => {
  const { setGameList } = useContext(GameListContext);

  const toggleOnPress = (id: number) => {
    setGameList(prev => prev.map(obj => obj.id === id ? {...obj, isFavorite: true} : obj))
  }

  const removeFavorite = (id: number) => {    
    setGameList(prev => prev.map(obj => obj.id === id ? {...obj, isFavorite: false} : obj))
  }  
  
  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Image 
          source={{ uri: iconURL }}
          style={styles.image}
        />
        <View style={styles.about}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.rating}>Rating: {rating}</Text>
        </View>
        {isFavorite ? 
          <AntDesign name="star" size={24} color="#a28218" onPress={() => removeFavorite(id!)}/> : 
          <AntDesign name="staro" size={24} color="#c4c4cc" onPress={() => toggleOnPress(id!)}/>}
      </View>
      <Link 
        href={{
          pathname: "/details/[id]",
          params: { id }
        }}
        asChild
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202024",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 20,
    marginTop: 16
  },
  upperSection: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between"
  },
  about: {
    display: "flex",
    alignItems: "flex-start",
    gap: 6
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderColor: "#37ad78",
    borderWidth: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#37ad78"
  },
  rating: {
    fontSize: 12,
    color: "#c4c4cc"
  },
  button: {
    width: "auto",
    backgroundColor: "#37ad78",
    color: "#c4c4cc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#c4c4cc",
    fontWeight: "bold"
  }
})

export { GameCard }