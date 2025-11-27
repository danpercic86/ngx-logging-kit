import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner, UnitTestTree } from "@angular-devkit/schematics/testing";
import * as path from "path";
import { beforeEach, describe, expect, it } from "vitest";

const collectionPath = path.join(__dirname, "../collection.json");

const schematicName = "ngx-logger-migration";

describe(schematicName, () => {
    let runner: SchematicTestRunner;
    let tree: UnitTestTree;

    beforeEach(() => {
        runner = new SchematicTestRunner("schematics", collectionPath);
        tree = new UnitTestTree(Tree.empty());
    });

    it("should replace ngx-logger imports with ngx-logging-kit", async () => {
        tree.create(
            "src/app/app.component.ts",
            `
      import { Component } from '@angular/core';
      import { LoggerModule } from 'ngx-logger';
      import { LoggerConfig } from 'ngx-logger';

      @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
      })
      export class AppComponent {
        constructor(private logger: LoggerModule) {}
      }
    `,
        );

        const newTree = await runner.runSchematic(schematicName, {}, tree);
        const content = newTree.readContent("src/app/app.component.ts");

        expect(content).toContain("import { LoggerModule } from 'ngx-logging-kit';");
        expect(content).toContain("import { LoggerConfig } from 'ngx-logging-kit';");
        expect(content).not.toContain("from 'ngx-logger'");
    });

    it("should not affect other imports", async () => {
        tree.create(
            "src/app/other.ts",
            `
      import { Component } from '@angular/core';
      import { Something } from 'other-lib';
    `,
        );

        const newTree = await runner.runSchematic(schematicName, {}, tree);
        const content = newTree.readContent("src/app/other.ts");

        expect(content).toContain("import { Component } from '@angular/core';");
        expect(content).toContain("import { Something } from 'other-lib';");
    });
});
