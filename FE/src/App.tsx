import './App.css';
import {Route, Switch} from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import Customer from "./components/Customer/Customer";
import Navbar from "./components/Navbar/Navbar";
import {Box} from "@mui/material";
import AddCustomer from "./components/Customer/AddCustomer";
import AddEmployee from "./components/Employee/AddEmployee";
import Employee from "./components/Employee/Employee";
import PayEmployee from "./components/Employee/PayEmployee";
import Vendor from "./components/Vendor/Vendor";
import AddVendor from "./components/Vendor/AddVendor";
import Invoice from "./components/Invoice/Invoice";
import AddInvoice from "./components/Invoice/AddInvoice";
import Payroll from "./components/Payroll/Payroll";
import AddPayroll from "./components/Payroll/AddPayroll";
import PurchaseOrder from "./components/PurchaseOrder/PurchaseOrder";
import AddPurchaseOrder from "./components/PurchaseOrder/AddPurchaseOrder";
import NewPurchaseOrder from "./components/PurchaseOrder/NewPurchaseOrder";
import Settlement from "./components/Settlement/Settlement";
import BalanceSheet from "./components/BalanceSheet/BalanceSheet";
import IncomeStatement from "./components/IncomeStatement/IncomeStatement";
import Inventory from "./components/Inventory/Inventory";
import Part from "./components/Part/Part";
import AddPart from "./components/Part/AddPart";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Box mt={6}>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/customer/add" component={AddCustomer}/>
                    <Route path="/customer" component={Customer}/>

                    <Route path="/employee/add" component={AddEmployee}/>
                    <Route path="/employee/pay" component={PayEmployee}/>
                    <Route path="/employee" component={Employee}/>

                    <Route path="/vendor/add" component={AddVendor}/>
                    <Route path="/vendor" component={Vendor}/>

                    <Route path="/inventory" component={Inventory}/>

                    <Route path="/part/add" component={AddPart}/>
                    <Route path="/part" component={Part}/>

                    <Route path="/invoice/add" component={AddInvoice}/>
                    <Route path="/invoice" component={Invoice}/>

                    <Route path="/payroll/add" component={AddPayroll}/>
                    <Route path="/payroll" component={Payroll}/>

                    <Route path="/purchase-order/add/new-purchase" component={NewPurchaseOrder}/>
                    <Route path="/purchase-order/add" component={AddPurchaseOrder}/>
                    <Route path="/purchase-order" component={PurchaseOrder}/>

                    <Route path="/inventory" component={AddPurchaseOrder}/>

                    <Route path="/settlement" component={Settlement}/>

                    <Route path="/balance-sheet" component={BalanceSheet}/>
                    <Route path="/income-statement" component={IncomeStatement}/>

                </Switch>

            </Box>

        </div>
  );
}

export default App;
