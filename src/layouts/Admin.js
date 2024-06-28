import React from "react";
import Sidebar from "../components/common/Sidebar";
import Home from "../pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Footer from "../components/common/Footer";

import Bank from "../pages/Banking/Bank";
import BankAdd from "../pages/Banking/BankAdd";
import BankEdit from "../pages/Banking/BankEdit";
import BankView from "../pages/Banking/BankView";
import ExpenseAdd from "../pages/Banking/ExpenseAdd";
import IncomeAdd from "../pages/Banking/IncomeAdd";
import ExpenseEdit from "../pages/Banking/ExpenseEdit";
import IncomeEdit from "../pages/Banking/IncomeEdit";
import ExpenseView from "../pages/Banking/ExpenseView";
import IncomeView from "../pages/Banking/IncomeView";

import Customers from "../pages/Sales/Customers/Customer";
import CustomerAdd from "../pages/Sales/Customers/CustomerAdd";
import CustomerEdit from "../pages/Sales/Customers/CustomerEdit";
import CustomerView from "../pages/Sales/Customers/CustomerView";

import Estimates from "../pages/Sales/Estimates/Estimates";
import EstimateAdd from "../pages/Sales/Estimates/EstimateAdd";
import EstimateEdit from "../pages/Sales/Estimates/EstimateEdit";
import EstimateView from "../pages/Sales/Estimates/EstimateView";

import Items from "../pages/Items/Items";
import AddItems from "../pages/Items/AddItems";
import EditItems from "../pages/Items/EditItems";
import ViewItems from "../pages/Items/ViewItems";
import ChartOfAccount from "../pages/ChartOfAccount/ChartOfAccount";
import ChartofAccountAdd from "../pages/ChartOfAccount/ChartofAccountAdd";
import ChartOfAccountEdit from "../pages/ChartOfAccount/ChartOfAccountEdit";
import ChartOfAccountView from "../pages/ChartOfAccount/ChartOfAccountView";

import Bills from "../pages/Purchase/Bills/Bill";
import Vendor from "../pages/Purchase/Vendors/Vendor";
import Paymentmade from "../pages/Purchase/Paymentmade/Paymentmade";
import BillsAdd from "../pages/Purchase/Bills/BillAdd";
import VendorAdd from "../pages/Purchase/Vendors/VendorAdd";
import VendorEdit from "../pages/Purchase/Vendors/VendorEdit";
import VendorView from "../pages/Purchase/Vendors/VendorView";
import BillsEdit from "../pages/Purchase/Bills/BillEdit";
import BillView from "../pages/Purchase/Bills/BillView";
import RecordPaymentMade from "../pages/Purchase/Paymentmade/RecordPaymentMade";
import PaymentMadeView from "../pages/Purchase/Paymentmade/PaymentMadeView";

import Users from "../pages/Users/Users";
import UsersAdd from "../pages/Users/UsersAdd";
import UsersEdit from "../pages/Users/UsersEdit";
import UsersView from "../pages/Users/UsersView";

import Department from "../pages/Department/Department";
import DepartmentAdd from "../pages/Department/DepartmentAdd";
import DepartmentEdit from "../pages/Department/DepartmentEdit";
import Invoice from "../pages/Sales/Invoice/Invoice";
import InvoiceAdd from "../pages/Sales/Invoice/InvoiceAdd";
import InvoiceEdit from "../pages/Sales/Invoice/InvoiceEdit";
import InvoiceView from "../pages/Sales/Invoice/InvoiceView";
import RecordPayment from "../pages/Sales/Invoice/RecordPayment";
import PaymentReceived from "../pages/Sales/PaymentReceived/PaymentReceived";
import PaymentReceivedView from "../pages/Sales/PaymentReceived/PaymentReceivedView";

import Report from "../pages/Report";

