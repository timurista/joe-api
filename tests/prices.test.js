const request = require("supertest");
const app = require("../app");

test("GET /priceavax/:tokenAddress", async () => {
  const response = await request(app.callback()).get("/priceusd/avax");
  const response2 = await request(app.callback()).get("/priceusd/smrtr");
  const avaxPrice = parseFloat(response.text) / 10 ** 18;
  const smrtrPrice = parseFloat(response2.text) / 10 ** 18;

  console.log("avaxPrice", avaxPrice);
  console.log("smrtrPrice", smrtrPrice);

  const convertPrice = smrtrPrice / avaxPrice;
  const avaxGasFee = 0.005;
  const allAvaxFees = avaxGasFee * 10;
  const amount = allAvaxFees / convertPrice;
  console.log("amount of smrtr it makes sense to buy", amount);
  console.log("usd for the amount", amount * smrtrPrice);
  console.log(
    "return after fee",
    amount * smrtrPrice - avaxGasFee * 4 * avaxPrice
  );
  console.log(
    "How many avax we get for 1 mil",
    1000000 * convertPrice - avaxGasFee * 2
  );
  expect(response.status).toBe(200);
  expect(response.text).not.toBe("0");
});
