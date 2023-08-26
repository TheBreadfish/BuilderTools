//Define Variables
let noiseSel = document.getElementById("noiseSel")
let hidden = document.getElementById("hidden")
let noiseDisp = document.getElementById("noiseDisp")
let octaDisp = document.getElementById("per/rm")
let persDisp = document.getElementById("per")
let genButton = document.getElementById("gen")
let output;
let outputDisp = document.getElementById("output")
let inputs = document.getElementsByClassName("input")
let seed = document.getElementById("seed").value
let x = document.getElementById("x").value
let y = document.getElementById("y").value
let z = document.getElementById("z").value
let freq = document.getElementById("freq").value
let octa = document.getElementById("octa").value
let pers = document.getElementById("pers").value
let thresh = document.getElementById("thresh").value
let blocks = document.getElementById("blocks").value

document.getElementById('seed').value=Math.floor(Math.random()*10000000000)


//Shows Options
function showOpt(noise) {
    console.log(noise)

    if(noise) {
        hidden.style.display = "unset"
        octaDisp.style.display = "none"
        persDisp.style.display = "none"

        noiseDisp.innerText = noiseSel.options[noiseSel.selectedIndex].text + " Noise"

        //If RidgedMulti OR Perlin then Show Octaves
        if(noise == "rm" || noise == "per") {
            console.log("rm || per")

            octaDisp.style.display = "unset"
            
            //If Perlin then Show Persistence
            if(noise == "per"){
                console.log("per")

                persDisp.style.display = "unset"
            }
        }
        

    } else {
        console.log("Invalid Selection")
    }
}

//Generation
function genCmd(type, seed, x, y, z, freq, octa, pers, thresh, block) {
    output = "//gen "+ block.toLowerCase() + " " + type + "(" + seed + ", " + x + ", " + y + ", " + z + ", " + freq

    //Add Octaves
    if(type == "perlin" || type == "ridgedmulti") {
        output += ", " + octa

        //Add Persistence
        if(type == "perlin") {
            output += ", " + pers
        }
    }

    output += ")" + thresh

    console.log(output)
    outputDisp.innerText = output
}

function updateCmd(noise) {
    seed = document.getElementById("seed").value
    x = document.getElementById("x").value
    y = document.getElementById("y").value
    z = document.getElementById("z").value
    freq = document.getElementById("freq").value
    octa = document.getElementById("octa").value
    pers = document.getElementById("pers").value
    thresh = document.getElementById("thresh").value
    blocks = document.getElementById("blocks").value

    genCmd(noise.toLowerCase(), seed, x, y,z, freq, octa, pers, thresh, blocks)
}


//Startup
noiseSel.addEventListener("change", function(){
    showOpt(noiseSel.value)
})

showOpt(noiseSel.value)

genButton.addEventListener("click", function() {
    updateCmd(noiseSel.options[noiseSel.selectedIndex].text)
})

//Stack Overflow
//https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
//Thanks to Anudeep Bulla and VLAZ

    let elements = inputs

    Array.from(elements).forEach(function(element){
        element.addEventListener("change", function(){
            updateCmd(noiseSel.options[noiseSel.selectedIndex].text)
            })
    })

updateCmd(noiseSel.options[noiseSel.selectedIndex].text)