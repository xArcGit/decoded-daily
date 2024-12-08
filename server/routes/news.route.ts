import { Hono } from 'hono';
import { sendResponse } from '../utils/response';

export const route = new Hono();

route.get('/articles', c => {
	return sendResponse(c, 200, { message: 'Fetching all articles' });
});

route.get('/articles/:id', c => {
	const { id } = c.req.param();
	return sendResponse(c, 200, { message: `Fetching article with ID: ${id}` });
});

route.post('/articles', c => {
	return sendResponse(c, 201, { message: 'Creating a new article' });
});

route.put('/articles/:id', c => {
	const { id } = c.req.param();
	return sendResponse(c, 200, { message: `Updating article with ID: ${id}` });
});

route.delete('/articles/:id', c => {
	const { id } = c.req.param();
	return sendResponse(c, 200, { message: `Deleting article with ID: ${id}` });
});

route.get('/articles/:id/:version', c => {
	const { id, version } = c.req.param();
	return sendResponse(c, 200, {
		message: `Fetching article with ID: ${id} and version: ${version}`,
	});
});
