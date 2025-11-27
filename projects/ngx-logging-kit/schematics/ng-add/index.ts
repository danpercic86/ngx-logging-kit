import { chain, Rule, schematic, SchematicContext, Tree } from "@angular-devkit/schematics";

export function ngAdd(): Rule {
    return (tree: Tree, _context: SchematicContext) =>
        chain([schematic("ngx-logger-migration", {})])(tree, _context);
}
