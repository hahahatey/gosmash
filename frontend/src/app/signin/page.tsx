"use client";

import { useAuth } from "@/hooks/useAuth";
import { CodeConfirmation } from "./CodeConfirmation";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { SignInForm } from "./SignIn";
import { sendLoginCode } from "@/lib/telegram/telegram.api";

export default function SignInPage() {
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const [stage, setStage] = useState<"nickname" | "code">("nickname");
  const nicknameRef = useRef("");
  const { login } = useAuth({
    onLoginInvalidOrExpired: () => {
      toast({
        title: "Что то не так с кодом для входа",
        description: "Запросите новый код у телеграм бота",
        variant: "destructive",
      });

      const element = document.activeElement as HTMLElement | null;
      element?.blur();
      setCode("");
    },
    disableProfileQuery: true,
  });

  const handleCodeChanged = (code: string) => {
    setCode(code);
    if (code.length === 6) {
      login({ telegramNickname: "@hahateev", code });
    }
  };

  const handleNicknameSubmitted = async (nickname: string) => {
    nicknameRef.current = nickname;
    const response = await sendLoginCode({ nickname });

    if (response.success) {
      return setStage("code");
    }

    if (response.error) {
      switch (response.error.type) {
        case "START_CHAT_WITH_BOT":
          return toast({
            title: "Чат с ботом не начат",
            description: "Чтобы мы могли отправлять вам сообщения, начните чат с ботом.",
          });
        case 'USER_IS_NOT_FOUND':
          return toast({
            title: "Не нашли пользователя",
            description: "Пользователь с таким телеграм никнеймом не существует.",
            variant: 'destructive',
          });
      }
    }
  };

  const handleOnBack = () => {
    setStage('nickname');
  }

  return (
    <div className="w-full h-full max-w-md m-auto flex items-center">
      {stage === "code" ? (
        <CodeConfirmation code={code} onBack={handleOnBack} onCodeChanged={handleCodeChanged} />
      ) : (
        <SignInForm onNicknameSubmitted={handleNicknameSubmitted} />
      )}
    </div>
  );
  //return <CodeConfirmation code={code} onCodeChanged={handleCodeChanged} />;
}
