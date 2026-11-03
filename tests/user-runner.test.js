const { getUserData, getPostsData } = require("../helpers/api.js");
const test = require("node:test");
const assert = require("node:assert/strict");

test("проверка HTTP 200", async () => {
  const status = await getUserData(3);
  assert.equal(status.status, 200);
});

test("проверка верного id", async () => {
  const response = await getUserData(3);
  assert.equal(response.data.id, 3);
});

test("проверка типа поля name", async () => {
  const response = await getUserData(3);
  assert.ok(typeof response.data.name === "string");
});

test("поле email содержит @", async () => {
  const response = await getUserData(3);
  assert.equal(typeof response.data.email, "string");
  assert.ok(response.data.email.includes("@") === true);
});

test("проверка несуществующего пользователя", async () => {
  const response = await getUserData(999999999);
  assert.equal(response.status, 404);
});

test("проверка структуры пользователя", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/3");
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.id, 3);
  assert.ok(typeof data.username === "string" && data.username.length > 0);
});

test("проверка постов пользователя", async () => {
  const response = await getPostsData(3);
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.posts) && response.posts.length > 0);
  assert.ok(response.posts.every(item => item.userId === 3));
});

test("проверка данных пользователя", async () => {
  const response = await getUserData(3);
  const actual = { id: response.data.id, username: response.data.username };
  const expected = { id: 3, username: "Samantha" };
  assert.deepEqual(actual, expected);
});

test("Проверка ID постов пользователя", async () => {
  const response = await getPostsData(3);
  const actual = response.posts.map(item => item.id);
  const expected = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  assert.deepEqual(actual, expected);
});

test("Проверка вложенного json", async () => {
  const response = await getUserData(3);
  const actual = {
    city: response.data.address.city,
    geo: {
      lat: response.data.address.geo.lat,
      lng: response.data.address.geo.lng
    }
  };
  const expected = {
    city: "McKenziehaven",
    geo: { lat: "-68.6102", lng: "-47.0653" }
  };
  assert.deepEqual(actual, expected);
});

test("Проверка качества публикаций пользователя", async () => {
  const response = await getPostsData(3);
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.posts) && response.posts.length > 0);
  const ids = response.posts.map(item => item.id);
  assert.ok(new Set(ids).size === ids.length);
  assert.ok(response.posts.every(item => typeof item.title === "string" && typeof item.body === "string"));
  assert.ok(response.posts.every(item => item.title !== "" && item.body.length >= 20));
});

test("негативный сценарий — посты несуществующего пользователя", async () => {
  const response = await getPostsData(999999999);
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.posts) && response.posts.length === 0);
});
