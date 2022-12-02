import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { products } from "../../products.js"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { MdDeleteOutline, MdRemoveRedEye } from 'react-icons/md';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
var emptyProduct = {
    "id": null,
    "title": "",
    "price": 0,
    "description": "",
    "category": null,
    "image": null,
    "rating": {
        "rate": 0,
        "count": 0
    }
}
const ProductList = () => {
    const [data, setData] = useState(products);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const [filters, setFilters] = useState({
        'title': { value: null, matchMode: FilterMatchMode.CONTAINS },
        // 'title': { operator: FilterOperator.CONTAINS},
        // 'body': {operator: FilterOperator.CONTAINS },

    });
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['title'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    }
    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating.rate} readOnly cancel={false} />;
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex align-items-center'>
                    <Button icon={<MdRemoveRedEye className='mr-1' />} label="View" className='p-button-info p-button-rounded ml-5' onClick={() => editProduct(rowData)} />
                    <Button icon={<MdDeleteOutline className='mr-1' />} label="Delete" className='p-button-info p-button-rounded ml-2' onClick={() => confirmDeleteProduct(rowData)} />
                </div>
            </React.Fragment>
        );
    }
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center ">
                <h5 className="m-0">Product List</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>

            </div>
        )
    }
    const statusBodyTemplate = (rowData) => {
        let status = "";

        if (rowData.rating.count > 10)
            status = "INSTOCK";
        else if (rowData.rating.count > 0 && rowData.rating.count < 10)
            status = "LOWSTOCK";
        else
            status = "OUTOFSTOCK";

        return <span className={`product-badge status-${status.toLowerCase()}`}>{status}</span>;
    }
    const header = renderHeader();
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    // const deleteProductsDialogFooter = (
    //     <React.Fragment>
    //         <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
    //         <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
    //     </React.Fragment>
    // );
    const deleteProduct = () => {
        let _products = data.filter(val => val.id !== product.id);
        setData(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <div className='datatable-crud-demo'>
                <Toast ref={toast} />
                <div className='card p-4'>
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
                        loading={loading}
                        globalFilterFields={
                            ['title']
                        }
                        responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field="title" header="Title" sortable ></Column>
                        <Column field="price" header="Price" sortable  body={priceBodyTemplate}></Column>
                        <Column field="description" header="Description" sortable ></Column>
                        <Column field="category" header="Category" sortable></Column>
                        {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column> */}
                        <Column field="rating.rate" header="Reviews" body={ratingBodyTemplate} sortable></Column>
                        <Column field="rating.count" header="Status" body={statusBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} exportable={false} ></Column>
                    </DataTable>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete <b>{product.title}</b>?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductList