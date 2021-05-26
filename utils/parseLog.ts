const BUF_SIZE = 4096; // 4 kb (assuming ascii input)

type PathState = { views: number; uniqueViews: number; ipSet: Set<string> };
type LogState = Map<string, PathState>;

/**
 * The log file could conceivably be very long, so we parse it in a streaming fashion.
 * The generator yields periodically to report its current state so the UI can be
 *  updated without having to wait for the entire string to be processed.
 */
function* parseLog(input: string, bufSize = BUF_SIZE) {
  const state: LogState = new Map();

  if (input.length === 0) {
    yield state;
    return;
  }

  let buf = "";
  let start = 0;
  let end = Math.min(bufSize, input.length - 1);

  while (end <= input.length - 1) {
    const slice = buf + input.slice(start, end);
    const parts = slice.split("\n");
    buf = parts.pop() ?? "";
    processLines(parts, state);

    start = end;
    end = Math.min(start + bufSize, input.length - start - 1);

    yield state;
  }
}

function processLines(lines: string[], state: LogState) {
  for (const line of lines) {
    const parts = line.split(" ");
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
