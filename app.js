const express=require("express");
const app=express();
const fs=require('fs');
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.use(express.json());
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tours
        }
    });


});
app.post('/api/v1/tours',(req,res)=>{
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),
        err=>{
            res.status(201).json({
                status:'success',
                data:{
                    tour:newTour
                }
            })
        }
    )
    // const name1=req.name;
    // res.send("done");
    // res.status(200).json({

    //     "name":name1
    // }
    // );

});



app.listen(3000);