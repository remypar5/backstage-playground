import { CatalogTable, CatalogTableColumnsFunc } from "@backstage/plugin-catalog";
import { getUserColumns } from "./User";

export const columns: CatalogTableColumnsFunc = (ctx) => {
    const defaultColumns = CatalogTable.defaultColumnsFunc(ctx);

    if (ctx.filters.kind?.value.match(/user/i)) {
        return getUserColumns(ctx);
    }
    
    return defaultColumns;
};
