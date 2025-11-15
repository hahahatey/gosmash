import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";

type Props = {
  onNicknameSubmitted: (nickname: string) => void;
};

export const SignInForm: React.FC<Props> = ({ onNicknameSubmitted }) => {
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedNickname, setSavedNickname] = useState<string | null>("hahateev");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onNicknameSubmitted(nickname);
  };

  const handleContinueWithSaved = async () => {
    if (savedNickname) {
      onNicknameSubmitted(savedNickname);
    }
  };

  return (
    <AuthCard className="min-w-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <Trophy className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-card-foreground mb-2">
          Вход в систему
        </h1>
        <p className="text-muted-foreground">Введите ваши данные для входа</p>
      </div>

      {savedNickname && (
        <div className="mb-6 p-4 bg-muted text-muted-foreground rounded-lg border border-border/50">
          <div className="flex items-center mb-4">
            <p className="mr-3">Вы входили под ником:</p>
            <code className="text-base font-mono bg-background px-3 py-2 rounded">
              @{savedNickname}
            </code>
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={handleContinueWithSaved}
            disabled={isLoading}
          >
            Продолжить как @{savedNickname}
          </Button>
          <div className="mt-3 text-center">
            <span className="text-xs text-muted-foreground">
              или войдите с другим ником
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Label className="block text-sm font-medium mb-1.5" htmlFor="nickname">
          Telegram ник
        </Label>
        <Input
          id="nickname"
          type="text"
          placeholder="@username"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isLoading}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Нет аккаунта?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};
