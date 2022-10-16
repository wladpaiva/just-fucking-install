import {concurrently} from 'concurrently'

/**
 * Execute a command in a child process.
 * @param command The command to execute.
 * @returns
 */
export const execute = (command: string) => {
  // Used concurrently here only to get the nice output formatting
  // TODO: replace with something else less heavy
  const {result} = concurrently(
    [
      {
        command,
      },
    ],
    {
      raw: true,
    },
  )

  return result
}
