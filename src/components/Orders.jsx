/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import OrderService from '../services/orderService';
import CartService from '../services/cart';
import UserService from '../services/userService';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { Button } from '@material-ui/core';
import TablePaginationActions from '../components/Pagination';
import Paper from '@material-ui/core/Paper';
import generatePDF from '../services/pdfGeneratorService';

class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            page: 0,
            rowsPerPage: 5
        };
        this.setOrders = this.setOrders.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('total_per_item') && localStorage.getItem('email') && localStorage.getItem('total')) {
            const total_per_item = JSON.parse(localStorage.getItem('total_per_item'));
            OrderService.addItems(localStorage.getItem('email'), total_per_item, localStorage.getItem('total')).then(res => {
                localStorage.removeItem('total_per_item');
                localStorage.removeItem('total');
                alert("Your order has been placed successfully");
                CartService.emptyCart(localStorage.getItem('email')).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(res);
                })
                this.setOrders();
            }).catch(err => {
                console.log(err);
                localStorage.removeItem('total_per_item');
                localStorage.removeItem('total');
                UserService.logout();
                this.props.history.push("/login");
            });
        }
        else {
            this.setOrders();
        }
    }

    async setOrders() {
        await OrderService.getItems(localStorage.getItem('email')).then(res => {
            console.log(res.data.message);
            if (res.data.message.length > 0) {
                this.setState({ orders: res.data.message[0].details.reverse() });
            }
            console.log(this.state.orders);
        }).catch(err => {
            UserService.logout();
            this.props.history.push("/login");
            console.log(err);
        });
    }

    render() {
        const classes = makeStyles({
            table: {
                minWidth: 500,
            },
        });

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.orders.length - this.state.page * this.state.rowsPerPage);

        const handleChangePage = (event, newPage) => {
            this.setState({ page: newPage })
        };

        const handleChangeRowsPerPage = (event) => {
            this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
            this.setState({ page: 0 })
        };


        return (
            <div>
                <div className="loginBlock">
                    <h3>YOUR ORDERS</h3>
                </div>
                <div className="appleBonsai">
                    <TableContainer component={Paper}>
                        {this.state.orders.length < 1 ? <h2 style={{ color: "red" }}>Your have made no orders yet</h2> :
                            <Table className={classes.table} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sr. No.</TableCell>
                                        <TableCell align="center">Ordered On</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(this.state.rowsPerPage > 0
                                        ? this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                        : this.state.orders
                                    ).map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th">
                                                {index + 1 + this.state.page * this.state.rowsPerPage}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.orderedOn}
                                            </TableCell>
                                            <TableCell align="center">
                                                ${row.total}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" style={{ backgroundColor: "#8BC34A" }} onClick={() => { generatePDF(this.state.orders[index]) }}>View Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={this.state.orders.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'rows per page' },
                                                native: true,
                                            }}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        }
                    </TableContainer>
                </div>
            </div >
        );
    }
}

export default Orders;