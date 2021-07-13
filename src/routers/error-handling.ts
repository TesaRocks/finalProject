export function errorHandling(err: any) {
  switch (err) {
    case "wrongId":
      return "No user with the given ID";
    case "noEmail":
      return "Email not found";
    case "noPassword":
      return "Passwords dont match";
    case "noName":
      return "Names dont match";
  }
}
