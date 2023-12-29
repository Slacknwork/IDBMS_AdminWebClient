import { store } from "/store";

const getUserStoreData = () => {
  console.log(store.getState().user);
};

export { getUserStoreData };
