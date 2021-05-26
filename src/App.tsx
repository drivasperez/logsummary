import React, { useEffect } from "react";
import { HostMessage, WorkerMessage } from "./utils/messages";
import { LogState } from "./utils/parseLog";

const worker = new Worker(new URL("./worker.ts", import.meta.url));

export default function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [workerStatus, setWorkerStatus] =
    React.useState<"pending" | "loading" | "done" | "error">("pending");
  const [workerState, setWorkerState] = React.useState<undefined | LogState>();

  useEffect(() => {
    const listener = (e: MessageEvent<WorkerMessage>) => {
      switch (e.data.type) {
        case "UPDATED":
          setWorkerState(e.data.status);
          setWorkerStatus("loading");
          break;
        case "DONE":
          setWorkerStatus("done");
          break;
        case "ERROR":
          setWorkerStatus("error");
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    const ab = await file.arrayBuffer();
    const msg: HostMessage = { type: "BEGIN", arrayBuffer: ab };
    worker.postMessage(msg, [ab]);
  };

  return (
    <main>
      <h1>Hello, world</h1>
      <p>This is a react app</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="upload">
          Upload file: <input name="upload" ref={inputRef} type="file" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>Status: {workerStatus}</p>
      <ul>
        {Array.from(workerState?.entries() ?? [])
          .sort(
            ([, aPathState], [, bPathState]) =>
              bPathState.views - aPathState.views
          )
          .map(([path, stats]) => (
            <li key={path}>
              <details>
                <summary>
                  {path}: {stats.views} views ({stats.uniqueViews} unique)
                </summary>
                <ol>
                  {Array.from(stats.ipSet).map((ip) => (
                    <li key={path + ip}>{ip}</li>
                  ))}
                </ol>
              </details>
            </li>
          ))}
      </ul>
    </main>
  );
}
