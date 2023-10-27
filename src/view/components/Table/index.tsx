import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { Cell, Column, Header, InputCell, Row, TableContent } from './style';
import { FootCell } from './FootCell';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    update: (rowIndex: number, columnId: string, value: unknown) => void;
    add: () => void;
  }
}

const defaultColumn: Partial<ColumnDef<unknown, any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.update(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <InputCell
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

interface TableProps {
  items: any[];
  langs: string[];
}

export function Table({ items, langs }: TableProps) {
  const [data, setData] = useState(items);

  const [columns, setColumns] = useState<ColumnDef<unknown, any>[]>([
    {
      header: 'Key',
      accessorKey: 'key',
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      update(rowIndex, columnId, value) {
        setData((old) =>
          old.map((e, index) => {
            if (index === rowIndex) {
              return {
                ...old[index]!,
                [columnId]: value,
              };
            }
            return e;
          })
        );
      },
      add: () => {
        setData((old) => [...old, {}]);
      },
    },
  });

  useEffect(() => {
    setData(items);
  }, [items]);

  useEffect(() => {
    setColumns([
      {
        header: 'Key',
        accessorKey: 'key',
      },
      ...langs.map((l) => ({
        header: l,
        accessorKey: l,
      })),
    ]);
  }, [langs]);

  return (
    <TableContent>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <Header key={hg.id}>
            {hg.headers.map((h) => (
              <Column key={h.id} colSpan={h.colSpan}>
                {flexRender(h.column.columnDef.header, h.getContext())}
              </Column>
            ))}
          </Header>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            ))}
          </Row>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={table.getCenterLeafColumns().length} align="right">
            <FootCell add={table.options.meta?.add} />
          </th>
        </tr>
      </tfoot>
    </TableContent>
  );
}
