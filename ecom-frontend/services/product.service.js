import { storageService } from '../../services/storage.service';

export const productService = {
    updateCart,
};

function updateCart(product) {
    const cart = storageService.load('cart');
    const updatedCart = cart.push(product);
    storageService.store('cart', updatedCart);
    return updatedCart;
}
