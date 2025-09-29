import request  from 'supertest'
import { app } from '../app'


jest.mock('./v1/item/item.repository', () => ({
    getOrderDetails: jest.fn().mockResolvedValue({
        page: 1, pageSize: 20, total: 0, pages: 1, items: []
    })
}))

describe("GET api/v1/items", () => {
    it('returns 400 on invalid query via Zod', async () => {
        const res = await request(app).get('/api/v1/items?page=0');
        expect(res.status).toBe(400);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ok: false,
                    status: 400,
                    reason: 'Validation Error',
                    field: "page",
                    message: expect.any(String)
                })
            ])
        )
    })
}) 

    //Uncomment once you mock the repo above or have a test db in place
//     it('returns 200 with a pagination envelope on happy path', async () => {
//         const res = await request(app).get('/api/v1/supplier-details?page=1&pageSize=20');
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty('items');
//         expect(res.body).toHaveProperty('page', 1);
//         expect(res.body).toHaveProperty('pageSize', 20);
//   });


