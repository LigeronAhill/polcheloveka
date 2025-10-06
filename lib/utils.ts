import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { BADGE_CRITERIA, CURRENCY_NOTATIONS } from "@/constants";
import { JobPageFilters } from "@/constants/filters";
import type { FilterProps } from "@/types";
import type { GetFormattedSalaryParams } from "./actions/shared.types";

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

// ---------------------------

export const getJoinedDate = (date: Date): string => {
  // Extract the month and year from the Date object
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`;

  return joinedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

// Типы для критерий и уровней бейджей
type BadgeCriteriaKey = keyof typeof BADGE_CRITERIA;
type BadgeLevel = "BRONZE" | "SILVER" | "GOLD";

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface BadgeParam {
  criteria: {
    type: BadgeCriteriaKey;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels = BADGE_CRITERIA[type];

    (Object.keys(badgeLevels) as BadgeLevel[]).forEach((level) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level] += 1;
      }
    });
  });

  return badgeCounts;
};

export const employmentTypeConverter = (type: string): string => {
  let employmentType: string = "";

  JobPageFilters.forEach((filter: FilterProps) => {
    if (filter.value === type) {
      employmentType = filter.name;
    }
  });

  return employmentType;
};

export const getFormattedSalary = ({
  min,
  max,
  currency,
  period,
}: GetFormattedSalaryParams) => {
  if (!min || !max) return null;

  const salaryInfo = {
    symbol: CURRENCY_NOTATIONS[currency] || "$",
    low: salaryFormatter(min, 1),
    high: salaryFormatter(max, 1),
    per: period ? `/${period.toLowerCase()}ly` : "",
  };

  const { symbol, low, high, per } = salaryInfo;

  const formattedSalary = `${symbol}${low} - ${symbol}${high}${per}`;

  return formattedSalary as string;
};

const salaryFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const lookupItem = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return lookupItem
    ? (num / lookupItem.value).toFixed(digits).replace(rx, "$1") +
        lookupItem.symbol
    : "0";
};

export function isValidImage(url: string) {
  return /\.(jpg|jpeg|png|webp||svg)$/.test(url);
}
