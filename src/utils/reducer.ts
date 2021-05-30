import { LogState } from "./parseLog";

export type ListOrdering = "unique" | "all";

export type InitialState = { state: "initial" };

export type UpdatingState = {
  state: "updating";
  logs: LogState;
};

export type DoneState = {
  state: "done";
  logs: LogState;
};

export type ErrorState = {
  state: "error";
  error: string;
};

export type State = { ordering: ListOrdering } & (
  | InitialState
  | UpdatingState
  | DoneState
  | ErrorState
);

export type Action =
  | { type: "UPDATED"; logs: LogState }
  | { type: "DONE" }
  | { type: "ERROR"; error: string }
  | { type: "CHANGE_ORDERING"; ordering: ListOrdering }
  | { type: "RESET" };

export const initialState: State = {
  ordering: "all",
  state: "initial",
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATED":
      return { state: "updating", logs: action.logs, ordering: state.ordering };
    case "DONE":
      return {
        state: "done",
        logs: (state as UpdatingState).logs,
        ordering: state.ordering,
      };
    case "ERROR":
      return { state: "error", error: action.error, ordering: state.ordering };
    case "CHANGE_ORDERING":
      return { ...state, ordering: action.ordering };
    case "RESET":
      return initialState;
    default:
      throw new Error(
        `Unknown action type passed to reducer: ${(action as any).type}`
      );
  }
}
