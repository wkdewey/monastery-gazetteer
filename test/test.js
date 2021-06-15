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
