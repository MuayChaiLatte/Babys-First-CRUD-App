const update = document.querySelector('#update-button')

update.addEventListener('click', _=> {
    fetch('/quotes', {
        method:'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of fath disturbing'
        })
    })
    .then(res => {
        if (res.ok) return res
    })
    .then(response => {
        window.location.reload(true)
    })
})

/*
fetch method is called
this returns a pending promise
fetch is fetching a resource from the network by sending a requet
fetch is fetching from /quotes
fetch is using the put method
fetch has the body of the darth vader quote in its request

*/