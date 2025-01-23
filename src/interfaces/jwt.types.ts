
export interface signedTokenObj {
	access_token: string,
	refresh_oken: string
}

export interface IJwtService {
	// signToken: (payload: any) => signedTokenObj;
	// verifyToken: (token: any) => any;
	generateAccessToken: (payload: any) => any;
	generateRefreshToken: (payload: any) => any;
}