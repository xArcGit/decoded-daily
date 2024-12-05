import { httpStatus, httpStatusMessages } from '@util/http-status';

import { config } from '@config/app.config';
import { getSentry } from '@hono/sentry';
import type { ErrorHandler } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';
import type { Toucan } from 'toucan-js';
import { ZodError } from 'zod';
import ApiError from '../utils/api-error';
import { sendResponse } from '../utils/response';
import { generateZodErrorMessage } from '../utils/zod';

const genericJSONErrMsg = 'Unexpected end of JSON input';

export const errorConverter = (err: unknown, sentry: Toucan): ApiError => {
	let error = err;
	if (error instanceof ZodError) {
		const errorMessage = generateZodErrorMessage(error);
		error = new ApiError(httpStatus.BAD_REQUEST, errorMessage);
	} else if (
		error instanceof SyntaxError &&
		error.message.includes(genericJSONErrMsg)
	) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid JSON payload');
	} else if (!(error instanceof ApiError)) {
		const castedErr = (typeof error === 'object' ? error : {}) as Record<
			string,
			unknown
		>;
		const statusCode: StatusCode =
			typeof castedErr.statusCode === 'number'
				? (castedErr.statusCode as StatusCode)
				: httpStatus.INTERNAL_SERVER_ERROR;
		const message = (castedErr.description ||
			castedErr.message ||
			httpStatus[statusCode.toString() as keyof typeof httpStatus]) as string;
		if (statusCode >= httpStatus.INTERNAL_SERVER_ERROR) {
			sentry.captureException(error);
		}
		error = new ApiError(statusCode, message, false);
	}
	return error as ApiError;
};

export const errorHandler: ErrorHandler = async (err, c) => {
	const env = config.server.env;
	const sentry = getSentry(c);
	const error = errorConverter(err, sentry);
	if (env === 'production' && !error.isOperational) {
		error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		error.message = httpStatusMessages[httpStatus.INTERNAL_SERVER_ERROR];
	}
	const response = {
		...(env === 'development' ? { stack: err.stack } : {}),
	};
	c.error = undefined;
	return sendResponse(
		c,
		error.statusCode as StatusCode,
		response,
		error.message,
	);
};
