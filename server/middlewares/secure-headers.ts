import { secureHeaders } from 'hono/secure-headers';

export const secureHeader = () => {
	return secureHeaders({
		xFrameOptions: false,
		xXssProtection: false,
	});
};
