import { Route, Routes } from "react-router-dom";
import BaseLayoutUsers from "../layout/users/BaseLayoutUsers";
import HomePage from "../website/users/homePage";
import BaseLayoutAdmin from "../layout/admin/BaseLayoutAdmin";
import DashboardPayments from "../dashboard/payments/DashboardPayments";
import UpdatePayments from "../dashboard/payments/UpdatePayments";
import CreatePayments from "../dashboard/payments/CreatePayments";

import CustomerAdd from "../layout/admin/Categories/CustomerAdd";
import CustomerList from "../layout/admin/Categories/CustomerList";
import CustomerEdit from "../layout/admin/Categories/CustomerEdit";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayoutUsers />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="admin" element={<BaseLayoutAdmin />}>
          <Route index element={<DashboardPayments />} />
          <Route path="customer/add" element={<CustomerAdd />} />
          <Route path="customer" element={<CustomerList />} />
          <Route path="customer/edit/:id" element={<CustomerEdit />} />
          <Route path="update-movies/" element={<UpdatePayments />} />
          <Route path="create-movie" element={<CreatePayments />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
