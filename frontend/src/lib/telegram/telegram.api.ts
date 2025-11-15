import { apiClient } from "../api";
import { SendLoginCodeRequest, SendLoginCodeResponse } from "../dto/telegram.dto";

export const sendLoginCode = (data: SendLoginCodeRequest): Promise<SendLoginCodeResponse> => {
  return apiClient("/telegram/send-login-code", {
    body: JSON.stringify(data),
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
};
