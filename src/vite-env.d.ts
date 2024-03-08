/// <reference types="vite/client" />
/// <reference types="unplugin-fonts/client" />
/// <reference types="vite-plugin-svgr/client" />

import '@tanstack/react-table'
import { type SxProps } from '@mui/material'
import { type ConnectDropTarget, type ConnectDragSource } from 'react-dnd'

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL_YANDEX: string
  readonly VITE_API_YANDEX_KEY: string
  readonly VITE_API_SOCKET_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    getCellContext: (context: CellContext<TData, TValue>) => { sx?: SxProps }
  }
  interface CellContext<TData extends RowData, TValue> {
    dragRef: ConnectDragSource
    dropRef: ConnectDropTarget
    isDragging: boolean
  }
}
