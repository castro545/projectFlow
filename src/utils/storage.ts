export default class Storage {
  static ROL = 'rl';
  static USER_ID = 'user_id';
  static FULL_NAME = 'full_name';
  static EMAIL = 'email';
  static IS_ACTIVE = 'is_active';
  static IAT = 'iat';
  static EXP = 'exp';

  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}