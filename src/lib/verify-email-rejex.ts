const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function testEmailRegex(email: string): boolean {
  return emailRegex.test(email);
}
