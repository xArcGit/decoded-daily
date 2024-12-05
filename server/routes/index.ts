import { Hono } from 'hono';

export const route = new Hono();

route.get('/', c => {
	return c.text('Hello, Hono!');
});
