export function validatePassword(password: string) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])\S{8,}$/;
  return regex.test(password);
}
