"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
	mode: string;
	setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState("");

	useEffect(() => {
		if (mode === "dark") {
			localStorage.setItem("theme", "dark");
		} else if (mode === "light") {
			localStorage.setItem("theme", "light");
		} else {
			localStorage.removeItem("theme");
		}
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [mode]);

	return (
		<ThemeContext.Provider value={{ mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
