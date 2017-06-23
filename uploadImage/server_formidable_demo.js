var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

    http.createServer(function(req , res){
        if(req.url == '/upload' && req.method.toLowerCase() == 'post'){
            var form = new formidable.IncomingForm();
            form.parse(req, function(err , fields ,files){
                res.writeHead(200 , {'content-type' : 'text/plain'});
                res.write('received upload: \n\n');
                //util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
                res.end(util.inspect({fields : fields , files : files}));
            });
            return;
        }

        res.writeHead(200 , {'content-type' : 'text/html'});
        res.end( 
            '<form action = "/upload" enctype = "multipart/form-data" ' +
            'method="post">'+
            '<input type="text" name="title"><br>'+
             '<input type="file" name="upload" multiple="multiple"><br>'+
             '<input type="submit" value="Upload">'+
             '</form>'
        );
    }).listen(8888);

