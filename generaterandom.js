
function  generate(){
    const fullstring = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let shortstring = ""
    const length = 7

    for(let i=0;i<length;i++){
        const randomindex = Math.floor(Math.random() * fullstring.length);
        shortstring += fullstring[randomindex]
    }
    return shortstring
}

async function createshort(ShortUrl){

    let generatedString = ""

    while(true){

        const newstring = generate()

        const data = await ShortUrl.findOne({short : newstring})

        if(data === null){
            generatedString = newstring
            break
        }

    }
    return generatedString
}

module.exports = {createshort}



