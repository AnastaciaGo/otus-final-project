import account from "../services/user";
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import config from "../config.js";

test('Login with valid creds - success', async () => {
    const res = await account.login({username: config.credentials.username, password: config.credentials.password})
    expect(res.body.message.includes('logged in user session:')).toBeTruthy()
    expect(res.status).toBe(200)
});

test('Login with invalid creds - failed', async () => {
    const username = faker.internet.userName
    const password = faker.internet.password
    const res = await account.login({username: username, password: password})
    expect(res.status).toBe(401)
});

test('Get user info with valid username - success', async () => {
    const res = await account.getUserInfo(config.credentials.username)
    expect(res.body).toEqual(config.credentials)
    expect(res.status).toBe(200)
});

test('Get user info with invalid username - failed', async () => {
    const username = faker.string.alpha(5)
    const res = await account.getUserInfo(username)
    expect(res.body.message).toBe("User not found")
    expect(res.status).toBe(404)
});