import React, { Component } from 'react'
import axios from 'axios'


export default class InvoiceList extends Component {

    state = {

        invoices : [],
        array_ids : []

    }

    
    componentDidMount() {

        this.getInvoices();

    }


    getInvoices = async () => {

        const res = await axios.get('http://localhost:4000/Invoices');
        this.setState({
            invoices : res.data !== "Not result" ? res.data : []
        });

    }


    approveInvoiceEvent = () => {

        const array_ids = [];
        const checkList = document.getElementsByClassName('checkClassName');
        Array.prototype.forEach.call(checkList, function(element) {
            if(element.checked){
                array_ids.push(element.id);
            }
        });

        const idsObj = {
            ids : array_ids
        }

        axios.post("http://localhost:4000/Invoice/update", idsObj)
            .then(data => {
                this.getInvoices();
                alert("Invoice(s) approved successfully!");
            })
            .catch(err => alert(err));
    };


    render() {        
        return (
            <>
            <button
                className="btn btn-success btn-sm m-2"
                onClick={() => {
                this.approveInvoiceEvent();
                }}
            >
                Approve Invoice
            </button>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>Invoice number</th>
                        <th>Total</th>
                        <th>Currency</th>
                        <th>Invoice date</th>
                        <th>Due date</th>
                        <th>Vendor name</th>
                        <th>Remittance address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.invoices.length > 0 ? 
                    this.state.invoices.map((item, index)  => (
                        <tr key={item.id}>
                            <td>
                                <input className="checkClassName" type="checkbox" id={item.id} ></input>
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.invoice_number}</td>
                            <td>{item.total}</td>
                            <td>{item.currency}</td>
                            <td>{item.invoice_date.substring(0,10)}</td>
                            <td>{item.due_date.substring(0,10)}</td>
                            <td>{item.vendor_name}</td>
                            <td>{item.remittance_address}</td>
                            <td><strong>{item.status}</strong></td>
                            
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={10}>   You don't have any pending invoices yet.</td>
                        </tr>
                    )
                }                 
                </tbody>
            </table>
        </>
        )
    }
}
