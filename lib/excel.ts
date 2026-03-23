export async function downloadExcel(filename: string, rows: (string | number | null | undefined)[][]) {
  if (typeof window === 'undefined') return;
  const XLSX = await import('xlsx');
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const out = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([out], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export type InventoryImageRow = {
  cells: (string | number | null | undefined)[];
  imageUrl?: string | null;
};

export type SalesExportRow = {
  cells: (string | number | null | undefined)[];
  kind?: 'group' | 'subgroup' | 'data';
};

export async function downloadInventoryXlsxWithImages({
  filename,
  header,
  rows,
  imageColumnIndex,
  thumbnailSize = 50,
  rowHeight = 50,
}: {
  filename: string;
  header: string[];
  rows: InventoryImageRow[];
  imageColumnIndex: number;
  thumbnailSize?: number;
  rowHeight?: number;
}) {
  if (typeof window === 'undefined') return;
  const ExcelJS = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventory');
  worksheet.addRow(header);
  worksheet.getRow(1).height = 24;

  header.forEach((name, idx) => {
    const column = worksheet.getColumn(idx + 1);
    if (name.toLowerCase() === 'image') {
      column.width = 12;
    } else if (name.toLowerCase() === 'no') {
      column.width = 6;
    } else if (name.toLowerCase().includes('name')) {
      column.width = 24;
    } else if (name.toLowerCase().includes('category')) {
      column.width = 18;
    } else if (name.toLowerCase().includes('remark')) {
      column.width = 18;
    } else {
      column.width = 12;
    }
  });

  const getExtension = (type?: string): 'jpeg' | 'png' | 'gif' => {
    if (!type) return 'png';
    if (type.includes('png')) return 'png';
    if (type.includes('gif')) return 'gif';
    if (type.includes('jpeg') || type.includes('jpg')) return 'jpeg';
    return 'png';
  };

  const loadImageBuffer = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Image fetch failed');
    }
    const contentType = res.headers.get('content-type') ?? undefined;
    const buffer = await res.arrayBuffer();
    return { buffer, extension: getExtension(contentType) };
  };

  for (let i = 0; i < rows.length; i += 1) {
    const rowIndex = i + 2;
    const safeCells = [...rows[i].cells];
    while (safeCells.length < header.length) {
      safeCells.push('');
    }
    worksheet.addRow(safeCells);
    const row = worksheet.getRow(rowIndex);
    row.height = rowHeight;

    const imageUrl = rows[i].imageUrl;
    if (imageUrl) {
      try {
        const { buffer, extension } = await loadImageBuffer(imageUrl);
        const imageId = workbook.addImage({ buffer, extension: extension as 'jpeg' | 'png' | 'gif' });
        worksheet.addImage(imageId, {
          tl: { col: imageColumnIndex - 1 + 0.15, row: rowIndex - 1 + 0.15 },
          ext: { width: thumbnailSize, height: thumbnailSize },
        });
      } catch {
        continue;
      }
    }
  }

  const out = await workbook.xlsx.writeBuffer();
  const blob = new Blob([out], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadSalesXlsx({
  filename,
  title,
  summaryRows,
  columns,
  rows,
}: {
  filename: string;
  title: string;
  summaryRows: [string, string | number | null | undefined][];
  columns: string[];
  rows: SalesExportRow[];
}) {
  if (typeof window === 'undefined') return;
  const ExcelJS = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sales');

  const titleRow = worksheet.addRow([title]);
  titleRow.font = { bold: true, size: 14 };
  worksheet.addRow([]);

  summaryRows.forEach(([label, value]) => {
    const row = worksheet.addRow([label, value ?? '']);
    row.font = { bold: true };
  });

  worksheet.addRow([]);
  const headerRow = worksheet.addRow(columns);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle' };

  columns.forEach((name, idx) => {
    const column = worksheet.getColumn(idx + 1);
    if (name.toLowerCase() === 'no.') {
      column.width = 6;
    } else if (name.toLowerCase().includes('invoice')) {
      column.width = 18;
    } else if (name.toLowerCase().includes('customer')) {
      column.width = 20;
    } else if (name.toLowerCase().includes('items')) {
      column.width = 32;
    } else if (name.toLowerCase().includes('payment')) {
      column.width = 16;
    } else if (name.toLowerCase().includes('total')) {
      column.width = 16;
    } else {
      column.width = 14;
    }
  });

  let dataIndex = 0;
  rows.forEach((row) => {
    const excelRow = worksheet.addRow(row.cells);
    if (row.kind === 'group') {
      excelRow.font = { bold: true };
      excelRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE5E7EB' },
      };
    } else if (row.kind === 'subgroup') {
      excelRow.font = { bold: true };
      excelRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF3F4F6' },
      };
    } else {
      dataIndex += 1;
      if (dataIndex % 2 === 0) {
        excelRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF9FAFB' },
        };
      }
    }
  });

  const out = await workbook.xlsx.writeBuffer();
  const blob = new Blob([out], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
