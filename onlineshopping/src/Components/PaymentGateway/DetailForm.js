import {Component} from "react";
import React from 'react'
import PropTypes from 'prop-types';
import ProductItem from "./ProductItem";
import SimpleNavigationBar from "../Common/SimpleNavigationBar/SimpleNavigationBar";
import ComplexNavigationNoDrawer from "../Common/ComplexNavigationNoDrawer/ComplexNavigationNoDrawer";

class DetailForm extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        loadCart: PropTypes.func.isRequired,
        updateCart: PropTypes.func.isRequired,
        cartProducts: PropTypes.array.isRequired,
        newProduct: PropTypes.object,
        removeProduct: PropTypes.func,
        productToRemove: PropTypes.object,
        changeProductQuantity: PropTypes.func,
        productToChange: PropTypes.object,
    };

    state = {
        isOpen: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.newProduct !== this.props.newProduct) {
            this.addProduct(nextProps.newProduct);
        }

        if (nextProps.productToRemove !== this.props.productToRemove) {
            this.removeProduct(nextProps.productToRemove);
        }

        if (nextProps.productToChange !== this.props.productToChange) {
            this.changeProductQuantity(nextProps.productToChange);
        }
    }

    openFloatCart = () => {
        this.setState({ isOpen: true });
    };

    closeFloatCart = () => {
        this.setState({ isOpen: false });
    };

    addProduct = product => {
        const { cartProducts, updateCart } = this.props;
        let productAlreadyInCart = false;

        cartProducts.forEach(cp => {
            if (cp.id === product.id) {
                cp.quantity += product.quantity;
                productAlreadyInCart = true;
            }
        });

        if (!productAlreadyInCart) {
            cartProducts.push(product);
        }

        updateCart(cartProducts);
        this.openFloatCart();
    };

    removeProduct = product => {
        const { cartProducts, updateCart } = this.props;

        const index = cartProducts.findIndex(p => p.id === product.id);
        if (index >= 0) {
            cartProducts.splice(index, 1);
            updateCart(cartProducts);
        }
    };

    proceedToCheckout = () => {
        const {
            totalPrice,
            productQuantity,
            currencyFormat,
            currencyId
        } = this.props.cartTotal;
    };

    changeProductQuantity = changedProduct => {
        const { cartProducts, updateCart } = this.props;

        const product = cartProducts.find(p => p.id === changedProduct.id);
        product.quantity = changedProduct.quantity;
        if (product.quantity <= 0) {
            this.removeProduct(product);
        }
        updateCart(cartProducts);
    }

    render() {
        return(<div>

            <ComplexNavigationNoDrawer dispatch={this.props.dispatch} userobject={this.props.userobject}/>

        </div>);
        // const { cartTotal, cartProducts, removeProduct, changeProductQuantity } = this.props;
        //
        // const products = cartProducts.map(p => {
        //     return (
        //         <ProductItem product={p} removeProduct={removeProduct} changeProductQuantity={changeProductQuantity} key={p.id} />
        //     );
        // });
        //
        // let classes = ['float-cart'];
        //
        // if (!!this.state.isOpen) {
        //     classes.push('float-cart--open');
        // }
        //
        // return (
        //     <div className={classes.join(' ')}>
        //         {/* If cart open, show close (x) button */}
        //         {this.state.isOpen && (
        //             <div
        //                 onClick={() => this.closeFloatCart()}
        //                 className="float-cart__close-btn"
        //             >
        //                 X
        //             </div>
        //         )}
        //
        //         {/* If cart is closed, show bag with quantity of product and open cart action */}
        //         {!this.state.isOpen && (
        //             <span
        //                 onClick={() => this.openFloatCart()}
        //                 className="bag bag--float-cart-closed"
        //             >
        //     <span className="bag__quantity">{cartTotal.productQuantity}</span>
        //   </span>
        //         )}
        //
        //         <div className="float-cart__content">
        //             <div className="float-cart__header">
        //     <span className="bag">
        //       <span className="bag__quantity">{cartTotal.productQuantity}</span>
        //     </span>
        //                 <span className="header-title">Cart</span>
        //             </div>
        //
        //             <div className="float-cart__shelf-container">
        //                 {products}
        //                 {!products.length && (
        //                     <p className="shelf-empty">
        //                         Add some products in the cart <br />
        //                         :)
        //                     </p>
        //                 )}
        //             </div>
        //
        //             <div className="float-cart__footer">
        //                 <div className="sub">SUBTOTAL</div>
        //                 <div className="sub-price">
        //                     <p className="sub-price__val">
        //                         LKR {this.props.product.pprice}
        //                     </p>
        //                 </div>
        //                 <div onClick={() => this.proceedToCheckout()} className="buy-btn">
        //                     Checkout
        //                 </div>
        //             </div>
        //         </div>
        //     </div>


    }
}

export default DetailForm;