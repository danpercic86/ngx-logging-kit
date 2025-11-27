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
        constructor(private logger: NGXLogger) {}
      }
    `,
        );
    });

    it("should replace 'ngx-logger' imports with 'ngx-logging-kit' when migration is confirmed", async () => {
        const newTree = await runner.runSchematic(schematicName, { migrate: true, path: "." }, tree);
        const content = newTree.readContent("src/app/app.component.ts");
        expect(content).toContain("import { LoggerModule } from 'ngx-logging-kit';");
        expect(content).not.toContain("import { LoggerModule } from 'ngx-logger';");
    });

    it("should NOT replace imports when migration is NOT confirmed", async () => {
        const newTree = await runner.runSchematic(schematicName, { migrate: false, path: "." }, tree);
        const content = newTree.readContent("src/app/app.component.ts");
        expect(content).toContain("import { LoggerModule } from 'ngx-logger';");
        expect(content).not.toContain("import { LoggerModule } from 'ngx-logging-kit';");
    });

    it("should not affect other imports", async () => {
        tree.create(
            "src/app/other.ts",
            `
      import { Component } from '@angular/core';
      import { Something } from 'other-lib';
    `,
        );

        const newTree = await runner.runSchematic(schematicName, { migrate: true, path: "." }, tree);
        const content = newTree.readContent("src/app/other.ts");

        expect(content).toContain("import { Component } from '@angular/core';");
        expect(content).toContain("import { Something } from 'other-lib';");
    });

    it("should only migrate files in the specified path", async () => {
        tree.create("src/other-folder/file.ts", `import { LoggerModule } from 'ngx-logger';`);

        const newTree = await runner.runSchematic(schematicName, { migrate: true, path: "src/app" }, tree);

        // Should migrate app.component.ts (in src/app)
        const appContent = newTree.readContent("src/app/app.component.ts");
        expect(appContent).toContain("import { LoggerModule } from 'ngx-logging-kit';");

        // Should NOT migrate file.ts (in src/other-folder)
        const otherContent = newTree.readContent("src/other-folder/file.ts");
        expect(otherContent).toContain("import { LoggerModule } from 'ngx-logger';");
    });

    it("should exclude node_modules", async () => {
        tree.create("node_modules/some-lib/index.ts", `import { LoggerModule } from 'ngx-logger';`);

        const newTree = await runner.runSchematic(schematicName, { migrate: true, path: "." }, tree);
        const content = newTree.readContent("node_modules/some-lib/index.ts");
        expect(content).toContain("import { LoggerModule } from 'ngx-logger';");
    });

    it("should exclude hidden folders", async () => {
        tree.create(".hidden/file.ts", `import { LoggerModule } from 'ngx-logger';`);

        const newTree = await runner.runSchematic(schematicName, { migrate: true, path: "." }, tree);
        const content = newTree.readContent(".hidden/file.ts");
        expect(content).toContain("import { LoggerModule } from 'ngx-logger';");
    });
});
