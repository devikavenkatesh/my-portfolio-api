var Blog = require('../model/blogModel');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    Blog.find({ }, function(err, blogData){
        console.log(JSON.stringify(blogData));
        if(err){
            console.log(JSON.stringify(err));
            res.json({code: 500, message: 'Something went wrong while calling blogdata'});
        }else if (blogData){
        {
            Blog.distinct("tag.name", function(err, blogCategories) {
                if(err){
                    console.log(JSON.stringify(err));
                    res.json({code: 500, message: 'Something went wrong while getting categories'});
                }else if (blogCategories){
                    res.json({code: 200, data: blogData, categories: blogCategories});
                }
            });  
        }  
    }
    });
});

router.get('/:blogAlias', function (req, res, next) {
    Blog.findOne({ alias: req.params.blogAlias}, function(err, blogData){
        console.log(JSON.stringify(blogData));

        if(err){
            console.log(JSON.stringify(err));
            res.json({code: 500, message: 'Something went wrong'});
        }else if (blogData){
        res.json({code: 200, data: blogData});
        }
    });
});
module.exports = router;