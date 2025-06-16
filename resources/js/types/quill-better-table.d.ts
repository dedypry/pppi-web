// src/types/quill-better-table.d.ts
declare module 'quill-better-table' {
    export interface BetterTableOptions {
        operationMenu?: {
            items?: {
                insertRowUp?: boolean;
                insertRowDown?: boolean;
                insertColumnLeft?: boolean;
                insertColumnRight?: boolean;
                deleteRow?: boolean;
                deleteColumn?: boolean;
                mergeCells?: {
                    text?: string;
                };
                unmergeCells?: {
                    text?: string;
                };
            };
        };
    }

    const BetterTable: any; // you can use 'Quill.Module' if you're stricter
    export default BetterTable;
}
