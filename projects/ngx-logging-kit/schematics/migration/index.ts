import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

import { NgxLoggerMigrationOptions } from "./schema";

/**
 * Normalizes a path by ensuring it starts with a forward slash.
 */
function normalizePath(path: string): string {
    return path.startsWith("/") ? path : "/" + path;
}

/**
 * Checks if a file path is within the target migration path.
 */
function isInTargetPath(filePath: string, targetPath: string): boolean {
    const normalizedTarget = targetPath === "." || !targetPath ? "/" : normalizePath(targetPath);
    return filePath.startsWith(normalizedTarget);
}

/**
 * Checks if a file should be excluded from migration.
 * Excludes node_modules and hidden folders (starting with .).
 */
function shouldExcludeFile(filePath: string): boolean {
    if (filePath.includes("/node_modules/")) {
        return true;
    }

    const pathParts = filePath.split("/");
    return pathParts.some(part => part.startsWith(".") && part !== ".");
}

/**
 * Migrates ngx-logger imports to ngx-logging-kit.
 * Handles both regular imports and testing imports.
 */
function migrateImports(sourceText: string): string {
    // Regex to find 'ngx-logger' and 'ngx-logger/testing' imports
    // Examples:
    // import { ... } from 'ngx-logger';
    // import { ... } from "ngx-logger/testing";
    const regex = /from\s+(['"])ngx-logger(\/testing)?\1/g;

    return sourceText.replace(regex, (_match: string, quote: string, testingPath?: string) => {
        const newPackage = testingPath ? "ngx-logging-kit/testing" : "ngx-logging-kit";
        return `from ${quote}${newPackage}${quote}`;
    });
}

/**
 * Processes a single file for migration.
 */
function processFile(tree: Tree, filePath: string, context: SchematicContext): void {
    const content = tree.read(filePath);
    if (!content) {
        return;
    }

    const sourceText = content.toString("utf-8");
    const newContent = migrateImports(sourceText);

    if (newContent !== sourceText) {
        tree.overwrite(filePath, newContent);
        context.logger.info(`Migrated imports in ${filePath}`);
    }
}

export function migrate(options: NgxLoggerMigrationOptions): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (!options.migrate) {
            context.logger.info("Migration skipped by user.");
            return tree;
        }

        tree.visit(filePath => {
            if (!filePath.endsWith(".ts")) {
                return;
            }

            if (!isInTargetPath(filePath, options.path)) {
                return;
            }

            if (shouldExcludeFile(filePath)) {
                return;
            }

            processFile(tree, filePath, context);
        });

        return tree;
    };
}
