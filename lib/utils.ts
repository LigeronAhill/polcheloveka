import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamp(createdAt: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - createdAt.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Функция для склонения слов в зависимости от числа
  const pluralize = (
    count: number,
    words: [string, string, string],
  ): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
  };

  if (diffInYears > 0) {
    return `${diffInYears} ${pluralize(diffInYears, ["год", "года", "лет"])} назад`;
  }

  if (diffInMonths > 0) {
    return `${diffInMonths} ${pluralize(diffInMonths, ["месяц", "месяца", "месяцев"])} назад`;
  }

  if (diffInWeeks > 0) {
    return `${diffInWeeks} ${pluralize(diffInWeeks, ["неделя", "недели", "недель"])} назад`;
  }

  if (diffInDays > 0) {
    return `${diffInDays} ${pluralize(diffInDays, ["день", "дня", "дней"])} назад`;
  }

  if (diffInHours > 0) {
    return `${diffInHours} ${pluralize(diffInHours, ["час", "часа", "часов"])} назад`;
  }

  if (diffInMinutes > 0) {
    return `${diffInMinutes} ${pluralize(diffInMinutes, ["минута", "минуты", "минут"])} назад`;
  }

  return "только что";
}

export function pluralizeOld(
  count: number,
  words: [string, string, string],
): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
}
export function pluralize(count: number, word: string): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const words = ["", "а", "ов"];
  const suffix =
    words[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
  if (count < 1000) {
    return `${word}${suffix}`;
  } else {
    return `${word}ов`;
  }
}

export function formatNumber(num: number, decimals: number = 1): string {
  if (num < 1000) {
    return num.toString();
  }

  const units = ["", "k", "M", "B", "T"];
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), units.length - 1);
  const scaled = num / 1000 ** exponent;

  // Форматируем с десятичными знаками, но убираем .0 если decimals = 0
  let formatted = scaled.toFixed(decimals);

  // Убираем лишние нули после запятой
  if (decimals > 0) {
    formatted = formatted.replace(/\.?0+$/, "");
  }

  return formatted + units[exponent];
}
