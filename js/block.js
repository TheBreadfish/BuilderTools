var http = require('http');
var mcdata = require('./mcdata');
var url = require('url')
const express = require('express')
const app = express()
const cors = require('cors')




http.createServer(function (req, res) {

    
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next()
      });

    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.writeHead(200, {'Content-Type': 'text/html'});


    //var adr = req.protocol + '://' + req.get('host') + req.originalUrl;
    var q = url.parse(req.url, true).query
    //var p = url.parse(adr, true)

    var queryData = q.query
    let name = q.name


    let block = mcdata.block(q.name)

    console.log(block)
    

    res.write(`
        <style>
            body {
                text-align: center;
                background-color: rgb(250, 250, 250);
            }

            .contain {
                margin: auto;
                
                width: 10%;
                padding: 2%;
            }

            img {
                display: block;
                margin: none;
            }

            /*.text {
                text-align: left;
            }

            .contain>h1 {
                margin: auto;
                text-align: left;
            }
            .contain>h3 {
                margin: auto;
                text-align: left;
            }*/

            
        </style>
    `)

    let html = `
    
        
        
    <label for="blockInput">Name: </label>
    <input type="text" id="blockInput">
    <button id="blockButton">Go!</button>

    <div class="contain">
        <p class="text">

            <h1 id="title">'+name+'</h1>
            <h3 id="id">id</h3>
            
            <br><br>
            <div class="image-container">
                <img crossOrigin="anonymous" id="image" height="20%" style="image-rendering: pixelated;" 
                src="`+mcdata.blockTexture(name)+`"
                
                >
                <div>
                    colour: 
                </div>
            </div>
            <br>
            <br>
            <article>
                <h3>Drops:</h3>
                <b id="drops">
                    item
                </b><!--<br>
                <h3>Hardness</h3>
                <b id="hardness">
                    hardness
                </b><br>
                <h3>Colour:</h3>
                <b id="color">
                    hex
                </b>-->
            </article>


            <canvas id="canvas">
        </p>
    </div>`

    html += ``
    res.write(html)

    res.write(`
        

        <!-- CLIENT SIDE JS -->

        <script src="https://unpkg.com/fast-average-color/dist/index.browser.min.js"></script>

        <script>
            

            let pic = document.getElementById("image")
            let canvas = document.getElementById("canvas")
            pic.crossOrigin = "anonymous";
            canvas.crossOrigin = "anonymous"

            

            function fixPic() {
                console.log('.png failed')

                let pic = document.getElementById('image');
                pic.src = pic.src.replace(".png","")+"_front.png";

                console.log('_front.png attempted')

                pic.setAttribute("onerror", "fixPicTwo()")
            }

            function fixPicTwo() {
                console.log('attempting _side.png')

                let pic = document.getElementById("image");pic.src = pic.src.replace("_front.png","_side.png");
                console.log("thats all i got")

                pic.setAttribute("onerror", "")
            }

            

            document.getElementById('image').addEventListener("onerror", fixPic)

            pic.setAttribute("onerror", "fixPic()")


            const fac = new FastAverageColor();
            const container = document.querySelector('.image-container');

            function getColor() {
                pic.setAttribute("onload", "")

                fac.getColorAsync(container.querySelector('img'))
                .then(color => {
                    container.style.backgroundColor = color.rgba;
                    container.style.color = color.isDark ? '#fff' : '#000';
                    container.innerHTML += color.rgba

                    console.log(color.rgba)
                })
                .catch(e => {
                    console.log(e);
                });
            }

            pic.setAttribute("onload", "getColor()")

            
            /*let ctx = canvas.getContext("2d"); 

            

            const drawImage = (url) => {
                const image = new Image();
                image.src = url;
                image.onload = () => {
                    ctx.drawImage(image, 0, 0)

                    console.log(ctx.getImageData(0,0,canvas.width,canvas.height))
                }
            }*/



            


            

            let block = `+JSON.stringify(block)+`;
            console.log(block)
            document.getElementById("title").innerHTML = block.displayName
            document.getElementById("id").innerHTML = "(id: "+block.id+")"
            
            if(block['drops'].length >= 2) {
                for(let i = 0; i < block['drops'].length; i++) {
                    document.getElementById("drops").innerHTML = document.getElementById("drops").innerHTML + block.drops[i] + ", " 
                }
            } else {
                document.getElementById("drops").innerHTML = block.drops[0]
            }


            let blockInput = document.getElementById("blockInput")
            let blockButton = document.getElementById("blockButton")

            blockButton.addEventListener("click", function() {
                console.log(blockInput.value)
                location.href = location.href.replace(block.name, blockInput.value)
            })

            blockInput.addEventListener("keydown", keyLog)

            function keyLog(e) {
                if(\` \${e.code}\`==' Enter') {
                    console.log('success')

                    console.log(blockInput.value)
                    location.href = location.href.replace(block.name, blockInput.value)
                }
            }
        </script> `)
    res.end('')

  }).listen(8080);