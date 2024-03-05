import { test, expect } from "@playwright/test";

test("Create/Add user", async ({ request }) => {
  const response = await request.post("https://petstore.swagger.io/v2/user", {
    data: {
      id: 5,
      username: "KateG",
      firstName: "Kate",
      email: "Kateg@gmail.com",
      password: "passK123456",
      userStatus: 14,
    },
  });
});

test("Check pet updeted", async ({ request }) => {
  const response = await request.put(`https://petstore.swagger.io/v2/pet`, {
    data: {
      id: 5,
      username: "KateG",
      firstName: "Kate",
      email: "Kateg@gmail.com",
      password: "passK123456",
      userStatus: 14,
    },
  });
  expect(response.status()).toBe(200);
  console.log("User data changed");
});

test("Get Logged user", async ({ request }) => {
  const response = await request.get(
    `https://petstore.swagger.io/v2/user/login?username=ZheniaE&password=!PaSSword!123`
  );
  expect(await response.json()).toMatchObject({
    code: 200,
    type: "unknown",
  });
  let resp = await response.json();
  console.log(resp);
});
