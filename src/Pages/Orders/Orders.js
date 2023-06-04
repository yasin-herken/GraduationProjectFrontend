import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, {useEffect, useRef, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import "./Orders.css";
import {getOrdersBy, updateOrderStatus} from "../../Services/orderServices";
import {Dropdown} from "primereact/dropdown";

const Orders = () => {
  const toast = useRef(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    pageNo: 0, pageSize: 5, page: 0, sortBy: "createdAt", direction: "ASC",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const loadLazyTimeout = useRef(null);

  const statusEditor = (options) => {
    return (<Dropdown
      value={options.value}
      options={["PENDING", "CANCELLED_FROM_SELLER", "CANCELLED_FROM_CUSTOMER", "ON_WAY", "DELIVERED"]}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Select a Status"
    />);
  };

  const formatCurrency = (value) => {
    return <span>{value.currency + value.price}</span>;
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.product.price);
  };

  const onPage = (event) => {
    setLazyParams({
      ...lazyParams, pageNo: event.first, pageSize: event.rows, page: event.page,
    });
  };
  useEffect(() => {
    setLoading(true);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    loadLazyTimeout.current = setTimeout(() => {
      const getOrders = async () => {
        try {
          const fetchData = await getOrdersBy(lazyParams);
          setOrders(fetchData.data);
          setTotalRecords(fetchData.totalRecords);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
      getOrders();
    });
  }, [lazyParams, loadLazyTimeout]);
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
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} entries`}
          rowsPerPageOptions={[5, 10, 20]}
          editMode={"row"}
          dataKey={"orderDetailsNo"}
          onRowEditComplete={async (e) => {
            const res = await updateOrderStatus(e.newData.orderDetailsNo, e.newData.orderStatus);
            if (res) {
              toast.current.show({severity: "success", summary: "Success", detail: "Order Updated", life: 3000});
              setOrders(orders.map((order) => {
                if (order.orderDetailsNo === e.newData.orderDetailsNo) {
                  return {
                    ...order,
                    orderStatus: e.newData.orderStatus,
                  };
                }
                return order;
              }));
            } else {
              toast.current.show({severity: "error", summary: "Error", detail: "Order Update Failed", life: 3000});
            }
          }}
        >
          <Column
            field="orderDetailsNo"
            header="Order Id"
          />
          <Column
            field="createdAt"
            header="Order Date"
          />
          <Column
            field="product.title"
            header="Product Title"
          />
          <Column
            field="totalPrice"
            header="Total Price"
            body={priceBodyTemplate}
          />
          <Column
            field="orderStatus"
            header="Status"
            editor={(options) => {
              return statusEditor(options)
            }}
          />
          <Column
            header="Update Table"
            rowEditor
            bodyStyle={{textAlign: 'center'}}
          />
        </DataTable>
      </div>
    </div>
  </React.Fragment>);
}


export default Orders;
