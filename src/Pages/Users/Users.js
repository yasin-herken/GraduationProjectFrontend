import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Button } from "primereact/button";
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { users } from "../../users";
import "./Users.css";
import { MdDeleteOutline, MdRemoveRedEye } from 'react-icons/md';
var emptyProduct = {
    "address": {
        "geolocation": {
            "lat": "",
            "long": ""
        },
        "city": "",
        "street": "",
        "number": 0,
        "zipcode": ""
    },
    "id": null,
    "email": "",
    "username": "",
    "name": {
        "firstname": "",
        "lastname": ""
    },
    "phone": "1-570-236-7033",
    "__v": 0
};
const roles = {
    "ROLE_ADMIN": "ADMIN",
    "ROLE_MODERATOR": "MODERATOR",
    "ROLE_USER": "USER"
}
const Users = () => {
    const [data, setData] = useState(users);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const toast = useRef(null);
    const [filters, setFilters] = useState({
        'name.firstname': { value: null, matchMode: FilterMatchMode.CONTAINS },
        // 'title': { operator: FilterOperator.CONTAINS},
        // 'body': {operator: FilterOperator.CONTAINS },

    });

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }
    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['name.firstname'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }
    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.name;
        return (
            <React.Fragment>
                <img alt={representative.name} src={`images/avatar/${representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{representative.firstname + " " + representative.lastname}</span>
            </React.Fragment>
        );
    }
    const roleBodyTemplate = (rowData) => {
        const userRoles = rowData?.role;
        let text = userRoles?.includes("ROLE_ADMIN") ? roles["ROLE_ADMIN"] : userRoles?.includes("ROLE_MODERATOR") ? roles["ROLE_MODERATOR"] : roles["ROLE_USER"];
        return (
            <span>{text}</span>
        )
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex flex-row-reverse mr-1'>
                    <Button icon={<MdRemoveRedEye className='mr-1' />} label="View" className='p-button-info p-button-rounded ml-1' onClick={() => editProduct(rowData)} />
                    <Button icon={<MdDeleteOutline className='mr-1' />} label="Delete" className='p-button-info p-button-rounded ml-1' onClick={() => confirmDeleteProduct(rowData)} />
                </div>
            </React.Fragment>
        );
    }
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center ">
                <h5 className="m-0">User List</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }
    const header = renderHeader();
    return (
        <React.Fragment>
            <div className="datatable-crud-demo">
                <Toast ref={toast} />
                <div className='card p-4' >
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                    <DataTable
                        value={data}
                        paginator
                        className='p-datatable-customers'
                        rows={5}
                        header={header}
                        filters={filters}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        dataKey="id"
                        rowHover
                        responsiveLayout='scroll'
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: '4rem' }}
                            exportable={false}
                        />
                        <Column
                            header="User"
                            filterField="representative"
                            showFilterMatchModes={false}
                            filterMenuStyle={{ width: '14rem' }}
                            body={representativeBodyTemplate}
                            sortable
                        />
                        <Column
                            field="role"
                            header="Role"
                            body={roleBodyTemplate}
                            sortable
                        />
                        <Column
                            field="email"
                            header="Email"
                            sortable
                        />
                        <Column
                            field="address.city"
                            header="City"
                            sortable
                        />
                        <Column
                            field="phone"
                            header="Phone"
                            sortable
                        />
                        <Column
                            body={actionBodyTemplate}
                            exportable={false}
                        />
                        {/* <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column> */}
                        {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                        <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    </DataTable>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Users