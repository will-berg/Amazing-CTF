export interface CatFact {
    fact: string;
    length: number;
}

export interface HackDetails {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface User {
	email: string;
	username: string;
    token?: string;
}

export interface UserLeaderboard {
    position: number;
    username: string;
    score: number;
}
