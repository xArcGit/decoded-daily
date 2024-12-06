import { config } from '@config/app.config';
import { getConnInfo } from 'hono/bun';
import { ipRestriction } from 'hono/ip-restriction';

export const restriction = () => {
	return ipRestriction(getConnInfo, {
		denyList: config.ipRestriction.denyList,
		allowList: config.ipRestriction.allowList,
	});
};
