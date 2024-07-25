const express = require('express')
const { register, login, logout, passwordChangeRequest, verifyOtpAndChangePassword, addDeliveryDetails, updateDeliveryAddress, getAllUsers, userDetails, GetDeliveryAddressOfUser } = require('../controllers/Usercontroller')
const { protect } = require('../middlewares/Protect')
const router = express.Router()
const { CategoryCreate, updateCategory, deleteCategory, deleteAllCategories, getAllCategories, getCategoryById } = require('../controllers/CategoryController')
const { singleUploadImage, UploadMultipleFields } = require('../middlewares/multer')
const { CreateProduct, GetAllProduct, singleProduct, GetOnlyLatestProduct, UpdateProductWithImage, ChangeLatestProductStatusChange, deleteProduct, getProductsByCategory } = require('../controllers/ProductController')
const { createBanner, getAllBanner, deleteBanner, updateBanner } = require('../controllers/BannerController')
const { CreateTag, GetTag, DeleteSingleTag, UpdateTag } = require('../controllers/TagController')
const { CreateVouncher, getAllVouncher, activateVoucher, deactivateVoucher, deleteVoucher } = require('../controllers/Vouncher.Controller')
const { createNews, DeleteNews, getAllNews, getSingleNews, UpdateNews } = require('../controllers/NewsController')
const { createVideo, getAllVideos, updateVideo, deleteVideo } = require('../controllers/VideoControllers')
const { createContact, GetContact, DeleteContact, PushAdminMessageContact } = require('../controllers/ContactController')
const { CheckOut, paymentVerification, OrderByOrderId } = require('../controllers/OrderController')
// user actions have done in this area
router.post('/Create-User', register)
router.post('/Login', login)
router.get('/Logout', protect, logout)
router.post('/Password-Change', passwordChangeRequest)
router.post('/Verify-Otp', verifyOtpAndChangePassword)
router.post('/Add-Delivery-Address', protect, addDeliveryDetails)
router.get('/user-details', protect, userDetails)
router.get('/get-Delivery-Address', protect, GetDeliveryAddressOfUser)
router.post('/update-Delivery-Address', protect, updateDeliveryAddress)
router.get('/AllUser', getAllUsers)


//admin actions for category
router.post('/create-category', singleUploadImage, CategoryCreate)
router.put('/update-category/:id', singleUploadImage, updateCategory);
router.delete('/delete-category/:id', deleteCategory);
router.delete('/delete-all-categories', deleteAllCategories);
router.get('/get-all-categories', getAllCategories);
router.get('/get-category/:id', getCategoryById);


//admin actions for Videos
router.post('/Create-Video', createVideo)
router.get('/get-all-video', getAllVideos)
router.delete('/delete-Video/:id', deleteVideo)
router.post('/update-Video/:id', updateVideo)


//admin actions for Products
router.post('/create-product', UploadMultipleFields, CreateProduct)
router.get('/get-all-product', GetAllProduct)
router.get('/get-single-product/:id', singleProduct)
router.get('/get-only-latest-product', GetOnlyLatestProduct);
router.get('/get-product-by-categories/:Name', getProductsByCategory);

router.put('/update-product/:id', UploadMultipleFields, UpdateProductWithImage)
router.patch('/change-latest-product-status/:id', ChangeLatestProductStatusChange);
router.delete('/delete-product/:id', deleteProduct);

// -- Main  banner --- 
router.post("/create-main-banner", singleUploadImage, createBanner);
router.get("/get-all-main-banner", getAllBanner);
router.delete('/delete-main-banner/:id', deleteBanner);
router.put('/update-main-banner/:id', singleUploadImage, updateBanner);

// -- News Controllers ---
router.post('/create-news', createNews);
router.delete('/delete-news/:id', DeleteNews);
router.get('/get-all-news', getAllNews);
router.get('/get-single-news/:id', getSingleNews);
router.put('/update-news/:id', UpdateNews);
// -- Contact Controllers ---
router.post('/create-contact', createContact);
router.get('/get-contact', GetContact);
router.delete('/delete-contact/:id', DeleteContact);
router.post('/push-Message/:id', PushAdminMessageContact);

// -- Orders --
router.post('/Checkout',protect,CheckOut)
router.post('/Payment-Verification',paymentVerification)
router.get('/Order-Information/:orderId',OrderByOrderId)







// -- Tags --
router.post("/createTag", CreateTag)
router.get("/getAllTag", GetTag)
router.delete("/deleteTag/:_id", DeleteSingleTag)
router.put("/updateTag/:_id", UpdateTag)

// -- Vouncher --
router.post("/createVouncher", CreateVouncher)
router.get('/getAllVouncher', getAllVouncher)
router.delete('/deleteVouncher/:_id', deleteVoucher)
router.put('/vouchers/activateVoucher/:_id', activateVoucher);
router.put('/vouchers/deactivateVoucher/:_id', deactivateVoucher);


module.exports = router