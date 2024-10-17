import React from "react";
import Sidebar from "../components/common/Sidebar";
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
import { Toaster } from "react-hot-toast";
import Report from "../pages/Report";
import RecurringInvoiceAdd from "../pages/Sales/RecurringInvoice/RecurringInvoiceAdd";
import RecurringInvoice from "../pages/Sales/RecurringInvoice/RecurringInvoice";
import RecurringInvoiceEdit from "../pages/Sales/RecurringInvoice/RecurringInvoiceEdit";
import Delivery from "../pages/Sales/Delivery/Delivery";
import DeliveryAdd from "../pages/Sales/Delivery/DeliveryAdd";
import DeliveryEdit from "../pages/Sales/Delivery/DeliveryEdit";
import DeliveryView from "../pages/Sales/Delivery/DeliveryView";
import SalesOrder from "../pages/Sales/SalesOrder/SalesOrder";
import SalesOrderAdd from "../pages/Sales/SalesOrder/SalesOrderAdd";
import SalesOrderEdit from "../pages/Sales/SalesOrder/SalesOrderEdit";
import CreditNotes from "../pages/Sales/CreditNotes/CreditNotes";
import CreditNotesAdd from "../pages/Sales/CreditNotes/CreditNotesAdd";
import CreditNotesEdit from "../pages/Sales/CreditNotes/CreditNotesEdit";
import CreditNotesView from "../pages/Sales/CreditNotes/CreditNotesView";
import Expenses from "../pages/Purchase/Expenses/Expenses";
import ExpensesAdd from "../pages/Purchase/Expenses/ExpensesAdd";
import ExpensesEdit from "../pages/Purchase/Expenses/ExpensesEdit";
import ExpensesView from "../pages/Purchase/Expenses/ExpensesView";
import RecurringInvoiceView from "../pages/Sales/RecurringInvoice/RecurringInvoiceView";
import SalesOrderView from "../pages/Sales/SalesOrder/SalesOrderView";
import RecurringBillAdd from "../pages/Purchase/RecurringBills/RecurringBillAdd";
import Purchase from "../pages/Purchase/PurchaseOrder/Purchase";
import PurchaseAdd from "../pages/Purchase/PurchaseOrder/PurchaseAdd";
import PurchaseEdit from "../pages/Purchase/PurchaseOrder/PurchaseEdit";
import PurchaseView from "../pages/Purchase/PurchaseOrder/PurchaseView";
import RecurringBill from "../pages/Purchase/RecurringBills/RecurringBill";
import RecurringBillEdit from "../pages/Purchase/RecurringBills/RecurringBillEdit";
import RecurringBillView from "../pages/Purchase/RecurringBills/RecurringBillView";
import PaymentReceivedAdd from "../pages/Sales/PaymentReceived/PaymentReceivedAdd";
import PaymentReceivedEdit from "../pages/Sales/PaymentReceived/PaymentReceivedEdit";

