export interface HackDetails {
    id: number;
    title: string;
    description: string;
    informationPage: string;
    imageUrl: string;
    points: number;
}

// Add more properties to the User interface as needed, e.g. points 
export interface User {
	email: string;
	username: string;
    points: number;
    completedHacks: string[];
    token?: string;
}

export interface UserLeaderboard {
    username: string;
    points: number;
}

export interface Leaderboard {
    leaderboard: UserLeaderboard[];
    total: number;
}
