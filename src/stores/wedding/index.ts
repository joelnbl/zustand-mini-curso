import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useBoundStore = create<ShareState>()(
  devtools(
    persist(
        (...a) => ({
          ...createPersonSlice(...a),
          ...createGuestSlice(...a),
          ...createDateSlice(...a),
          ...createConfirmationSlice(...a),
        }),
        {
        name: "wedding-storage",
      }
    )
  )
);
