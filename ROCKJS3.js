function _(item,fir) {
	if (window === this){return new _(item,fir);}
	this.obj = {
		typo:null,
		localName:null,
		nodeName:null,
		tagName:null,
		contador:null
	};
	if (typeof item === "object")
	{

		this.obj.selector = item;
		this.obj.len = 1;
		this[0] = this.obj.selector;		
	}
	else
	{	
		var regex_class = /^\.[A-Za-z\d]{1,15}$/;
		var regex_id = /^\#[A-Za-z\d]{1,15}$/;
		if (item.match(regex_class) || item.match(regex_id))
		{			
			var d = document.querySelectorAll(item);
			if(fir == "first")
			{
				this.obj.selector = d[0];
				this.obj.len = 1;
				this[0] = this.obj.selector;
				this.context = document;
				this.selector = item;

			}
			else if (fir == "last")
			{					
				var total = d.length -1;
				this.obj.selector = d[total];
				this.obj.len = 1;
				this[0] = this.obj.selector;
				this.context = document;
				this.selector = item;
			}
			else
			{
				this.obj.selector = d;
				this.obj.len = this.obj.selector.length;
				for (var i = 0; i < this.obj.len; i++) {		
					this[i] = this.obj.selector[i];
				};
			}			
		}
		else
		{
			var nuevo = document.createTextNode(item);			
			//var nuevo = document.createElement("table"); 
			//console.log("es string");
			//console.log(item);
			this[0] = nuevo;
			//var d = document.createElement(item);
			//console.log(d);	
		}
	}
}

