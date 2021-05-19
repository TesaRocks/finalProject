export function errorHandling(err: any) {
  switch (err) {
    case undefined:
      return "No user with the given ID";
  }
}
