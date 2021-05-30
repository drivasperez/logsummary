import { HostMessage, WorkerMessage } from "./utils/messages";
import { parseLog } from "./utils/parseLog";

// eslint-disable-next-line no-restricted-globals
const context: Worker = self as any;

function handleError(error: Error) {
  const msg: WorkerMessage = { type: "ERROR", error: error.message };
  context.postMessage(msg);
}

function handleReceiveFile(ab: ArrayBuffer) {
  try {
    for (const status of parseLog(ab)) {
      const msg: WorkerMessage = { type: "UPDATED", status };
      context.postMessage(msg);
    }
    const msg: WorkerMessage = { type: "DONE" };
    context.postMessage(msg);
  } catch (e) {
    handleError(e);
  }
}

try {
  context.onmessage = (message: MessageEvent<HostMessage>) => {
    switch (message.data.type) {
      case "BEGIN":
        handleReceiveFile(message.data.arrayBuffer);
        break;
      default:
        throw new Error(
          `Unrecognised message type received: ${message.data.type}`
        );
    }
  };
} catch (e) {
  handleError(e);
}
