import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'
import AllBanner from '../../Pages/Banners/AllBanner'
import AddBanner from '../../Pages/Banners/AddBanner'
import EditBanner from '../../Pages/Banners/EditBanner'
import AllShopBanner from '../../Pages/ShopBanner/AllShopBanner'
import AddShopBanner from '../../Pages/ShopBanner/AddShopBanner'
import EditShopBanner from '../../Pages/ShopBanner/EditShopBanner'
import AllTags from '../../Pages/Tags/AllTags'
import AddTag from '../../Pages/Tags/AddTag'
import EditTag from '../../Pages/Tags/EditTag'
import AllVoucher from '../../Pages/Vouchers/AllVoucher'
import CreateVoucher from '../../Pages/Vouchers/AddVoucher'
import AllOrder from '../../Pages/Orders/AllOrder'
import EditOrder from '../../Pages/Orders/EditOrder'
import AllUsers from '../../Pages/Users/AllUsers'
import EditProduct from '../../Pages/Products/EditProduct'
import AllNews from '../../Pages/News/AllNews'
import AddNews from '../../Pages/News/AddNews'
import EditNews from '../../Pages/News/EditNews'
import AllVideos from '../../Pages/Videos/Video'
import AddVideo from '../../Pages/Videos/AddVideo'
import AllContacts from '../../Pages/contacts/AllContacts'
import AllPartners from '../../Pages/Partners/AllPartners'
import AllNewsSubscribedEmail from '../../Pages/NewsLetter/AllNewsSubscribedEmail'
import MessageTemplate from '../../Pages/NewsLetter/MessageTemplete'
import Addtemplate from '../../Pages/NewsLetter/Addtemplate'
import EditTemplate from '../../Pages/NewsLetter/EditTemplate'

const Home = () => {
  return (
    <>

      <Header />
      <div className="rightside">
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard />} />

          {/* Category --  */}
          <Route path={"/all-category"} element={<AllCategory />} />
          <Route path={"/add-category"} element={<AddCategory />} />
          <Route path={"/edit-category/:id"} element={<EditCategory />} />

          {/* Product --  */}
          <Route path={"/all-products"} element={<AllProduct />} />
          <Route path={"/add-product"} element={<AddProduct />} />
          <Route path={"/edit-product/:id"} element={<EditProduct />} />

          {/* partners */}
          <Route path={"/all-partners"} element={<AllPartners />} />
          {/* Newsleterrs */}
          <Route path={"/all-newsletters"} element={<AllNewsSubscribedEmail />} />
          <Route path={"/Send-Mails"} element={<MessageTemplate />} />
          <Route path={"/add-new-template"} element={<Addtemplate />} />
          <Route path={"/edit-template/:id"} element={<EditTemplate />} />



          {/* --- Orders --- */}
          <Route path={"/all-users"} element={<AllUsers />} />

          {/* --- Vouchers --- */}
          <Route path={"/all-voucher"} element={<AllVoucher />} />   {/* // All Vouchers */}
          <Route path={"/add-voucher"} element={<CreateVoucher />} />

          {/* --- Tags --- */}
          <Route path={"/all-tags"} element={<AllTags />} />
          <Route path={"/add-tag"} element={<AddTag />} />
          <Route path={"/edit-tag/:id"} element={<EditTag />} />

          {/* --- Banners --- */}
          <Route path={"/all-banners"} element={<AllBanner />} />
          <Route path={"/add-banner"} element={<AddBanner />} />
          <Route path={"/edit-banner/:id"} element={<EditBanner />} />

          {/* --- Banners --- */}
          <Route path={"/all-shop-banners"} element={<AllShopBanner />} />
          <Route path={"/add-shop-banner"} element={<AddShopBanner />} />
          <Route path={"/edit-shop-banner/:id"} element={<EditShopBanner />} />

          {/* --- Orders --- */}
          <Route path={"/all-orders"} element={<AllOrder />} />
          <Route path={"/edit-order/:id"} element={<EditOrder />} />
          {/* --- News --- */}
          <Route path={"/all-news"} element={<AllNews />} />
          <Route path={"/add-news"} element={<AddNews />} />
          <Route path={"/edit-news/:id"} element={<EditNews />} />

          {/* --- Videos --- */}
          <Route path={"/all-Videos"} element={<AllVideos />} />
          <Route path={"/add-video"} element={<AddVideo />} />
          <Route path={"/edit-news/:id"} element={<EditNews />} />

          {/* --- Contacts --- */}
          <Route path={"/all-contact"} element={<AllContacts />} />


          {/* all-shop */}

        </Routes>
      </div>

    </>
  )
}

export default Home