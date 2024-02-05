const request = require('supertest');
const express = require('express');
const userRoutes = require('./userRoutes');
const registerRoutes = require('./auth/register');
const userControllers = require('../controllers/userControllers');
const app = express();
const {
	hashPassword,
} = require('../controllers/auth/passwordUtils');

jest.mock('../controllers/userControllers');
jest.mock('../models/users');
const passwordUtils = require('../controllers/auth/passwordUtils');
jest.mock('../controllers/auth/passwordUtils');

// app setup
app.use(express.json());
app.use(userRoutes);
app.use(registerRoutes);

//Mock salt
passwordUtils.generateSalt.mockResolvedValue(
	'mockedSalt'
);

describe('User Routes', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('POST/ should create a new user', async () => {
		const newUser = {
			first_name: 'John',
			last_name: 'Doe',
			email: 'john@example.com',
			password: 'password',
			confirm_password: 'password',
		};
		const createdUser = {
			_id: '1',
			first_name: 'John',
			last_name: 'Doe',
			email: 'john@example.com',
			is_registered: true,
			organisation: '',
			is_admin: false,
			authentication: {
				password: await hashPassword(
					'password',
					'mockedSalt'
				),
				salt: 'mockedSalt',
			},
		};

		userControllers.createUser.mockResolvedValue(
			createdUser
		);

		const response = await request(app)
			.post('/register')
			.send(newUser)
			.set('Content-Type', 'application/json');

		expect(response.status).toBe(302); // 302 indicates a redirect
		expect(response.headers.location).toBe(
			'/login'
		);
	});

	test('GET /users/:email should return user by email', async () => {
		const mockUsers = [
			{
				_id: '1',
				first_name: 'John',
				last_name: 'Doe',
				email: 'john@example.com',
			},
			{
				_id: '2',
				first_name: 'Jane',
				last_name: 'Smith',
				email: 'jane@example.com',
			},
		];

		const targetUser = mockUsers.find(
			(user) => user.email === 'john@example.com'
		);
		userControllers.getUserByEmail.mockResolvedValue(
			targetUser
		);

		const response = await request(app).get(
			'/users/john@example.com'
		);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(targetUser);
	});

	/// is this actually working or just returning the updatedUser Deta
	test('PATCH /edit/:userId should edit user by id', async () => {
		const userId = '1';
		const initialUser = {
			_id: userId,
			first_name: 'John',
			last_name: 'Doe',
			email: 'john@example.com',
		};
		const updateData = {
			first_name: 'Janey',
			email: 'jane@gmail.com',
		};
		const updatedUser = {
			_id: userId,
			first_name: 'Janey',
			last_name: 'Doe',
			email: 'jane@gmail.com',
		};

		// Mock the getUserById and editUserById functions
		userControllers.getUserByEmail.mockResolvedValue(
			initialUser
		);
		userControllers.editUserById.mockResolvedValue(
			updatedUser
		);

		// Make the request
		const response = await request(app)
			.patch(`/edit/${userId}`)
			.send(updateData)
			.set('Content-Type', 'application/json');

		// Assertions
		expect(response.status).toBe(200);
		expect(response.body).toEqual(updatedUser);
	});

	test('DELETE /delete/:userId should delete user by id', async () => {
		const userId = '1';
		const deletedUser = {
			_id: userId,
			first_name: 'John',
			last_name: 'Doe',
			email: 'john@example.com',
		};
		userControllers.getUserById.mockResolvedValue(
			deletedUser
		);
		userControllers.deleteUserById.mockResolvedValue(
			deletedUser
		);
		const response = await request(app).delete(
			`/delete/${userId}`
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(deletedUser);

		userControllers.getUserById.mockResolvedValue(
			null
		);
		const afterDeletion =
			await userControllers.getUserById(userId);
		expect(afterDeletion).toBeNull();
	});
});
