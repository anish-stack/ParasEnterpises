const express = require('express')
const { register, login, logout, passwordChangeRequest, verifyOtpAndChangePassword, addDeliveryDetails, updateDeliveryAddress, getAllUsers } = require('../controllers/Usercontroller')
const { protect } = require('../middlewares/Protect')
const router = express.Router()
const {CategoryCreate, updateCategory,deleteCategory,deleteAllCategories, getAllCategories, getCategoryById} = require('../controllers/CategoryController')
const { singleUploadImage, UploadMultipleFields } = require('../middlewares/multer')
const { CreateProduct, GetAllProduct } = require('../controllers/ProductController')
const { createBanner, getAllBanner, deleteBanner, updateBanner } = require('../controllers/BannerController')
const { CreateTag, GetTag, DeleteSingleTag, UpdateTag } = require('../controllers/TagController')
const { CreateVouncher, getAllVouncher, activateVoucher, deactivateVoucher, deleteVoucher } = require('../controllers/Vouncher.Controller')
// user actions have done in this area
router.post('/Create-User', register)
router.post('/Login', login)
router.get('/Logout', protect, logout)
router.post('/Password-Change', passwordChangeRequest)
router.post('/Verify-Otp', verifyOtpAndChangePassword)
router.post('/Add-Delivery-Address', protect, addDeliveryDetails)
router.post('/update-Delivery-Address', protect, updateDeliveryAddress)
router.get('/AllUser',getAllUsers)


//admin actions for category
router.post('/create-category',singleUploadImage,CategoryCreate)
router.put('/update-category/:id', singleUploadImage, updateCategory);
router.delete('/delete-category/:id', deleteCategory);
router.delete('/delete-all-categories', deleteAllCategories);
router.get('/get-all-categories', getAllCategories);
router.get('/get-category/:id', getCategoryById);

//admin actions for Products
router.post('/create-product',UploadMultipleFields,CreateProduct)
router.get('/getAllProduct',GetAllProduct)

// -- Main  banner --- 
router.post("/create-main-banner", singleUploadImage, createBanner);
router.get("/get-all-main-banner", getAllBanner);
router.delete('/delete-main-banner/:id', deleteBanner);
router.put('/update-main-banner/:id', singleUploadImage, updateBanner);

// -- Tags --
router.post("/createTag",CreateTag)
router.get("/getAllTag",GetTag)
router.delete("/deleteTag/:_id",DeleteSingleTag)
router.put("/updateTag/:_id",UpdateTag)

// -- Vouncher --
router.post("/createVouncher",CreateVouncher)
router.get('/getAllVouncher',getAllVouncher)
router.delete('/deleteVouncher/:_id',deleteVoucher)
router.put('/vouchers/activateVoucher/:_id', activateVoucher);
router.put('/vouchers/deactivateVoucher/:_id', deactivateVoucher);


module.exports = router