const Vouncher = require('../models/Vouncher.model')

exports.CreateVouncher = async (req,res) => {
    try {
        const {CouponCode , descountpercent , isActive} = req.body
        if(!CouponCode || !descountpercent || !isActive){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const vouncher = await Vouncher.create({
            CouponCode , descountpercent , isActive
        })

        return res.status(200).json({
            success: true,
            message: "Vouncher created successfully",
            data: vouncher
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.getAllVouncher = async (req,res) => {
    try {
        const vouncher = await Vouncher.find()
        if(!vouncher){
            return res.status(400).json({
                success: false,
                message: "No vouncher found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Vouncher found successfully",
            data: vouncher
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.activateVoucher = async (req, res) => {
    try {
        const { id } = req.params;
        await Vouncher.findByIdAndUpdate(id, { isActive: true });
        return res.status(200).json({
            status: true,
            message: "Voucher activated successfully",
        });
    } catch (error) {
        console.error("Error activating voucher:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

exports.deactivateVoucher = async (req, res) => {
    try {
        const { id } = req.params;
        await Vouncher.findByIdAndUpdate(id, { isActive: false });
        return res.status(200).json({
            status: true,
            message: "Voucher deactivated successfully",
        });
    } catch (error) {
        console.error("Error deactivating voucher:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

exports.deleteVoucher = async (req, res) => {
    try {
        const { id } = req.params;
        await Vouncher.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "Voucher deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting voucher:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};