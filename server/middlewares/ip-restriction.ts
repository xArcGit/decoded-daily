import { config } from '@config/app.config';
import { logger } from '@util/logger';
import { getConnInfo } from 'hono/bun';
import { ipRestriction } from 'hono/ip-restriction';

export const restriction = () => {
	const { denyList = [], allowList = [] } = config.ipRestriction;

	return ipRestriction(getConnInfo, {
		denyList: denyList, // Pass the actual array
		allowList: allowList, // Pass the actual array
	});
};
