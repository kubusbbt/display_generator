/*

Generator displayów v1.0

Odpalenie skryptu (terminal):
node app.js {argument - tytuł}

*/

const fs = require('fs')
const fse = require('fs-extra')
const async = require('async')
const path = require('path');

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var assetPath = path.join(__dirname, 'specyfikacje/');


// zmienne przekazane do skryptu
var args = process.argv.slice(2);

// tytuł pobierny ze zmiennej
// var title = args[0] ? args[0] : '';
var title = '';

// pytanie o tytuł
rl.question('Podaj tytuł kampanii: ', (answer) => {
	title = answer;
	rl.close();

	removeDir();
});


const specyfikacje = require('./specyfikacje/specyfikacje.js')['specyfikacje'];




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
		fse.copy('files', path.resolve('generator_output/'+specka), function(err){	
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

	var addDir = 'generator_output/'+specka+'/'+dir+'/';
	var file = addDir + 'index.html';

	fs.readFile(file, 'utf8', function(err, data){

		var addSize = dir.split("x");

		// dodanie rozmiaru meta
		var str = data.replace('<!-- addSize -->', '<meta name="ad.size" content="width='+addSize[0]+',height='+addSize[1]+'">');


		// podmiana tytułu
		var str = str.replace(/<title>.*.|<\/title>/g, '<title>'+title+'</title>');


		// podmiana click
		str = str.replace(/<!-- start href open -->.*.<!-- start href close -->/g, specyfikacje[specka]['href_start'] );
		str = str.replace(/<!-- end href open -->.*.<!-- end href close -->/g, specyfikacje[specka]['href_stop'] );


		// head-script
		str = str.replace(/<!-- head-script -->/g, specyfikacje[specka]['head_script'] );
		
		// top-script
		str = str.replace(/<!-- top-script -->/g, specyfikacje[specka]['top_script'] );
		
		// footer-script
		str = str.replace(/<!-- footer-script -->/g, specyfikacje[specka]['footer_script'] );


		// console.log(str);

		// zapis do pliku
		fs.writeFile(file, str, function(err, data){
			if(err){
				console.log(err);
			}else{
				console.log('utworzono: '+specka+' / '+addSize[0]+ 'x' + addSize[1]);
			}
		})


		// dodanie manifest.json
		let manifest = specyfikacje[specka]['manifest'];
		if( manifest ){

			// podmiana treści json'a
			// fs.readFile('./specyfikacje/manifests/'+manifest+'.json', 'utf8', function(err, manifestContent){
			fs.readFile(assetPath + 'manifests/'+manifest+'.json', 'utf8', function(err, manifestContent){
				if(err){
					console.log(err);
				}else{	
					manifestContent = manifestContent.replace(/{{title}}/g, title);
					manifestContent = manifestContent.replace(/{{width}}/g, addSize[0]);
					manifestContent = manifestContent.replace(/{{height}}/g, addSize[1]);

					// zapis json
					fs.writeFile(addDir+'manifest.json', manifestContent, function(err, data){
						if(err){
							console.log(err);
						}
					});
				}
			});

		}		

	});

}
