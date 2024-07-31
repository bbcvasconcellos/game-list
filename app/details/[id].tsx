import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface DetailsProps {
  bannerURL: string;
  description: string;
  iconURL: string;
  id: number;
  rating: number;
  title: string;
}

export default function Details() {
  const { id: gameID } = useLocalSearchParams();
  const [details, setDetails] = useState<DetailsProps>({} as DetailsProps);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGameDetails = async() => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://mock-game-api-9a408f047f23.herokuapp.com/api/games/${gameID}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': "01964fa8-f0e5-40fc-a13b-9f5c3a5415f3"
        }
      });      
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }      
      const data = await response.json();      
      setDetails(data);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchGameDetails();
  }, [])
  
  return (
    <ScrollView>
      <View style={styles.imagesContainer}>
        <Image 
          source={{ uri: details.bannerURL }}
          style={styles.banner}
        />
        <Image
          source={{ uri: details.iconURL }}
          style={styles.icon}
        />
      </View>
      <View style={styles.outerContainer}>
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{details.title}</Text>
          <Text style={styles.rating}>{details.rating}</Text>
        </View>
        <View>
          <Text style={styles.description}>{details.description}</Text>
        </View>
      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imagesContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 40,
    flex: 1
  },
  banner: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    flex: 1
  },
  icon: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 2,
    position: "absolute",
    top: 170
  },
  outerContainer: {
    paddingHorizontal: 12
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#202024",
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  header: {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#37ad78",
  },
  rating: {
    color: "white",
  },
  description: {
    color: "white",
    lineHeight: 18
  }
})