import { Button } from "@/components/ui/button";
import {
  OneTImePasswordInput,
  OneTImePasswordRoot,
} from "@/components/ui/OneTImePassword";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";

type Props = {
  code: string;
  onCodeChanged: (code: string) => void;
  onBack: () => void;
};

export const CodeConfirmation: React.FC<Props> = ({ code, onCodeChanged, onBack }) => {
  return (
    <div className="w-full h-full max-w-md m-auto flex items-center">
      <div className="rounded-2xl shadow-xl p-8 border bg-card text-card-foreground">
        <Button
          onClick={onBack}
          variant="ghost"
          className="flex items-center gap-2 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Назад</span>
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-card-foreground mb-2">
            Подтверждение
          </h1>
          <p className="text-muted-foreground">Введите код из Telegram</p>
        </div>

        <div className="mb-6 p-4 bg-muted text-muted-foreground rounded-lg">
          <p className="text-sm text-card-foreground text-center">
            Мы отправили 6-значный код в Telegram бот
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-card-foreground mb-4 text-center">
            Введите код подтверждения
          </label>
          <OneTImePasswordRoot value={code} onValueChange={onCodeChanged}>
            <OneTImePasswordInput />
            <OneTImePasswordInput />
            <OneTImePasswordInput />
            <OneTImePasswordInput />
            <OneTImePasswordInput />
            <OneTImePasswordInput />
          </OneTImePasswordRoot>

          {/* {error && (
            <p className="mt-3 text-sm text-red-600 text-center font-medium">{error}</p>
          )} */}
        </div>

        {/* {isVerifying && (
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Проверка кода...</span>
          </div>
        )} */}

        <Button
          onClick={() => {
            console.log("Resend code");
          }}
          variant="ghost"
          className="w-full"
        >
          Отправить код повторно
        </Button>
      </div>
    </div>
  );
};
