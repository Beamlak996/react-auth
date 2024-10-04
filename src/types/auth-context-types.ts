export interface AuthContextType {
  accessToken: string | null;
  handleRefreshToken: () => Promise<string | undefined>;
  logout: () => void;
}
