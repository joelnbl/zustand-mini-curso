import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

type PersonStore = PersonState & Actions;

const storeApi: StateCreator<PersonStore, [["zustand/devtools", never]]> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set(state => ({ firstName: value }), false, "setFirstName"),
  setLastName: (value: string) => set(state => ({ lastName: value }), false , "setLastName"),
});



export const usePersonStore = create<PersonStore>()(
  // logger(
  devtools(
    persist(storeApi, {
      name: "person-storage",
      storage: firebaseStorage
    })
  )
  // )
);
