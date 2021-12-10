const request = require("supertest");
const app = require("../app");

test("GET /", async () => {
  const response = await request(app.callback()).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("OK");
});

// check avax price
test("GET /priceusd/:tokenAddress", async () => {
  const response = await request(app.callback()).get("/priceusd/avax");
  expect(response.status).toBe(200);
  expect(response.text).not.toBe("0");
});
