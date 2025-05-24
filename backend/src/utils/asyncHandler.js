const asyncHandler = (requestHandler)=> async (req,res,next) => {
    try {
       await  requestHandler(req,res,next);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success : false,
            message : err.message,
            errors : err.errors
        });

    }
}

export {asyncHandler}