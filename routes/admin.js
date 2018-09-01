var Project = require('../models/projectModel');

/* GET all projects listing. */
router.get('/projects', function(req, res, next) {
  Project.find({}, function(err, projects){
    console.log(JSON.stringify(projects));

    if(err){
        console.log(JSON.stringify(err));
        res.json({code: 500, message: 'Something went wrong'});
    }else if (projects){
      res.json({code: 200, data: projects});
    }
  });
});
/*
router.get('/projects/create', function (req, res, next) {
  res.render('admin/project-create', { 
    layout: 'layout-admin', 
    title: 'Projects Admin',
    navProjects: true
  });
});

router.post('/projects/create', function (req, res, next) {
  var projectModel = new Project();
  projectModel.name = req.body.name;
  projectModel.alias = req.body.alias;
  projectModel.githubUrl = req.body.githubUrl;  
  projectModel.image = "/projects/number-guessing-game/images/number-guessing-game.png";
  projectModel.tags = req.body.tags;
  projectModel.description = req.body.description;
  projectModel.createAt = new Date();
  projectModel.save(function(err, savedProject){
    console.log(JSON.stringify(savedProject));
    if(err) 
      res.send(err);    
    res.redirect('/admin/projects');
  });
});

router.get('/media', function (req, res) {
  res.render('admin/upload', { 
    layout: 'layout-admin', 
    title: 'Image Upload',
    navProjects: true
  });
});

router.post('/media', function (req, res) {
  upload(req, res, function (err) {
    console.log(err);

    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

router.get('/projects/:projectAlias', function (req, res, next) {
    function projectDetails(error, data){
      res.render('admin/project-detail', { 
        layout: 'layout-admin', 
        title: data[0].name,
        navProjects: true,
        project: data[0]
      });
    }
    getProject(req.params.projectAlias, projectDetails);
  });

router.get('/blog', function (req, res, next) {
  res.render('admin/blog', { 
    layout: 'layout-admin', 
    title: 'Blog Admin',
    navBlog: true,
    blogs: getBlog()  
  });
});
*/
module.exports = router;