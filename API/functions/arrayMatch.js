import CatGameCard from "@/components/ProductCard/CatGameCard";

export const arrayCompare = (favouriteList, data) => {
  
  const arrayComparedata = favouriteList?.filter(({ game_name: name1 }) =>
    data?.some(({ game_name: name2 }) => name1 === name2)
  );

  const arrayMatchData = data?.find(
    (item) => item?.game_name == arrayComparedata[0]?.game_name
  )?.game_name;

  
};
