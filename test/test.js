var assert = require("chai").assert;
BuddhistEntity = require("../src/buddhistentity");
const { JSDOM } = require("jsdom");
require("isomorphic-fetch");

describe("BuddhistEntity", function () {
  const testEntity = new BuddhistEntity(
    "1",
    "Buddha",
    "Buddhism",
    "https://example.com/buddha.jpg"
  );
  const BACKEND_URL = "https://young-forest-03120.herokuapp.com";
  const MONASTERIES_URL = `${BACKEND_URL}/api/v1/monasteries`;
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
  describe("#fetchEntries()", function () {
    it("returns a promise", function () {
      const entries = BuddhistEntity.fetchEntries(MONASTERIES_URL);

      assert.typeOf(entries, "Promise");
    });
  });
  describe(".render()", function () {
    let contentContainer;
    let div;
    let link;
    beforeEach(function (done) {
      JSDOM.fromFile("./index.html")
        .then((dom) => {
          global.document = dom.window.document;
          contentContainer = document.querySelector("#content-container");
          div = document.createElement("div");
          link = document.createElement("a");
        })
        .then(done, done);
    });
    it("displays the entity", function () {
      testEntity.render(contentContainer, div, link);
      assert.include(contentContainer, div);
    });
  });
});
