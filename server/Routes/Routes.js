const express = require('express')
const { register, login, logout, passwordChangeRequest, verifyOtpAndChangePassword, addDeliveryDetails, updateDeliveryAddress } = require('../controllers/Usercontroller')
const { protect } = require('../middlewares/Protect')
const router = express.Router()
const {CategoryCreate, updateCategory,deleteCategory,deleteAllCategories, getAllCategories} = require('../controllers/CategoryController')
const { singleUploadImage, UploadMultipleFields } = require('../middlewares/multer')
const { CreateProduct } = require('../controllers/ProductController')
// user actions have done in this area
router.post('/Create-User', register)
router.post('/Login', login)
router.get('/Logout', protect, logout)
router.post('/Password-Change', passwordChangeRequest)
router.post('/Verify-Otp', verifyOtpAndChangePassword)
router.post('/Add-Delivery-Address', protect, addDeliveryDetails)
router.post('/update-Delivery-Address', protect, updateDeliveryAddress)


//admin actions for category
router.post('/create-category',singleUploadImage,CategoryCreate)
router.put('/update-category/:id', singleUploadImage, updateCategory);
router.delete('/delete-category/:id', deleteCategory);
router.delete('/delete-all-categories', deleteAllCategories);
router.get('/get-all-categories', getAllCategories);

//admin actions for Products
router.post('/create-product',UploadMultipleFields,CreateProduct)




module.exports = router