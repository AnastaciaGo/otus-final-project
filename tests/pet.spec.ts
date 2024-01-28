import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import pet from "../services/pet";

['available', 'pending', 'sold'].forEach(status => {
    test(`Find pet by existing status: ${status}  - success`, async () => {
        const pets = await pet.findByStatus(status)
        const map = ['id', 'category', 'name', 'photoUrls', 'tags', 'status']
        expect(pets.status).toBe(200)
        pets.body.forEach(item => {
            expect(item.status).toBe(status)
            expect(Object.keys(item).includes('id')).toBeTruthy()
        })
    })
});

test('Find pet by not existing status - empty result', async () => {
    const status = faker.string.alpha(5)
    const res = await pet.findByStatus(status)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
});

test('Find pet by existing id - success', async () => {
    const pets = await pet.findByStatus('available')
    const petId = pets.body[1].id
    const res = await pet.findPetById(petId)
    expect(res.body.id).toBe(petId)
    expect(res.status).toBe(200)
});

test('Find pet by wrong format id - failed', async () => {
    const petId = faker.string.alpha(5)
    const res = await pet.findPetById(petId)
    expect(res.status).toBe(404)
    expect(res.body.message.includes('java.lang.NumberFormatException: For input string')).toBeTruthy()
});

test('Add new pet with valid body - success', async () => {
    const res = await pet.addNewPet({})
    expect(res.status).toBe(200)
    expect(Number.isInteger(res.body.id)).toBeTruthy()
});

test('Add new pet with invalid body - failed', async () => {
    const res = await pet.addNewPet([])
    expect(res.status).toBe(500)
    expect(res.body.message).toBe('something bad happened')
});