/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the beautiful
        ${chalk.red("generator-vue-init")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "namespace",
        message: "请输入您的项目命名空间，例如@6dyang",
        default: ""
      },
      {
        type: "input",
        name: "name",
        message: "请输入项目名称:",
        default: "project"
      },
      {
        type: "input",
        name: "description",
        message: "请输入项目描述:",
        default: "这是一个VUE项目初始化模板"
      },
      {
        type: "input",
        name: "keywords",
        message: "包关键字(逗号分隔)",
        default: "vue"
      },
      {
        type: "input",
        name: "author",
        message: "作者:",
        default: "LiuDanYang"
      },
      {
        type: "input",
        name: "email",
        message: "邮箱:",
        default: "thedanyang@vip.qq.com"
      },
      {
        type: "input",
        name: "repository",
        message: "项目主页url",
        default: ""
      },
      {
        type: "input",
        name: "homepage",
        message: "作者主页url",
        default: "https://blog.csdn.net/qq_34707272"
      },
      {
        type: "input",
        name: "license",
        message: "License",
        default: "MIT"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      if (this.props.namespace) {
        this.props.fullName = this.props.namespace + "/" + this.props.name;
      } else {
        this.props.fullName = this.props.name;
      }
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.log("\nWriting...\n");

    this._writingIdea();
    this._writingVscode();
    this._writingBuild();
    this._writingDeploy();
    this._writingPublic();
    this._writingSrc();
    this._writingTests();
    this._writingBabelrc();
    this._writingBrowsersListrc();
    this._writingEditorConfig();
    this._writingEnvDevelopment();
    this._writingEnvProduction();
    this._writingEnvStaging();
    this._writingEslintignore();
    this._writingEslintrcJs();
    this._writingGitignore();
    this._writingPackageJSON();
    this._writingBabelConfig();
    this._writingComponents();
    this._writingJestConfig();
    this._writingJsConfig();
    this._writingREADME();
    this._writingVueConfigJs();
  }

  _writingIdea() {
    this.fs.copyTpl(this.templatePath(".idea"), this.destinationPath(".idea"));
  }

  _writingVscode() {
    this.fs.copyTpl(
      this.templatePath(".vscode"),
      this.destinationPath(".vscode")
    );
  }

  _writingBuild() {
    this.fs.copyTpl(this.templatePath("build"), this.destinationPath("build"));
  }

  _writingDeploy() {
    this.fs.copyTpl(
      this.templatePath("deploy"),
      this.destinationPath("deploy")
    );
  }

  _writingPublic() {
    this.fs.copyTpl(
      this.templatePath("public"),
      this.destinationPath("public")
    );
  }

  _writingSrc() {
    this.fs.copyTpl(this.templatePath("src"), this.destinationPath("src"));
  }

  _writingTests() {
    this.fs.copyTpl(this.templatePath("tests"), this.destinationPath("tests"));
  }

  _writingBabelrc() {
    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc")
    );
  }

  _writingBrowsersListrc() {
    this.fs.copyTpl(
      this.templatePath(".browserslistrc"),
      this.destinationPath(".browserslistrc")
    );
  }

  _writingEditorConfig() {
    this.fs.copyTpl(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );
  }

  _writingEnvDevelopment() {
    this.fs.copyTpl(
      this.templatePath(".env.development"),
      this.destinationPath(".env.development")
    );
  }

  _writingEnvProduction() {
    this.fs.copyTpl(
      this.templatePath(".env.production"),
      this.destinationPath(".env.production")
    );
  }

  _writingEnvStaging() {
    this.fs.copyTpl(
      this.templatePath(".env.staging"),
      this.destinationPath(".env.staging")
    );
  }

  _writingEslintignore() {
    this.fs.copyTpl(
      this.templatePath(".eslintignore"),
      this.destinationPath(".eslintignore")
    );
  }

  _writingEslintrcJs() {
    this.fs.copyTpl(
      this.templatePath(".eslintrc.js"),
      this.destinationPath(".eslintrc.js")
    );
  }

  _writingGitignore() {
    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        description: this.props.description,
        keywords: this.props.keywords.split(","),
        author: this.props.author,
        email: this.props.email,
        repository: this.props.repository,
        homepage: this.props.homepage,
        license: this.props.license
      }
    );
  }

  _writingBabelConfig() {
    this.fs.copyTpl(
      this.templatePath("babel.config.js"),
      this.destinationPath("babel.config.js")
    );
  }

  _writingComponents() {
    this.fs.copyTpl(
      this.templatePath("components.json"),
      this.destinationPath("components.json")
    );
  }

  _writingJestConfig() {
    this.fs.copyTpl(
      this.templatePath("jest.config.js"),
      this.destinationPath("jest.config.js")
    );
  }

  _writingJsConfig() {
    this.fs.copyTpl(
      this.templatePath("jsconfig.json"),
      this.destinationPath("jsconfig.json")
    );
  }

  _writingREADME() {
    this.fs.copyTpl(
      this.templatePath("README.md"),

      this.destinationPath("README.md"),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        description: this.props.description,
        repository: this.props.repository,
        author: this.props.author,
        year: new Date().getFullYear()
      }
    );
  }

  _writingVueConfigJs() {
    this.fs.copyTpl(
      this.templatePath("vue.config.js"),
      this.destinationPath("vue.config.js"),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        description: this.props.description,
        keywords: this.props.keywords.split(","),
        author: this.props.author,
        email: this.props.email,
        repository: this.props.repository,
        homepage: this.props.homepage,
        license: this.props.license,
        year: new Date().getFullYear()
      }
    );
  }

  install() {
    this.log("\nInstall...\n");
    this.installDependencies({ bower: false });
  }
};