_.fn = _.prototype = 
{
	size:function()
	{
		console.log(this);
	},
	addEvent:function(event,callback)
	{	
		var len = this.obj.len;
		while(len--){
			this[len].addEventListener(event,callback,false);			
		}
		return this;
	},
	hide:function(callback)
	{	
		var len = this.obj.len;
		while(len--){this[len].style.display = "none";}
		callback;
		return this;
	},
	show:function(callback)
	{	
		var len = this.obj.len;
		while(len--){this[len].style.display = "block";}
		callback;
		return this;
	},
	toggle:function()
	{	var len = this.obj.len;
		while(len--)
		{	if(this[len].style.display == "none"){this[len].style.display = "block";}
			else{this[len].style.display = "none";}			
		}
		return this;
	},
	on:function(event,callback)
	{
		this.addEvent(event,callback);
		return this;
	},	
	html:function(escribir)
	{	
		var len = this.obj.len;
		if(escribir)
		{	
			while(len--)
			{
				this[len].innerHTML = escribir;
				//this[len].value = escribir;
			}
		}
		else
		{
			while(len--)
			{
				this[len].innerHTML;
				return this[len].innerHTML;
			}
		}
		return this;

	},
	css:function(param)
	{	
		var len = this.obj.len;
		while(len--)
		{		
			for(p in param)
			{				
				this[len].style[p] = param[p];				
			}		
		}	
		return this;	
	},
	attr:function(param,value)
	{		
		if (typeof param === "object")
		{		
			for(p in param)
			{				
				this[0].setAttribute(p,param[p]);
			}
		}
		else if (typeof param === "string")
		{	
			if (!value){ return this[0].getAttribute(param);}
			else{this[0].setAttribute(param,value);}			
		}
		return this;
	},
	append:function(selector)
	{
		//this[0].insertBefore(selector[0], null);
		//console.log(selector);
		/*console.log(selector);
		var j = selector[0]; 
		this[0].appendChild(j);	*/	
		this[0].appendChild(selector[0]);
		console.log(this);
		return this;
	},
	parent:function()
	{
		var x = this[0].parentNode;
		console.log(x);		//children
		var key = 0;
		var m = this[0].childNodes[0];
		console.log(m);
	},
	preview:function(param)
	{	
		this.filex = {};
		param.maxSize = parseInt(param.maxSize);	
		if (param.file)
		{	
			var files = param.file.target.files[0];
			if (files.size > param.maxSize){this.filex = "Size MAX LIMIT";}
			else
			{
				this.filex= files;	
				var reader = new FileReader();
				if(param.start){reader.onloadstart = param.start;}
				if (param.progress) {reader.onprogress = param.progress;};
				if (param.error) {reader.onerror = param.error;};
				if (param.abort) {reader.onabort = param.abort;};			
				reader.onload = param.fin;
	     		reader.readAsDataURL(files);	     		
			}     		
		}
		return this;		
	},
	imgedit:function(param)
	{	
		 var r = [0, 0, 0, 1, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 44, 45, 47, 48, 49, 52, 54, 55, 57, 59, 60, 62, 65, 67, 69, 70, 72, 74, 77, 79, 81, 83, 86, 88, 90, 92, 94, 97, 99, 101, 103, 107, 109, 111, 112, 116, 118, 120, 124, 126, 127, 129, 133, 135, 136, 140, 142, 143, 145, 149, 150, 152, 155, 157, 159, 162, 163, 165, 167, 170, 171, 173, 176, 177, 178, 180, 183, 184, 185, 188, 189, 190, 192, 194, 195, 196, 198, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 219, 219, 220, 221, 222, 223, 224, 225, 226, 227, 227, 228, 229, 229, 230, 231, 232, 232, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 239, 240, 241, 241, 242, 242, 243, 244, 244, 245, 245, 245, 246, 247, 247, 248, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
        g = [0, 0, 1, 2, 2, 3, 5, 5, 6, 7, 8, 8, 10, 11, 11, 12, 13, 15, 15, 16, 17, 18, 18, 19, 21, 22, 22, 23, 24, 26, 26, 27, 28, 29, 31, 31, 32, 33, 34, 35, 35, 37, 38, 39, 40, 41, 43, 44, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 83, 84, 85, 86, 88, 89, 90, 92, 93, 94, 95, 96, 97, 100, 101, 102, 103, 105, 106, 107, 108, 109, 111, 113, 114, 115, 117, 118, 119, 120, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 135, 136, 137, 138, 140, 141, 142, 144, 145, 146, 148, 149, 150, 151, 153, 154, 155, 157, 158, 159, 160, 162, 163, 164, 166, 167, 168, 169, 171, 172, 173, 174, 175, 176, 177, 178, 179, 181, 182, 183, 184, 186, 186, 187, 188, 189, 190, 192, 193, 194, 195, 195, 196, 197, 199, 200, 201, 202, 202, 203, 204, 205, 206, 207, 208, 208, 209, 210, 211, 212, 213, 214, 214, 215, 216, 217, 218, 219, 219, 220, 221, 222, 223, 223, 224, 225, 226, 226, 227, 228, 228, 229, 230, 231, 232, 232, 232, 233, 234, 235, 235, 236, 236, 237, 238, 238, 239, 239, 240, 240, 241, 242, 242, 242, 243, 244, 245, 245, 246, 246, 247, 247, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 255],
        b = [53, 53, 53, 54, 54, 54, 55, 55, 55, 56, 57, 57, 57, 58, 58, 58, 59, 59, 59, 60, 61, 61, 61, 62, 62, 63, 63, 63, 64, 65, 65, 65, 66, 66, 67, 67, 67, 68, 69, 69, 69, 70, 70, 71, 71, 72, 73, 73, 73, 74, 74, 75, 75, 76, 77, 77, 78, 78, 79, 79, 80, 81, 81, 82, 82, 83, 83, 84, 85, 85, 86, 86, 87, 87, 88, 89, 89, 90, 90, 91, 91, 93, 93, 94, 94, 95, 95, 96, 97, 98, 98, 99, 99, 100, 101, 102, 102, 103, 104, 105, 105, 106, 106, 107, 108, 109, 109, 110, 111, 111, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 119, 121, 121, 122, 122, 123, 124, 125, 126, 126, 127, 128, 129, 129, 130, 131, 132, 132, 133, 134, 134, 135, 136, 137, 137, 138, 139, 140, 140, 141, 142, 142, 143, 144, 145, 145, 146, 146, 148, 148, 149, 149, 150, 151, 152, 152, 153, 153, 154, 155, 156, 156, 157, 157, 158, 159, 160, 160, 161, 161, 162, 162, 163, 164, 164, 165, 165, 166, 166, 167, 168, 168, 169, 169, 170, 170, 171, 172, 172, 173, 173, 174, 174, 175, 176, 176, 177, 177, 177, 178, 178, 179, 180, 180, 181, 181, 181, 182, 182, 183, 184, 184, 184, 185, 185, 186, 186, 186, 187, 188, 188, 188, 189, 189, 189, 190, 190, 191, 191, 192, 192, 193, 193, 193, 194, 194, 194, 195, 196, 196, 196, 197, 197, 197, 198, 199];
		var file = param.file.target.files[0];		
	  	var reader = new FileReader();	
	 	reader.onload = function(e)
	 	{	 		
	 		var canvas = _(param.canvas)[0];	 		
			var cxt = canvas.getContext("2d");				
			var img = new Image ();
			img.src = e.target.result;			
			img.onload = function () {				
				canvas.width = this.width;
				canvas.height = this.height;
				cxt.drawImage(img, 0, 0);
				var imageData = cxt.getImageData(0,0,this.width,this.height);
				var data = imageData.data;			
				for(var i=0;i<data.length;i+=4){
						data[i] = r[data[i]];
						data[i+1] = g[data[i+1]];
						data[i+2] = b[data[i+2]];
						/*data[i] = 255 - data[i];
						data[i+1] = 255 - data[i+1];
						data[i+2] = 255 - data[i+2];*/
				}
				cxt.putImageData(imageData,0,0);
				if (param.idAlternative){var jodes = canvas.toDataURL("image/png");_(param.idAlternative).html("<img src='"+jodes+"'>")}				
			}
	 	};reader.readAsDataURL(file);
	},
	camera:function()
	{	
		//compativilidad entre navegadores
		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || function(){alert('Su navegador no soporta navigator.getUserMedia().');};
		window.datosVideo = {'StreamVideo': null,'url' : null};
		
   		navigator.getUserMedia({'audio':false, 'video':true}, function(streamVideo)
   		{
            datosVideo.StreamVideo = streamVideo;
            datosVideo.url = window.URL.createObjectURL(streamVideo);          
            _('#camara').attr('src', datosVideo.url);
        }, function(){
            alert('No fue posible obtener acceso a la cámara.');
        });
   		//detener video
   		document.getElementById("detener").onclick = function()
   		{
   			if(datosVideo.StreamVideo){
       		console.log("Saas");
            datosVideo.StreamVideo.stop();
            window.URL.revokeObjectURL(datosVideo.url);
      		};

   		
   		}	
	},

};
_.fn.prototype = _.fn;
_.extend = _.fn.extend = function(){
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {}, //argumento es la funcion q le paso
		i = 1,
		length = arguments.length, // cuantas funciones le paso
		deep = false;

	
	if ( length === i ) { // si el largo es exatacmente igual a 1
		target = this; // en el target guardo la funcion q le paso
		--i;		
	}
	for ( ; i < length; i++ ) 
	{
		if ( (options = arguments[ i ]) != null )  // guardo en opciones el argumento y pregunto q si es distinto a null
		{		

			for ( name in options )  //sacop el optiones 0 q seria el each
			{				
				src = target[ name ];  // y le digo q en src guarde el each
				copy = options[ name ]; // en copi guardo el optiones 0 q seria el each		la funcion como tal lo q esta dentro
							
				if ( target === copy ) 
				{					
					continue;
				}
				else if ( copy !== undefined ) {
					target[ name ] = copy;				
				}				
			} 
		}
	}

	return target;};
_.extend({
	each: function( object, callback, args )
	{
		console.log(object);
	},
	ajax:function(args)
	{
		var conexion;	
		if(window.XMLHttpRequest)
		{
			conexion = new XMLHttpRequest();
		}
		else
		{
			conexion = new ActiveXObject("Microsoft.XMLHTTP");
		}
		conexion.open(args.type,args.url,args.asicro);
		conexion.send();
	}
});

_.fn.extend({
	
});