import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../Orders/Orders.css";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getProducts } from "../../Services/productServices";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { deleteProduct as Delete } from "../../Services/userServices";
import { Toolbar } from "primereact/toolbar";
const ProductList = () => {
  const toast = useRef(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    pageNo: 0,
    pageSize: 5,
    page: 0,
    sortBy: "createdAt",
    direction: "ASC",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const loadLazyTimeout = useRef(null);
  const navigate = useNavigate();
  const formatCurrency = (value) => {
    return <span>{value.currency + value.price}</span>;
  };
  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };
  const onPage = (event) => {
    console.log(event);
    setLazyParams({
      ...lazyParams,
      pageNo: event.first,
      pageSize: event.rows,
      page: event.page,
    });
  };
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    const items = [
      {
        icon: "pi-ellipsis-v",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
            command: () => {
              navigate(`/products/${rowData.id}`);
            },
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-trash",
            command: () => {
              confirmDeleteProduct(rowData);
            },
          },
        ],
      },
    ];
    return <Menubar model={items} className="bg-white text-white" />;
  };
  const confirmDeleteSelected = () => {
    setDeleteProductDialog(true);
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={() => navigate("/products/new")}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProduct || !selectedProduct.length}
        />
      </React.Fragment>
    );
  };
  const deleteProduct = async () => {
    try {
      const response = await Delete(product.id);
      console.log(response);
      let _product = products.filter((val) => val.id !== product.id);
      setProducts(_product);
      setDeleteProductDialog(false);
      setProduct({});
      setSelectedProduct(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User Deleted",
        life: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "User Not Deleted",
        life: 3000,
      });
    }
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  useEffect(() => {
    setLoading(true);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    loadLazyTimeout.current = setTimeout(() => {
      const getProduct = async () => {
        try {
          const fetchData = await getProducts(lazyParams);
          setProducts(fetchData.data);
          setTotalRecords(fetchData.totalRecords);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
      getProduct();
    });
  }, [lazyParams, loadLazyTimeout]);
  return (
    <React.Fragment>
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card p-4">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            className="p-datatable-customer p-datatable-sm"
            value={products}
            paginator
            lazy
            first={lazyParams.pageNo}
            totalRecords={totalRecords}
            loading={loading}
            rows={lazyParams.pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            size="small"
            scrollHeight="100%"
            onPage={onPage}
            selectionMode="single"
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} entries`}
          >
            <Column selectionMode="multiple" />
            <Column field="title" header="Product" sortable />
            <Column field="stock" header="Stock" sortable />
            <Column header="Price" sortable body={priceBodyTemplate} />
            <Column field="createdAt" header="Created At" sortable />
            <Column header="Action" body={actionBodyTemplate} />
          </DataTable>
          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Are you sure you want to delete <b>{product.title}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
