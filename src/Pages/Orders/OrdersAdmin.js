import React, {useEffect, useRef, useState} from 'react';
import {getOrdersForAdmin} from "../../Services/orderServices";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const OrdersAdmin = () => {
  const toast = useRef(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    pageNo: 0, pageSize: 5, page: 0, sortBy: "createdAt", direction: "ASC",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const loadLazyTimeout = useRef(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const navigate = useNavigate();
  const onRowExpand = (event) => {
    toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
  };

  const onRowCollapse = (event) => {
    toast.current.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
  };

  const formatCurrency = (value) => {
    return <span>${value}</span>;
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.totalAmount);
  };

  const imageBodyTemplate = (rowData, a) => {
    console.log(rowData)
    return <img src={`${rowData.productImage[0].url}`} alt={rowData.image} className="shadow-2 border-round"
                style={{width: '64px'}}/>;
  };

  const onPage = (event) => {
    setLazyParams({
      ...lazyParams, pageNo: event.first, pageSize: event.rows, page: event.page,
    });
  };
  const allowExpansion = (rowData) => {
    return rowData?.orderDetails?.length > 0;
  };

  const actionBodyTemplate = (rowData) => {
    return <Button
      type="button"
      icon="pi pi-search"
      className={"p-button-secondary"}
      onClick={() => {
        navigate(`/orders/products/${rowData.productId}`)
      }}
      rounded
    />;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <DataTable value={data.orderDetails}>
          <Column header="Image" body={imageBodyTemplate}/>
          <Column field="orderDetailsNo" header="Order Detail No"/>
          <Column field="productId" header="Id"/>
          <Column field="productName" header="Title" sortable/>
          <Column field="quantity" header="Quantity" sortable/>
          <Column field="productPrice" header="Price" sortable/>
          <Column
            headerStyle={{width: '1rem', textAlign: 'center'}}
            bodyStyle={{textAlign: 'center', overflow: 'visible'}}
            body={actionBodyTemplate}/>
        </DataTable>
      </div>
    );
  };

  useEffect(() => {
    setLoading(true);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    loadLazyTimeout.current = setTimeout(() => {
      const getOrders = async () => {
        try {
          const fetchData = await getOrdersForAdmin(lazyParams);
          setOrders(fetchData.data);
          setTotalRecords(fetchData.totalRecords);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
      getOrders();
    });
  }, [lazyParams])
  return (<React.Fragment>
    <div className="datatable-crud-demo">
      <Toast ref={toast}/>
      <div className="card p-4">
        <DataTable
          value={orders}
          paginator
          className="p-datatable-customer p-datatable-sm"
          lazy
          first={lazyParams.pageNo}
          totalRecords={totalRecords}
          loading={loading}
          rows={lazyParams.pageSize}
          size="small"
          onPage={onPage}
          scrollHeight="100%"
          expandedRows={expandedRows}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          rowExpansionTemplate={rowExpansionTemplate}
          onRowToggle={(e) => setExpandedRows(e.data)}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} entries`}
          rowsPerPageOptions={[5, 10, 20]}
          dataKey={"orderId"}
        >
          <Column
            expander={allowExpansion}
          />
          <Column
            field="orderId"
            header="Order Id"
          />
          <Column
            field="createdAt"
            header="Order Date"
          />
          <Column
            field="customerFullName"
            header="Customer Name"
          />
          <Column
            field="totalAmount"
            header="Total Amount"
            body={priceBodyTemplate}
          />
          <Column
            field="paymentStatus"
            header="Payment Status"
          />
          <Column
            field="paymentMethod"
            header="Payment Method"
          />
        </DataTable>
      </div>
    </div>
  </React.Fragment>);
};

export default OrdersAdmin;