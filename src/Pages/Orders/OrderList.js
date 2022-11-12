import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useEffect, useState } from 'react'
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { FilterMatchMode } from 'primereact/api';
import { publicRequest } from '../../Requests/RequestMethods';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import "./OrderList.css";
import { MdDeleteOutline, MdRemoveRedEye } from 'react-icons/md';
const OrderList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState({
        'userId': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { value: null, matchMode: FilterMatchMode.CONTAINS },
        // 'title': { operator: FilterOperator.CONTAINS},
        // 'body': {operator: FilterOperator.CONTAINS },

    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['userId'].value = value;
        _filters['id'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center ">
                <h5 className="m-0">Order List</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    <Button icon={<MdRemoveRedEye className='mr-1' />} label="View" className='p-button-info p-button-rounded ml-5' />
                    <Button icon={<MdDeleteOutline className='mr-1'/>} label="Delete" className='p-button-info p-button-rounded ml-2' />
                </span>

            </div>
        )
    }
    const header = renderHeader();
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await publicRequest.get("/posts");
                if (res.status === 200) {
                    setData(res.data);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
    }, []);
    return (
        <DataTable
            value={data}
            paginator
            className='p-datatable-customers'
            header={header}
            rows={10}
            filters={filters}
            selection={selectedCustomers}
            onSelectionChange={(e) => setSelectedCustomers(e.value)}
            // filterDisplay="menu"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[5, 10, 20, 50]}
            dataKey="id"
            rowHover
            loading={loading}
            globalFilterFields={
                ['userId', 'id', 'title', 'body']
            }
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
            <Column
                selectionMode="multiple"
                selectionAriaLabel="name"
                headerStyle={{ width: "3em" }} />
            <Column field="userId" header="User ID" sortable />
            <Column field="id" header="ID" sortable />
            <Column field="title" header="Title" sortable />
            <Column field="body" header="Body" sortable />
        </DataTable>
    )
}

export default OrderList