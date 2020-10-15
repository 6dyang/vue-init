/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-vue-init:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file([".idea"]);
    assert.file([".vscode"]);
    assert.file(["build"]);
    assert.file(["deploy"]);
    assert.file(["public"]);
    assert.file(["src"]);
    assert.file(["tests"]);
    assert.file([".babelrc"]);
    assert.file([".browserslistrc"]);
    assert.file([".editorconfig"]);
    assert.file([".env.development"]);
    assert.file([".env.production"]);
    assert.file([".env.staging"]);
    assert.file([".eslintignore"]);
    assert.file([".eslintrc.js"]);
    assert.file([".gitignore"]);
    assert.file(["package.json"]);
    assert.file(["babel.config.js"]);
    assert.file(["components.json"]);
    assert.file(["jest.config.js"]);
    assert.file(["jsconfig.json"]);
    assert.file(["README.md"]);
    assert.file(["vue.config.js"]);
  });
});
