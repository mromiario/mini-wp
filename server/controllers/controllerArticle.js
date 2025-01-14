Article = require('../models/Article')
class ControllerArticle{
    static create(req,res,next){
        const{title,content,image} = req.body
        console.log(req.body);
        Article.create({
            title,
            content,
            image,
            user : req.decoded._id
        })
        .then(data=>res.status(201).json(data)
        )
        .catch(err=>{
            next(err)
        }) 
    }

    static findAll(req,res,next){
        Article.find({user: req.decoded._id})
        .sort({created_at : -1})
        .then(data=> res.json(data))
        .catch(err=>next(err))
    }

    static allPosts(req,res,next){
        Article.find()
        .sort({created_at : -1})
        .limit(5)
        .populate('user')
        .then(data=> res.json(data))
        .catch(err=>next(err))
    }


    static allPostsNoFilter(req,res,next){
        Article.find()
        .sort({created_at : -1})
        .populate('user')
        .then(data=> res.json(data))
        .catch(err=>next(err))
    }

    static delete(req,res,next){
        Article.deleteOne({_id:req.params.id})
        .then(()=> res.json({message:"data is deleted"}))
        .catch(err=>next(err))
    }

    static findOne(req,res,next){
        Article.findOne({_id:req.params.id})
        .populate('user')
        .then((data)=> res.json(data))
        .catch(err=>next(err))
    }

    static update(req,res,next){
        let obj = {}
        const {content,title} = req.body
        if(content) obj.content = content
        if(title) obj.title = title
        Article.update({_id:req.params.id},obj)
        .then((data)=>res.json({message:"data is updated",data}))
        .catch(err=>next(err))
    }

    static upload(req,res,next){
       res.json({file:req.file})
       console.log(req.file);


    }



}

module.exports = ControllerArticle