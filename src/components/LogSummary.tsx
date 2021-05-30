import React from "react";
import {
  Action,
  DoneState,
  ListOrdering,
  UpdatingState,
} from "../utils/reducer";
import LogList from "./LogList";
import OrderToggle from "./OrderToggle";

type LogSummaryProps = {
  state: (DoneState | UpdatingState) & { ordering: ListOrdering };
  dispatch: React.Dispatch<Action>;
};
export default function LogSummary({ state, dispatch }: LogSummaryProps) {
  const changeOrdering = (ordering: ListOrdering) => {
    dispatch({ type: "CHANGE_ORDERING", ordering });
  };

  const back = () => dispatch({ type: "RESET" });

  return (
    <section className="log-summary">
      <h2>Results</h2>
      <div className="order-by">
        <span>Order by </span>
        <OrderToggle
          ordering={state.ordering}
          changeOrdering={changeOrdering}
        />
      </div>
      <LogList ordering={state.ordering} logs={state.logs} />
      <button type="button" onClick={back}>
        Try another file?
      </button>
    </section>
  );
}
