import { addReducer } from "../../State";
import { store } from "../../Store";

export const addReducers = () => {
  addReducer({ type: "app", store });
  addReducer({ type: "user", store });
  addReducer({ type: "settings", store });
};
