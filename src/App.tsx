import React, { useEffect } from "react";
import Confetti from "./components/Confetti";
import LogFileForm from "./components/LogFileForm";
import LogSummary from "./components/LogSummary";
import { HostMessage, WorkerMessage } from "./utils/messages";
import { reducer, initialState } from "./utils/reducer";

const worker = new Worker(new URL("./worker.ts", import.meta.url));

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const listener = (e: MessageEvent<WorkerMessage>) => {
      switch (e.data.type) {
        case "UPDATED":
          dispatch({ type: "UPDATED", logs: e.data.status });
          break;
        case "DONE":
          dispatch({ type: "DONE" });
          break;
        case "ERROR":
          dispatch({ type: "ERROR", error: e.data.error });
          break;
        default:
          throw new Error(
            `Received invalid worker message type: ${(e.data as any).type}`
          );
      }
    };

    worker.addEventListener("message", listener);

    return () => {
      worker.removeEventListener("message", listener);
    };
  }, []);

  const onFileSubmitted = async (file: File) => {
    const ab = await file.arrayBuffer();
    const msg: HostMessage = { type: "BEGIN", arrayBuffer: ab };
    worker.postMessage(msg, [ab]);
  };

  return (
    <main>
      <h1>Log Summary</h1>
      <section>
        {state.state === "initial" && (
          <LogFileForm onSubmit={onFileSubmitted} />
        )}
        {state.state === "updating" ||
          (state.state === "done" && (
            <LogSummary state={state} dispatch={dispatch} />
          ))}
        {state.state === "error" && <h2>Error!</h2>}
      </section>
      <Confetti status={state.state} />
    </main>
  );
}
