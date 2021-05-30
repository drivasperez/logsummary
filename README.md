# Log Summary - Smart Pension Test

## Commands

- `npm run dev`: Builds the project and serves it locally on port 3000.
- `npm run build`: Builds the project.
- `npm run test`: Run unit tests.

## Using the project

1. Click the file input labelled "Upload file" and select a `.txt` or `.log` file. Click "Submit".
2. Entries are shown sorted by total views, most to least. Use the select in the upper right to sort by total unique views.
3. Click entries to see the list of unique IP addresses that visited a path.
4. Click the button labelled "Try another file?" to return the app to its initial state.

## Assumptions made

For this test I made the assumption that log files could be very large, perhaps multiple gigabytes. For that reason, I put the main parsing logic in a web-worker. The file is cheaply transferred as an ArrayBuffer to the worker, which then parses the file in a streaming fashion. This stops the main UI thread from being blocked, making sure responsiveness is not lost. The worker reports statistics about the logs to the main thread as it goes, which is reflected in the UI.

## Possible improvements

- Better test coverage around web-workers. Jest doesn't like parsing web-workers with TypeScript module syntax.
- Pagination of results. If the list of paths visited is very large, or a path is visited by a large number of unique IPs, the app might lose a degree of responsiveness as it renders.
- Support for back/forward page navigation. At the moment, the app is on a single path, with state managed by a reducer. It might be better to use a library like React Router to enable page history.
- Some setup around developer experience. Live reload is currently disabled because the rollup live-reload plugin isn't currently compatible with workers. Some AirBnb default eslint rules are incorrect or overly restrictive.
- Old browser support with Babel, perhaps with a module/nomodule dual build.
