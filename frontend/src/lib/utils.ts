
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tournament } from "@/mocks/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Склоняет существительное в зависимости от числа
 * @param {number} number - Число
 * @param {string[]} words - Массив форм слова [для 1, для 2-4, для 0 и 5-9]
 * @return {string} Слово в правильной форме
 */
export function declineNoun(number: any, words: any) {
  // Проверяем последние две цифры числа
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)];

  return words[index];
}

export const formatDate = (date: Date) =>
  date.toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const isTournamentOutdated = ({date}: Tournament ) => date < new Date();

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string | number, T[]> {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    const groupKeyTyped = typeof groupKey === 'number' ? Number(groupKey) : String(groupKey);
    if (!result[groupKeyTyped]) {
      result[groupKeyTyped] = [];
    }
    result[groupKeyTyped].push(item);
    return result;
  }, {} as Record<string, T[]>);
}