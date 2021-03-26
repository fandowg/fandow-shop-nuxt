export default ({ route, redirect }) => {
  if (route.path === '/admin') { return redirect('/admin/products') }
  if (route.path === '/product-list') { return redirect('/product-list/all') }
  if (route.path === '/order') { return redirect('/order/order-info') }
}
