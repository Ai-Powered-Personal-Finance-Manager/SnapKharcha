export interface ProfileUser {
	id: string;
	name: string;
	email: string;
	avatar: string | null;
	dob: string | null;
	phone: string | null;
	city: string | null;
	country: string | null;
	state: string | null;
	createdAt?: string;
}

export interface ProfileResponse {
	success: boolean;
	data: ProfileUser;
	message?: string;
}

export interface UpdateProfilePayload {
	name?: string;
	dob?: string;
	phone?: string;
	city?: string;
	country?: string;
	state?: string;
	avatar?: string;
}
