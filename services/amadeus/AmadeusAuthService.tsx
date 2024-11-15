// services/AmadeusAuthService.ts
export class AmadeusAuthService {
    private readonly baseUrl = 'https://test.api.amadeus.com';
    private readonly clientId: string;
    private readonly clientSecret: string;
    private accessToken = '';
    private tokenExpiration: Date | null = null;

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    async getAccessToken(): Promise<string> {
        if (this.accessToken && this.tokenExpiration && this.tokenExpiration > new Date()) {
            return this.accessToken;
        }

        const authData = {
            grant_type: 'client_credentials',
            client_id: this.clientId,
            client_secret: this.clientSecret
        };

        try {
            const response = await fetch(`${this.baseUrl}/v1/security/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(authData),
            });

            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            this.tokenExpiration = new Date(Date.now() + (data.expires_in * 1000));

            return this.accessToken;
        } catch (error) {
            throw new Error(`Authentication failed: ${error}`);
        }
    }
}

export const amadeusAuthService = new AmadeusAuthService(
    'Rhe76PRIpCK2OhNBSd2IVScsQlwMlapu',
    'YU2G9r6p9994vSvx'
);