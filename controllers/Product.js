import { productModel } from "../models/Product.js";




export const getAllrPoducts = async(req, res)=> {
    let limit =req.query.limit || 5
    let page = req.query.page || 1
    let s = req.query.s || ""
    let reg = new RegExp(s)
    try{
        let data = await productModel.find({name:reg}.sort({name:1}).skip(((page-1)*limit)).limit(limit))
        let totalProdects = await productModel.countDocuments();
        let totalPages = Math.cell(totalProdects/limit)
        res.json({data: data,
            currentPage:page,
            totalPages: totalPages}
        )
    }
    catch (err){
        console.log(err)
        res.status(400).json({title:"cannot get all prodects",message:
            err.message
        })

    }}
    export const getById = async (req, res)=>{
        let {id} = req.params
        try{
            let data = await productModel.findById(id)
            if(!data)
                return res.status(404).json({title:"cannot find by id",message:"product with such id not found"})
            res.json(data)
        }
        catch(err){
            console.log(err)
            res.status(400).json({title:"cannot get by id",message:err.message})
        }
    }
    export const update = async (req, res) => {
        let { id } = req.params;
        let body = req.body;

    
        try {
            let data = await productModel.findByIdAndUpdate(id, body, { new: true });
            if (!data)
                return res
                    .status(404)
                    .json({ title: "Cannot update by ID", message: "Product with such ID not found" });
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ title: "Cannot update", message: err.message });
        }
    };
    
    export const deleteById = async (req, res)=>{
        let {id} = req.params
        try{
            let data = await productModel.findByIdAndDelete(id)
            if(!data)
                return res.status(404).json({title:"cannot delete by id", message:"product with such id not found"})
            res.json(data)
        }
        catch(err){
            console.log(err)
            res.status(400).json({title:"cannot delete",message:err.message})

        }
    }
    export const add  = async(req, res) =>{
        let {body} = req


        const requiredFields = ["productName", "price", "sizes", "type", "imagePath"];
        const missingFields = requiredFields.filter((field) => !body[field]);
    
        if (missingFields.length > 0) {
            return res.status(400).json({
                title: "Validation Error",
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }
    
        if (typeof body.price !== "number" || body.price <= 0) {
            return res.status(400).json({
                title: "Validation Error",
                message: "'price' must be a positive number",
            });
        }
        if (isNaN(Date.parse(body.DateOfManufacture))) {
            return res.status(400).json({
                title: "Validation Error",
                message: "'DateOfManufacture' must be a valid date",
            });
        }
  
        try{
            let newProduct = new productModel(body)
            let data = await newProduct.save()
            res.json(data)
        }
        catch(err){
            console.log(err)
            return res.status(400).json({title:"cannot add",message:err.message})
        }
    }