import React, {useEffect, useRef, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {InputText} from "primereact/inputtext";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import "./Users.css";
import {deleteUserById, getUsers} from "../../Services/userServices";
import {Dialog} from "primereact/dialog";

var emptyUser = {
  id: "",
  username: "",
  roles: [],
  company: "",
  address: "",
  city: "",
  phone: "",
  __v: 0,
};

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const toast = useRef(null);
  const loadLazyTimeout = useRef(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [lazyParams, setLazyParams] = useState({
    pageNo: 0,
    pageSize: 5,
    page: 0,
    sortBy: "createdAt",
    direction: "ASC",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const editUser = (user) => {
    setUser({...user});
    setUserDialog(true);
  };
  const confirmDeleteUser = (user) => {
    setUser(user);
    setDeleteUserDialog(true);
  };
  const roleBodyTemplate = (rowData) => {
    const roles = rowData?.roles ? rowData.roles : [];
    return (
      <React.Fragment>
        {roles.map((role) => (
          <span key={role.name} className="p-tag p-tag-rounded">
            {role.name}
          </span>
        ))}
      </React.Fragment>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="flex flex-row-reverse">
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-outlined"
            aria-label="Delete"
            onClick={() => confirmDeleteUser(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };
  const deleteUser = async() => {
    const deleteUser = deleteUserById(user.id)
    if(deleteUser) {
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User Deleted",
        life: 3000,
      });

    }
    setUser(emptyUser);

  };
  const deleteUserDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteUser}
      />
    </React.Fragment>
  );

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center ">
        <h5 className="m-0">User List</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search"/>
          <InputText
            value={globalFilterValue}
            onChange={(e) => setGlobalFilterValue(e.target.value)}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();
  const onPage = (event) => {
    setLazyParams({
      ...lazyParams,
      pageNo: event.first,
      pageSize: event.rows,
      page: event.page,
    });
  };

  const onSort = (event) => {
    setLazyParams({
      ...lazyParams,
      sortBy: event.sortField,
      direction: event.sortOrder === "-1" ? "DESC" : "ASC"
    });
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setLazyParams({
      ...lazyParams,
      pageNo: event.first,
      pageSize: event.rows,
      page: event.page,
      sortBy: event.sortField,
      direction: event.sortOrder,
    });
  };
  useEffect(() => {
    setLoading(true);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    loadLazyTimeout.current = setTimeout(() => {
      const getUser = async () => {
        try {
          const fetchData = await getUsers(lazyParams);
          setTotalRecords(fetchData.totalRecords);
          setData(fetchData.data);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
      getUser();
    });
  }, [lazyParams, loadLazyTimeout]);

  return !loading ? (
    <React.Fragment>
      <div className="datatable-crud-demo">
        <Toast ref={toast} onRemove={()=>window.location.reload(false)}/>
        <div className="card p-4">
          <DataTable
            value={data}
            paginator
            lazy
            first={lazyParams.pageNo}
            totalRecords={totalRecords}
            sortField={lazyParams.sortBy}
            onPage={onPage}
            onSort={onSort}
            onFilter={onFilter}
            loading={loading}
            sortOrder={lazyParams.direction}
            size="small"
            className="p-datatable-customer p-datatable-sm"
            rows={lazyParams.pageSize}
            header={header}
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectedUsers(e.value)}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[5, 10, 20, 50]}
            dataKey="id"
            responsiveLayout="scroll"
            currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} entries`}
          >
            <Column selectionMode="multiple" exportable={false}/>
            <Column
              header="User"
              field="username"
              filterMenuStyle={{width: "14rem"}}
              sortable
            />
            <Column
              field="roles"
              header="Roles"
              body={roleBodyTemplate}
              sortable
            />
            <Column field="email" header="Email" sortable/>
            <Column field="city" header="City" sortable/>
            <Column field="phone" header="Phone" sortable/>
            <Column body={actionBodyTemplate} exportable={false}/>
          </DataTable>
        </div>
      </div>
      <Dialog
        visible={deleteUserDialog}
        style={{width: "450px"}}
        header="Confirm"
        modal
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{fontSize: "2rem"}}
          />
          {user && (
            <span>
              Are you sure you want to delete <b>{user.username}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </React.Fragment>
  ) : (
    <div className="d-flex justify-content-md-center align-items-center vh-80">
      <ProgressSpinner/>
    </div>
  );
};

export default Users;
