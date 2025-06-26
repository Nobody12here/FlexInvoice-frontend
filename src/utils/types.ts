export interface LoginResponse {
  data: {
    access: string;
    refresh: string;
  };
}
