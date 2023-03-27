export function checkFav(arrayOfObject, value) {
  const checkUsername = (obj) => obj.game_name == value;
  return arrayOfObject?.length > 0 && arrayOfObject.some(checkUsername);
}
