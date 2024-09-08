const express = require('express');
const router = express.Router();

//GET MY MODEL
const {CarModel} = require('../models/carModel'); //remain destructuring for get an object

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let cars= [];
    if(!id)
        return res.status(500).json({message: "Invalid request!"})
    try {
        if(id == "all"){
            cars = await CarModel.find(); 
        }else{
            cars = await CarModel.findById(id); 
        }
        res.status(200).json(cars);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'SERVER ERROR' });
    }
});

router.post('/create',async(req,res)=>{
    const {brand,kilometers,model,year,price} = req.body;
    if(!brand || !kilometers || !model || !year || !price)
        return res.status(500).json({message: "Information Invalid"});
    try{
        const newCar = new CarModel({brand,kilometers,model,year,price})
        const savedCar = await newCar.save();
        res.status(201).json({savedCar});
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'SERVER ERROR'})
    }
    
})

router.put('/update/:id', async(req,res)=>{
    const {brand,kilometers,model,year,price} = req.body;
    const {id} = req.params;
    if(!brand || !kilometers || !model || !year || !price)
        return res.status(500).json({message: "Information Invalid"});
    try{
        const updatedCar = await CarModel.findByIdAndUpdate(
            id, 
            {brand,kilometers,model,year,price},
            { new: true, runValidators: true } 
        );
        if (!updatedCar) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedCar);
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
        const carDeleted = await CarModel.deleteOne({_id:deleteID});
        res.status(200).json({carDeleted});
    }catch(e){
        console.log(e)
        res.status(500).send("Internal server error");
    }
})

module.exports = router