function Admin({ handleLogout }) {
  return (
    <BrowserRouter basename="/accounts">
      <Toaster />
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <Sidebar onLogout={handleLogout} />
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          <main className="py-1 bg-surface-secondary">
            <Routes >
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* {/ Bank /} */}
              <Route path="/bank" element={<Bank />} />
              <Route path="/bank/add" element={<BankAdd />} />
              <Route path="/bank/edit/:id" element={<BankEdit />} />
              <Route path="/bank/view/:id" element={<BankView />} />

              <Route path="/bank/view/expense/" element={<ExpenseAdd />} />
              <Route path="/bank/view/income/" element={<IncomeAdd />} />
              <Route
                path="/bank/view/expense/edit/:id"
                element={<ExpenseEdit />}
              />
              <Route path="/income/edit/:id" element={<IncomeEdit />} />
              <Route
                path="/bank/view/expense/view/:id"
                element={<ExpenseView />}
              />
              <Route path="/income/view/:id" element={<IncomeView />} />

              {/* Recurring Invoice*/}
              <Route
                path="/recurringinvoice/add"
                element={<RecurringInvoiceAdd />}
              />
              <Route
                path="/recurringinvoice/edit/:id"
                element={<RecurringInvoiceEdit />}
              />
              <Route
                path="/recurringinvoice/view/:id"
                element={<RecurringInvoiceView />}
              />
              <Route path="/recurringinvoice" element={<RecurringInvoice />} />

              {/* Recurring Invoice*/}
              <Route path="/recurringbill/add" element={<RecurringBillAdd />} />
              <Route path="/recurringbill" element={<RecurringBill />} />
              <Route path="/recurringbill/edit/:id" element={<RecurringBillEdit />} />
              <Route path="/recurringbill/view/:id" element={<RecurringBillView />} />


              {/* Delivery*/}
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/delivery/add" element={<DeliveryAdd />} />
              <Route path="/delivery/edit/:id" element={<DeliveryEdit />} />
              <Route path="/delivery/view/:id" element={<DeliveryView />} />

              {/* Sales Order*/}
              <Route path="/salesorder" element={<SalesOrder />} />
              <Route path="/salesorder/add" element={<SalesOrderAdd />} />
              <Route path="/salesorder/edit/:id" element={<SalesOrderEdit />} />
              <Route path="/salesorder/view/:id" element={<SalesOrderView />} />

              {/* CreditNotes */}
              <Route path="/creditNotes" element={<CreditNotes />} />
              <Route path="/creditNotes/add" element={<CreditNotesAdd />} />
              <Route
                path="/creditNotes/edit/:id"
                element={<CreditNotesEdit />}
              />
              <Route
                path="/creditNotes/view/:id"
                element={<CreditNotesView />}
              />

              {/* {/ Customer /} */}
              <Route path="/customer" element={<Customers />} />
              <Route path="/customer/add" element={<CustomerAdd />} />
              <Route path="/customer/edit/:id" element={<CustomerEdit />} />
              <Route path="/customer/view/:id" element={<CustomerView />} />
              {/* {/ Estimates /} */}
              <Route path="/estimates" element={<Estimates />} />
              <Route path="/estimates/add" element={<EstimateAdd />} />
              <Route path="/estimates/edit/:id" element={<EstimateEdit />} />
              <Route path="/estimates/view/:id" element={<EstimateView />} />

              {/* {/ Items /} */}
              <Route path="/items" element={<Items />} />
              <Route path="/items/add" element={<AddItems />} />
              <Route path="/items/edit/:id" element={<EditItems />} />
              <Route path="/items/view/:id" element={<ViewItems />} />

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
              <Route path="/bills/edit/:id" element={<BillsEdit />} />
              <Route path="/bills/view/:id" element={<BillView />} />
              <Route
                path="/bills/view/recordpaymentmade"
                element={<RecordPaymentMade />}
              />
              {/* <Route path="/bills/edit" element={<BillsEdit />} />
                <Route path="/bills/view" element={<BillsView />} />  */}

              {/* {/ vendor /} */}
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/vendor/add" element={<VendorAdd />} />
              <Route path="/vendor/edit/:id" element={<VendorEdit />} />
              <Route path="/vendor/view/:id" element={<VendorView />} />

              {/* {/ Expenses /} */}
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/add" element={<ExpensesAdd />} />
              <Route path="/expenses/edit/:id" element={<ExpensesEdit />} />
              <Route path="/expenses/view/:id" element={<ExpensesView />} />

              {/* {/ Purchase /} */}
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/purchase/add" element={<PurchaseAdd />} />
              <Route path="/purchase/edit/:id" element={<PurchaseEdit />} />
              <Route path="/purchase/view/:id" element={<PurchaseView />} />

              {/* {/ payment /} */}
              <Route path="/paymentmade" element={<Paymentmade />} />
              <Route
                path="/recordpaymentmade"
                element={<RecordPaymentMade />}
              />
              <Route path="/paymentmade/view" element={<PaymentMadeView />} />

              {/* {/ Invoice /} */}
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/invoice/add" element={<InvoiceAdd />} />
              <Route path="/invoice/edit/:id" element={<InvoiceEdit />} />
              <Route path="/invoice/view/:id" element={<InvoiceView />} />
              <Route path="/recordpayment" element={<RecordPayment />} />

              {/* {/ Payment Received /} */}
              <Route path="/paymentReceived" element={<PaymentReceived />} />
              <Route path="/paymentReceived/add" element={<PaymentReceivedAdd />} />
              <Route path="/paymentReceived/view/:id" element={<PaymentReceivedView />}/>
              <Route path="/paymentReceived/edit/:id" element={<PaymentReceivedEdit />}/>

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
