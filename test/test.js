var assert = require("chai").assert;
BuddhistEntity = require("../src/buddhistentity");
describe("BuddhistEntity", function () {
  describe("#constructor()", function () {
    it("should return an instance of class BuddhistEntity", function () {
      testEntity = new BuddhistEntity(
        "1",
        "Buddha",
        "Buddhism",
        "https://example.com/buddha.jpg"
      );
      assert.typeOf(testEntity, "Object");
      assert.instanceOf(testEntity, BuddhistEntity);
    });
  });
});
