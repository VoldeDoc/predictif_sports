// import React, { useState, useEffect } from 'react';
// import { FilterMatchMode, FilterService } from 'primereact/api';
// import { DataTable, DataTableFilterMeta, DataTableFilterMetaData } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { Tag } from 'primereact/tag';
// import { Checkbox } from 'primereact/checkbox';

// // The rule argument should be a string in the format "custom_[field]".
// FilterService.register('custom_activity', (value, filters) => {
//   const [from, to] = filters ?? [null, null];
//   if (from === null && to === null) return true;
//   if (from !== null && to === null) return from <= value;
//   if (from === null && to !== null) return value <= to;
//   return from <= value && value <= to;
// });

// export default function CustomFilterDemo() {
//     const [customers, setCustomers] = useState<any[]>([]);
//     const [filters, setFilters] = useState<{ [key: string]: DataTableFilterMetaData }>({
//         global: { value: null, matchMode: FilterMatchMode.CONTAINS }
//     });
//     const [loading, setLoading] = useState(true);
//     const [globalFilterValue, setGlobalFilterValue] = useState('');
//     const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

//     const getSeverity = (status: string) => {
//         switch (status) {
//             case 'unqualified':
//                 return 'danger';
//             case 'qualified':
//                 return 'success';
//             case 'new':
//                 return 'info';
//             case 'negotiation':
//                 return 'warning';
//             case 'renewal':
//                 return null;
//             default:
//                 return null;
//         }
//     };

//     useEffect(() => {
//         // Simulate fetching data with football terms
//         const data = Array.from({ length: 100 }, (_, i) => ({
//             id: i,
//             name: `Strategy ${i}`,
//             representative: { name: `Coach ${i}`, image: `avatar-${i}.png` },
//             status: statuses[i % statuses.length],
//             verified: i % 2 === 0,
//             activity: Math.floor(Math.random() * 100),
//             outcome: `Outcome ${i}`
//         }));
//         setCustomers(data);
//         setLoading(false);
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps

//     const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         let _filters = { ...filters };

//         (_filters['global'] as DataTableFilterMeta).value = value;
//         setFilters(_filters);
//         setGlobalFilterValue(value);
//     };

//     const renderHeader = () => {
//         return (
//             <div className="flex justify-content-end">
//                 <span className="p-input-icon-left">
//                     <i className="pi pi-search" />
//                     <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
//                 </span>
//             </div>
//         );
//     };

//     const statusBodyTemplate = (rowData: any) => {
//         return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
//     };

//     const strategyNameBodyTemplate = (rowData: any) => {
//         return (
//             <div className="flex align-items-center gap-2">
//                 <Checkbox checked={rowData.selected} onChange={(e) => rowData.selected = e.checked} />
//                 <span>{rowData.name}</span>
//             </div>
//         );
//     };

//     const actionBodyTemplate = (rowData: any) => {
//         return (
//             <div className="flex gap-2">
//                 <button className="p-button p-component">View</button>
//                 <button className="p-button p-component">Import Strategy</button>
//             </div>
//         );
//     };

//     const header = renderHeader();

//     return (
//         <div className="card">
//             <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="menu" loading={loading}
//                     globalFilterFields={['name', 'representative.name', 'status']} header={header} emptyMessage="No customers found.">
//                 <Column header="Strategy Name" body={strategyNameBodyTemplate} style={{ minWidth: '12rem' }} />
//                 <Column field="activity" header="Hitrate" style={{ minWidth: '12rem' }} />
//                 <Column field="outcome" header="Outcome" style={{ minWidth: '12rem' }} />
//                 <Column field="status" header="Status" body={statusBodyTemplate} style={{ minWidth: '12rem' }} />
//                 <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
//             </DataTable>
//         </div>
//     );
// }