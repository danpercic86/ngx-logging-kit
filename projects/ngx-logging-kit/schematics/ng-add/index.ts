import { chain, Rule, schematic, SchematicContext, Tree } from "@angular-devkit/schematics";

export function ngAdd(): Rule {
    return (tree: Tree, _context: SchematicContext) => chain([schematic("migration-v1", {})])(tree, _context);
}
