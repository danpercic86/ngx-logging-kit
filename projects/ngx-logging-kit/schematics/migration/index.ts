import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

export function migrate(): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        tree.visit(filePath => {
            if (!filePath.endsWith(".ts")) {
                return;
            }

            const content = tree.read(filePath);
            if (!content) {
                return;
            }

            const sourceText = content.toString("utf-8");
            // Regex to find 'ngx-logger' imports
            // Examples:
            // import { ... } from 'ngx-logger';
            // import ... from 'ngx-logger';
            const regex = /from\s+['"]ngx-logger['"]/g;

            if (regex.test(sourceText)) {
                const newContent = sourceText.replace(regex, "from 'ngx-logging-kit'");
                tree.overwrite(filePath, newContent);
                _context.logger.info(`Migrated imports in ${filePath}`);
            }
        });

        return tree;
    };
}
