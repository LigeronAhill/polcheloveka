import type { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
	imgURL: string;
	route: string;
	label: string;
}

export interface Job {
	id?: string;
	employer_name?: string;
	employer_logo?: string | undefined;
	employer_website?: string;
	job_employment_type?: string;
	job_title?: string;
	job_description?: string;
	job_apply_link?: string;
	job_city?: string;
	job_state?: string;
	job_country?: string;
}

export interface Country {
	name: {
		common: string;
	};
}

export interface ParamsProps {
	params: { id: string };
}

export interface SearchParamsProps {
	searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
	params: { id: string };
	searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
	GOLD: number;
	SILVER: number;
	BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export interface FilterProps {
	name: string;
	value: string;
}

export interface UserWithSavedQuestions {
	name: string;
	username?: string;
	email: string;
	password?: string;
	bio?: string;
	image?: string;
	location?: string;
	portfolioWebsite?: string;
	reputation?: number;
	saved: SavedQuestion[];
	createdAt: Date;
}

export interface SavedQuestion {
	_id: string;
	title: string;
	content: string;
	tags: {
		_id: string;
		name: string;
	}[];
	views: number;
	upvotes: Schema.Types.ObjectId[];
	downvotes: Schema.Types.ObjectId[];
	author: {
		_id: string;
		name: string;
		image?: string;
	};
	answers: Schema.Types.ObjectId[];
	createdAt: Date;
}