function Admin({ handleLogout }) {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <Sidebar onLogout={handleLogout} />
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          <main className="py-1 bg-surface-secondary">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* {/ Bank /} */}
              <Route path="/bank" element={<Bank />} />
              <Route path="/bank/add" element={<BankAdd />} />
              <Route path="/bank/edit" element={<BankEdit />} />
              <Route path="/bank/view" element={<BankView />} />

              <Route path="/bank/view/expense" element={<ExpenseAdd />} />
              <Route path="/bank/view/income" element={<IncomeAdd />} />
              <Route path="/bank/view/expense/edit" element={<ExpenseEdit />} />
              <Route path="/income/edit" element={<IncomeEdit />} />
              <Route path="/bank/view/expense/view" element={<ExpenseView />} />
              <Route path="/income/view" element={<IncomeView />} />

              {/* {/ Sales /} */}
              {/* {/ Customer /} */}
              <Route path="/customer" element={<Customers />} />
              <Route path="/customer/add" element={<CustomerAdd />} />
              <Route path="/customer/edit" element={<CustomerEdit />} />
              <Route path="/customer/view" element={<CustomerView />} />
              {/* {/ Estimates /} */}
              <Route path="/estimates" element={<Estimates />} />
              <Route path="/estimates/add" element={<EstimateAdd />} />
              <Route path="/estimates/edit" element={<EstimateEdit />} />
              <Route path="/estimates/view" element={<EstimateView />} />

              {/* {/ Items /} */}
              <Route path="/items" element={<Items />} />
              <Route path="/items/add" element={<AddItems />} />
              <Route path="/items/edit/id" element={<EditItems />} />
              <Route path="/items/view/id" element={<ViewItems />} />

              {/* {/ ChatOfAccount /} */}
              <Route path="/chartofaccount" element={<ChartOfAccount />} />
              <Route
                path="/chartofaccount/chartofaccountadd"
                element={<ChartofAccountAdd />}
              />
              <Route
                path="/chartofaccount/chartofaccountedit"
                element={<ChartOfAccountEdit />}
              />
              <Route
                path="/chartofaccount/chartofaccountview"
                element={<ChartOfAccountView />}
              />

              {/* Bills */}
              <Route path="/bills" element={<Bills />} />
              <Route path="/bills/add" element={<BillsAdd />} />
              <Route path="/bills/edit" element={<BillsEdit />} />
              <Route path="/bills/view" element={<BillView />} />
              <Route path="/bills/view/recordpaymentmade" element={<RecordPaymentMade />} />
              {/* <Route path="/bills/edit" element={<BillsEdit />} />
                <Route path="/bills/view" element={<BillsView />} />  */}

              {/* {/ vendor /} */}
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/vendor/add" element={<VendorAdd />} />
              <Route path="/vendor/edit" element={<VendorEdit />} />
              <Route path="/vendor/view" element={<VendorView />} />

              {/* {/ payment /} */}
              <Route path="/paymentmade" element={<Paymentmade />} />
              <Route
                path="/recordpaymentmade"
                element={<RecordPaymentMade />}
              />
              <Route path="/paymentmade/view" element={<PaymentMadeView />} />

              {/* {/ Invoice /} */}
              <Route path="/invoice" element={<Invoice/>}/>
              <Route path="/invoice/add" element={<InvoiceAdd/>}/>
              <Route path="/invoice/edit" element={<InvoiceEdit/>}/>
              <Route path="/invoice/view" element={<InvoiceView/>}/>
              <Route path="/recordpayment" element={<RecordPayment/>}/>

              {/* {/ Payment Received /} */}
              <Route path="/paymentReceived" element={<PaymentReceived/>}/>
              <Route path="/paymentReceived/view" element={<PaymentReceivedView/>}/>

              {/* {/ Department /} */}
              <Route path="/department" element={<Department />} />
              <Route path="/department/add" element={<DepartmentAdd />} />
              <Route path="/department/edit" element={<DepartmentEdit />} />

              {/* Users */}
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<UsersAdd />} />
              <Route path="/users/edit" element={<UsersEdit />} />
              <Route path="/users/view" element={<UsersView />} />

              <Route path="/report" element={<Report />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Admin;
