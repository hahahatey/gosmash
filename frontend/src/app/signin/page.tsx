"use client";

import { useAuth } from "@/hooks/useAuth";
import { CodeConfirmation } from "./CodeConfirmation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const SignIn = () => {
  const [code, setCode] = useState('');
  const { toast } = useToast();
  const { login } = useAuth({
    onLoginInvalidOrExpired: () => {
      toast({
        title: "Что то не так с кодом для входа",
        description: "Запросите новый код у телеграм бота",
        variant: "destructive",
      });

      const element = document.activeElement as HTMLElement | null;
      element?.blur();
      setCode('');
    },
  });

  const handleCodeChanged = (code: string) => {
    setCode(code);
    if (code.length === 6) {
      login({ telegramNickname: "@hahateev", code });
    }
  };

  return <CodeConfirmation code={code} onCodeChanged={handleCodeChanged} />;
};

export default SignIn;
