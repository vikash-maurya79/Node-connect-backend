export const homeController = (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Home route is working"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "somthing is broken in catch"
        })
    }
}