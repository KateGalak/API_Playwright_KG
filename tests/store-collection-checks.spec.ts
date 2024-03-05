import { test, expect } from "@playwright/test";

test("Check new pet created", async ({ request }) => {
  const response = await request.post(
    `https://petstore.swagger.io/v2/store/order`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        id: 1,
        petId: 5,
        quantity: 100,
        shipDate: "2024-02-16T18:20:50.714Z",
        status: "placed",
        complete: true,
      },
    }
  );
  expect(response.status()).toBe(200);
});

test("Check I can find pet by status", async ({ request }) => {
  const issues = await request.get(
    `https://petstore.swagger.io/v2/store/order/1`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  expect(issues.status()).toBe(404);
});

test("Check inventory", async ({ request }) => {
  const response = await request.get(
    "https://petstore.swagger.io/v2/store/inventory",
    {
      data: {
        sold: 10,
        string: 575,
        unavailable: 1,
        pending: 13,
        available: 317,
        "un-available": 1,
        peric: 51,
      },
    }
  );
  expect(response.status()).toBe(200);
  console.log(await response.json());
});

test("Delete user", async ({ request }) => {
  const response = await request.delete(
    `https://petstore.swagger.io/v2/store/order/1`,
    {
      data: {
        code: 404,
        type: "unknown",
        message: "Order Not Found",
      },
    }
  );
  if (response.status() === 404) {
    console.log("Error: response status is 404");
    expect(await response.json()).toEqual(
      expect.objectContaining({
        code: 404,
        type: "unknown",
        message: "Order Not Found",
      })
    );
  } else if (response.status() === 400) {
    console.log("Error ID supplied");
  }
});
