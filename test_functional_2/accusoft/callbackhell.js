//https://www.youtube.com/watch?v=ntlTxreBnqQ&feature=youtu.be&t=179

const fnRequest = (callback) => 
                    setTimeout(() => 
                        callback(null,{statusCode:Math.round(Math.random()) ? 200:500}, 150))
    fnAmIAwesome = fnRequest,
    fnAreYouAwesome = fnRequest,
    fnAreWeAwesome = fnRequest

const   I_AM_AWESOME = 1, 
        YOU_ARE_AWESOME_TOO = 2, 
        WE_ARE_AWESOME = 3,
         NO_ONE_IS_AWESOME = 0

const doSomething = () => {
    let state = NO_ONE_IS_AWESOME

    fnAmIAwesome((err,res)=>{
        if(res.statusCode === 200){
            state = I_AM_AWESOME
        } else {
            state = NO_ONE_IS_AWESOME
        }

        fnAreYouAwesome((err,res)=>{
            if(res.statusCode === 200 && state === I_AM_AWESOME){
                state = YOU_ARE_AWESOME_TOO
            } else {
                state = NO_ONE_IS_AWESOME
            }

            fnAreWeAwesome((err,res)=>{
                if(res.statusCode === 200 && state === YOU_ARE_AWESOME_TOO){
                    state = WE_ARE_AWESOME
                } else {
                    state = NO_ONE_IS_AWESOME
                }

                console.log(state?"WE ARE AWESOME":"AWWWW")
            })//fnAreWeAwesome

        })//fnAreYouAwesome
    })//fnAmIAwesome

}//doSomething

for(let i=0; i<50; i++)
    doSomething()