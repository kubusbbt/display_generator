/*

Generator displayów v1.0

Odpalenie skryptu (terminal):
node app.js {argument - tytuł}


TO DO:
- dodawanie pliku manifest.json

*/



const fs = require('fs')
const fse = require('fs-extra')
const async = require('async')


// zmienne przekazane do skryptu
var args = process.argv.slice(2);

var title = args[0] ? args[0] : '';

var specyfikacje = require('./specyfikacje/specyfikacje.json');

removeDir();

// usunięcie katalogu output
function removeDir(){
	fse.remove('generator_output', function(err){
		if(err){
			console.log(err);	
		}else{
			copyDir();
		}
	});	
}


// skopiowanie katalogu
function copyDir(){
	async.forEach(Object.keys(specyfikacje), function(specka, callback){
		fse.copy('files', 'generator_output/' + specka, function(err){	
			if(err){
				console.log(err);	
			}else{
				readDir(specka);
			}
		});	
    });
}


function readDir(specka){
	fs.readdir('generator_output/' + specka, function(err, data){
		if(err){
			console.log(err);
		}else{
			for (var i = 0; i <= data.length - 1; i++) {
				if( data[i] !== '.DS_Store' ){
					changeContent(specka, data[i]);
				}
			}
		}
	})
}


function changeContent(specka, dir){

	var file = 'generator_output/'+specka+'/'+dir+'/index.html'

	fs.readFile(file, 'utf8', function(err, data){

		var addSize = dir.split("x");

		// dodanie rozmiaru meta
		var str = data.replace('<!-- addSize -->', '<meta name="ad.size" content="width='+addSize[0]+',height='+addSize[1]+'">');


		// podmiana tytułu
		// var str = str.replace(/<title>.*.|<\/title>/g, '<title>'+title+'</title>');
		var str = str.replace(/<title>.*.|<\/title>/g, '<title>'+specka+'</title>');


		// podmiana click
		var str = str.replace(/<!-- start href open -->.*.<!-- start href close -->/g, specyfikacje[specka]['href_start'] );
		var str = str.replace(/<!-- end href open -->.*.<!-- end href close -->/g, specyfikacje[specka]['href_stop'] );


		// head-script
		var str = str.replace(/<!-- head-script -->/g, specyfikacje[specka]['head_script'] );
		
		// top-script
		var str = str.replace(/<!-- top-script -->/g, specyfikacje[specka]['top_script'] );
		
		// footer-script
		var str = str.replace(/<!-- footer-script -->/g, specyfikacje[specka]['footer_script'] );


		// zapis do pliku
		fs.writeFile(file, str, function(err, data){
			if(err){
				console.log(err);
			}else{
				console.log('utworzono: '+specka+' / '+addSize[0]+ 'x' + addSize[1]);
			}
		})

		// console.log(str);
	});

}

 



