const express = require('express');
const router = express.Router();

//GET MY DB MODEL
const {ProductModel} = require('../models/productModel')


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let products= [];
    if(!id)
        return res.status(500).json({message: "Invalid request!"})
    try {
        if(id == "all"){
            products = await ProductModel.find(); 
        }else{
            products = await ProductModel.findById(id); 
        }
        res.status(200).json(products);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'SERVER ERROR' });
    }
});

router.post('/create',async(req,res)=>{
    const {name, price} = req.body;
    if(!name || !price)
        return res.status(500).json({message: "No valid information"});
    try{
        const newProduct = new ProductModel({name,price})
        const savedProduct = await newProduct.save();
        res.status(201).json({savedProduct});
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'SERVER ERROR'})
    }
    
})

router.put('/update/:id', async(req,res)=>{
    const {name, price} = req.body;
    const {id} = req.params;
    if(!name || !price || !id)
        return res.status(500).json({message: "No valid information"});
    try{
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id, 
            { name, price },
            { new: true, runValidators: true } 
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'SERVER ERROR'})
    }
})

router.delete('/delete',async(req,res)=>{
    const {deleteID} = req.body;
    if(!deleteID)
        return res.status(404).json({message: "Information missing"})
    try{
        const productDeleted = await ProductModel.deleteOne({_id:deleteID});
        res.status(200).json({productDeleted});
    }catch(e){
        console.log(e)
        res.status(500).send("Internal server error");
    }
})



module.exports = router