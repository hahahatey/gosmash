export type SendLoginCodeRequest = {
  nickname: string;
}

export type SendLoginCodeResponse = {
  error?: {type: 'USER_IS_NOT_FOUND'} | {type: 'START_CHAT_WITH_BOT'};
  success: boolean;
}