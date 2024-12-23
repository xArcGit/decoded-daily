import { httpStatusMessages } from '@util/http-status';
import type { Context } from 'hono';

export const sendResponse = (
	c: Context | any,
	status: number,
	data?: Record<string, any> | string | null,
	message?: string,
) => {
	interface Response {
		message: string;
		data?: Record<string, any> | string | null;
		timestamp: string;
	}

	const response: Response = {
		message:
			message ||
			httpStatusMessages[status as keyof typeof httpStatusMessages] ||
			'Unknown status',
		...(data !== undefined && { data }), // Only add `data` if it's provided
		timestamp: new Date().toISOString(),
	};

	return c.json(response, { status });
};
