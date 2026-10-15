
export class WishlistPage {
    constructor(page) {
        this.page = page;

        this.productName = page.getByRole('link', {
            name: 'Build Your Own Computer',
            exact: true
        });

        this.wishlistItems = page.locator(
            '.wishlist-content .cart-item'
        );
    }

    async openWishlist() {
        await this.page.goto('/wishlist');
    }
}
