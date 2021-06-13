var assert = require("chai").assert;
BuddhistEntity = require("../src/buddhistentity");
describe("BuddhistEntity", function () {
  testEntity = new BuddhistEntity(
    "1",
    "Buddha",
    "Buddhism",
    "https://example.com/buddha.jpg"
  );
  describe("#constructor()", function () {
    it("returns an instance of class BuddhistEntity", function () {
      assert.typeOf(testEntity, "Object");
      assert.instanceOf(testEntity, BuddhistEntity);
    });
    it("has property id", function () {
      assert.property(testEntity, "id");
    });
    it("has property name", function () {
      assert.property(testEntity, "name");
    });
    it("has property religious_tradition", function () {
      assert.property(testEntity, "religious_tradition");
    });
    it("has property image_url", function () {
      assert.property(testEntity, "image_url");
    });
  });
});
