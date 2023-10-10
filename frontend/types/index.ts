export interface CatFact {
    fact: string;
    length: number;
}

export interface HackDetails {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    points: number;
}

export interface User {
	email: string;
	username: string;
    completedHacks: string;
    points: number;
}

export interface UserLeaderboard {
    position: number;
    username: string;
    score: number;
}
