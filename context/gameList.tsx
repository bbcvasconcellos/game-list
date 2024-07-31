import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export interface GameProps {
  iconURL: string;
  id?: number;
  rating: number;
  title: string;
  isFavorite?: boolean;
}

interface ContextProps {
  gameList: GameProps[];
  setGameList: Dispatch<SetStateAction<GameProps[]>>;
  isLoading: boolean;
  isRefreshing: boolean;
  handleRefreshing: () => void;
}

export const GameListContext = createContext({} as ContextProps);

export const GameListProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameList, setGameList] = useState<GameProps[] | []>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

  const fetchGamesData = async() => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://mock-game-api-9a408f047f23.herokuapp.com/api/games`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': "01964fa8-f0e5-40fc-a13b-9f5c3a5415f3"
        }
      });      
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const formatData = data.map((dt: GameProps) => ({...dt, isFavorite: false}))
      setGameList([...formatData]);
      
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshing = () => {
    setIsRefreshing(true);
    fetchGamesData();
    setIsRefreshing(false);
  }

  useEffect(() => {
    fetchGamesData();
  }, []);

  return (
    <GameListContext.Provider value={{ gameList, setGameList, isLoading, isRefreshing, handleRefreshing }}>
      { children }
    </GameListContext.Provider>
  )
}