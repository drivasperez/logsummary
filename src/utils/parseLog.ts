const BUF_SIZE = 4096; // 4 kb (assuming ascii input)

export type PathState = {
  views: number;
  uniqueViews: number;
  ipSet: Set<string>;
};
export type LogState = Map<string, PathState>;

/**
 * The log file could conceivably be very long, so we parse it in a streaming fashion.
 * The generator yields periodically to report its current state so the UI can be
 *  updated without having to wait for the entire string to be processed.
 */
export function* parseLog(input: string, bufSize = BUF_SIZE) {
  const state: LogState = new Map();

  // if there's no input, do nothing.
  if (input.length === 0) {
    yield state;
    return;
  }

  // if the input is short, handle it in one go.
  if (bufSize > input.length) {
    const parts = input.trim().split("\n");
    processLines(parts, state);
    yield state;
    return;
  }

  // if the input is long, handle it in chunks, yielding incremental updates.

  let buf = "";
  let start = 0;
  let end = Math.min(bufSize, input.length);

  while (end < input.length - 1) {
    end = Math.min(start + bufSize, input.length - 1);
    const slice = buf + input.trimEnd().slice(start, end);
    const parts = slice.split("\n");
    buf = parts.pop() ?? "";
    processLines(parts, state);

    start = end;

    yield state;
  }

  // Last buf must be a line (or malformed text, in which case throw);
  processLines([buf], state);
  yield state;
}

function processLines(lines: string[], state: LogState) {
  for (const line of lines) {
    const parts = line.trim().split(" ");
    if (parts.length !== 2) {
      throw new Error(`Invalid input to processLines: ${line}`);
    }
    const [path, ip] = parts;
    const pathState = state.get(path) ?? {
      views: 0,
      uniqueViews: 0,
      ipSet: new Set(),
    };

    pathState.views += 1;
    if (!pathState.ipSet.has(ip)) {
      pathState.uniqueViews += 1;
      pathState.ipSet.add(ip);
    }

    state.set(path, pathState);
  }
}
