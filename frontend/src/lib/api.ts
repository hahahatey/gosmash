import { createAuthApiClient } from "./apiClient";

export const apiClient = createAuthApiClient({
  baseUrl: 'http://localhost:3000',
});