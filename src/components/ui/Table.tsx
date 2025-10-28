import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type PaginationState,
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
  Download,
} from 'lucide-react';
import { useState, useMemo, type ReactNode } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Checkbox } from './Checkbox';
import { Popover, PopoverButton, PopoverPanel } from './Popover';

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  onRowClick?: (row: TData) => void;
  emptyMessage?: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  exportable?: boolean;
  onExport?: (data: TData[]) => void;
  striped?: boolean;
  hoverable?: boolean; // cspell:disable-line
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string;
}

export function Table<TData>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableRowSelection = false,
  enableColumnVisibility = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  onRowSelectionChange,
  onRowClick,
  emptyMessage = 'No data available',
  title,
  description,
  actions,
  exportable = false,
  onExport,
  striped = true,
  hoverable = true, // cspell:disable-line
  bordered = false,
  compact = false,
  stickyHeader = false,
  maxHeight = '600px',
}: TableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  // Add selection column if enabled
  const tableColumns = useMemo(() => {
    if (!enableRowSelection) return columns;

    const selectionColumn: ColumnDef<TData, unknown> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={(checked) => {
            const event = {
              target: {
                checked,
              }
            }
            table.getToggleAllPageRowsSelectedHandler()(event)
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 60,
      enableSorting: false,
      enableHiding: false,
      meta: { pinned: 'left' },
    };

    return [selectionColumn, ...columns];
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      if (onRowSelectionChange) {
        const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
        const selectedRows = table
          .getRowModel()
          .rows.filter((row) => newSelection[row.id])
          .map((row) => row.original);
        onRowSelectionChange(selectedRows);
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    enableSorting,
    enableFilters: enableFiltering,
    enableColumnFilters: enableFiltering,
    enableGlobalFilter: enableFiltering,
  });

  const handleExport = () => {
    if (onExport) {
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
      onExport(selectedRows.length > 0 ? selectedRows : data);
    }
  };

  const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      {(title || description || enableFiltering || actions || exportable || enableColumnVisibility) && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              {title && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {actions}
              {exportable && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download size={16} />}
                  onClick={handleExport}
                >
                  导出
                </Button>
              )}
              {enableColumnVisibility && (
                <Popover className="relative">
                  <PopoverButton
                    as={Button}
                    variant="outline"
                    size="sm"
                    leftIcon={<Settings2 size={16} />}
                  >
                    视图
                  </PopoverButton>
                  <PopoverPanel className="absolute right-0 z-100 mt-2 w-56 origin-top-right">
                    <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 p-2">
                      <div className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 mb-2">
                        切换列显示
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {table.getAllLeafColumns().map((column) => {
                          if (column.id === 'select') return null;
                          return (
                            <label
                              key={column.id}
                              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              <Checkbox
                                checked={column.getIsVisible()}
                                onChange={(checked) => {
                                  column.getToggleVisibilityHandler()({
                                    target: {
                                      checked,
                                    }
                                  })
                                }}
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                {typeof column.columnDef.header === 'string'
                                  ? column.columnDef.header
                                  : column.id}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </PopoverPanel>
                </Popover>
              )}
            </div>
          </div>

          {/* Global Search */}
          {enableFiltering && (
            <div className="relative">
              <Input
                placeholder="搜索所有列..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                leftIcon={<Search size={16} />}
                rightIcon={
                  globalFilter && (
                    <button
                      onClick={() => setGlobalFilter('')}
                      className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors pointer-events-auto cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  )
                }
              />
            </div>
          )}

          {/* Selection Info */}
          {enableRowSelection && Object.keys(rowSelection).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <span className="text-sm text-blue-900 dark:text-blue-100">
                已选择 {Object.keys(rowSelection).length} 行
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRowSelection({})}
                rightIcon={<X size={14} />}
              >
                清除
              </Button>
            </motion.div>
          )}
        </div>
      )}

      {/* Table Container */}
      <div
        className={`
          ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}
          rounded-lg overflow-hidden
          bg-white dark:bg-gray-800
          shadow-sm
        `}
      >
        <div
          className="overflow-auto"
          style={stickyHeader ? { maxHeight } : undefined}
        >
          <table className="min-w-full border-collapse" style={{ tableLayout: 'auto' }}>
            <thead
              className={`
                bg-gray-50 dark:bg-gray-900/50
                ${stickyHeader ? 'sticky top-0 z-10' : ''}
              `}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-700">
                  {headerGroup.headers.map((header) => {
                    const isPinned = (header.column.columnDef.meta as any)?.pinned;
                    const columnSize = header.getSize();

                    return (
                      <th
                        key={header.id}
                        style={{
                          width: columnSize !== 150 ? `${columnSize}px` : 'auto',
                          minWidth: columnSize !== 150 ? `${columnSize}px` : 'auto',
                          maxWidth: columnSize !== 150 ? `${columnSize}px` : 'auto',
                          ...(isPinned === 'left' && {
                            position: 'sticky',
                            left: 0,
                            zIndex: 20,
                          }),
                          ...(isPinned === 'right' && {
                            position: 'sticky',
                            right: 0,
                            zIndex: 20,
                          }),
                        }}
                        className={`
                          ${cellPadding}
                          text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider
                          ${header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors' : ''}
                          ${isPinned ? 'bg-gray-50 dark:bg-gray-900/50' : ''}
                          ${isPinned === 'right' ? 'shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.3)]' : ''}
                          ${isPinned === 'left' ? 'shadow-[4px_0_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[4px_0_8px_-2px_rgba(0,0,0,0.3)]' : ''}
                        `}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-2">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <span className="text-gray-400">
                                {header.column.getIsSorted() === 'asc' ? (
                                  <ChevronUp size={16} className="text-blue-500" />
                                ) : header.column.getIsSorted() === 'desc' ? (
                                  <ChevronDown size={16} className="text-blue-500" />
                                ) : (
                                  <ChevronsUpDown size={16} />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={table.getVisibleFlatColumns().length}
                      className="text-center py-12"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-gray-400 dark:text-gray-500">
                          <Search size={48} strokeWidth={1} />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15, delay: index * 0.02 }}
                      onClick={() => onRowClick && onRowClick(row.original)}
                      className={`
                        border-b border-gray-200 dark:border-gray-700 last:border-b-0
                        ${striped && index % 2 === 1 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-black'}
                        ${hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors' : ''}
                        ${onRowClick ? 'cursor-pointer' : ''}
                        ${row.getIsSelected() ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                      `}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const isPinned = (cell.column.columnDef.meta as any)?.pinned;
                        const isStriped = striped && index % 2 === 1;
                        const isSelected = row.getIsSelected();
                        const columnSize = cell.column.getSize();

                        return (
                          <td
                            key={cell.id}
                            style={{
                              width: columnSize !== 150 ? `${columnSize}px` : 'auto',
                              minWidth: columnSize !== 150 ? `${columnSize}px` : 'auto',
                              maxWidth: columnSize !== 150 ? `${columnSize}px` : 'auto',
                              ...(isPinned === 'left' && {
                                position: 'sticky',
                                left: 0,
                                zIndex: 10,
                              }),
                              ...(isPinned === 'right' && {
                                position: 'sticky',
                                right: 0,
                                zIndex: 10,
                              }),
                            }}
                            className={`
                              ${cellPadding}
                              text-sm text-gray-900 dark:text-gray-100
                              ${isPinned && !isSelected && !isStriped ? 'bg-gray-50 dark:bg-gray-800' : ''}
                              ${isPinned && isStriped && !isSelected ? 'bg-white dark:bg-gray-900' : ''}
                              ${isPinned && isSelected ? 'bg-blue-50 dark:bg-blue-900' : ''}
                              ${isPinned === 'right' ? 'shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.3)]' : ''}
                              ${isPinned === 'left' ? 'shadow-[4px_0_8px_-2px_rgba(0,0,0,0.1)] dark:shadow-[4px_0_8px_-2px_rgba(0,0,0,0.3)]' : ''}
                            `}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {enablePagination && table.getPageCount() > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>
                显示 {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} 到{' '}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{' '}
                条，共 {table.getFilteredRowModel().rows.length} 条结果
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Page Size Selector */}
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="h-9 px-3 text-sm border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size} 条/页
                  </option>
                ))}
              </select>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  leftIcon={<ChevronsLeft size={14} />}
                >
                  首页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  leftIcon={<ChevronLeft size={14} />}
                >
                  上一页
                </Button>

                {/* Page Numbers */}
                <div className="hidden sm:flex items-center gap-1 px-2">
                  {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => {
                    const currentPage = table.getState().pagination.pageIndex;
                    let pageNum: number;

                    if (table.getPageCount() <= 5) {
                      pageNum = i;
                    } else if (currentPage <= 2) {
                      pageNum = i;
                    } else if (currentPage >= table.getPageCount() - 3) {
                      pageNum = table.getPageCount() - 5 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => table.setPageIndex(pageNum)}
                        className={`
                          w-8 h-8 rounded text-sm font-medium transition-colors
                          ${pageNum === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  rightIcon={<ChevronRight size={14} />}
                >
                  下一页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  rightIcon={<ChevronsRight size={14} />}
                >
                  末页
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to create column definitions with type safety
export function createColumnHelper<TData>() {
  return {
    accessor: <TAccessor extends keyof TData>(
      accessor: TAccessor,
      column: Omit<ColumnDef<TData, TData[TAccessor]>, 'accessorKey'>
    ): ColumnDef<TData, TData[TAccessor]> => ({
      ...column,
      accessorKey: accessor as string,
    }),
    display: (column: ColumnDef<TData, unknown>): ColumnDef<TData, unknown> => column,
  };
}
