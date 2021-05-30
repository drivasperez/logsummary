import { LogState } from "./parseLog";

export type BeginMessage = { type: "BEGIN"; arrayBuffer: ArrayBuffer };

export type UpdatedMessage = { type: "UPDATED"; status: LogState };

export type DoneMessage = { type: "DONE" };

export type ErrorMessage = { type: "ERROR"; error: string };

export type HostMessage = BeginMessage;
export type WorkerMessage = UpdatedMessage | DoneMessage | ErrorMessage;
