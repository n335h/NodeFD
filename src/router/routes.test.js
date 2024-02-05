const request = require('supertest');
const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();

app.set('view engine', 'ejs');

app.set(
	'views',
	path.join(__dirname, '../views') // used to create an absolute path by joining the current directory (__dirname) with a relative path ('../views').
);

app.use(
	'/partials',
	express.static(
		path.join(__dirname, '../../client/partials')
	)
);
app.use(
	'/forms',
	express.static(
		path.join(__dirname, '../../client/forms')
	)
);
app.use('/', router);

// on server connect load index.ejs file
describe('Testing / route', () => {
	it('should respond with status 200', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
	});

	it('should contain the testing comment (index.ejs specific content)', async () => {
		const response = await request(app).get('/');
		expect(response.text).toContain(
			'<!-- TESTING_IDENTIFIER -->' /// this is the unique identifier in index.ejs to ensure index has loaded due to partials import and rendering raw HTML
		);
	});
});

//login should render the login form
describe('GET /login renders the login form', () => {
	it('should respond with status 200', async () => {
		const response = await request(app).get(
			'/login'
		);
		expect(response.status).toBe(200);
	});

	it('should contain the unique ID for the login form', async () => {
		const response = await request(app).get(
			'/login'
		);
		expect(response.text).toContain(
			'id="loginForm"'
		);
	});
});

//register should render the register form
describe('GET /register renders the register form', () => {
	it('should respond with status 200', async () => {
		const response = await request(app).get(
			'/register'
		);
		expect(response.status).toBe(200);
	});

	it('should contain the unique ID for the register form', async () => {
		const response = await request(app).get(
			'/register'
		);
		expect(response.text).toContain(
			'id="registerForm"'
		);
	});
});
