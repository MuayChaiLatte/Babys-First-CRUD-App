const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const deletionTarget = document.querySelector('#deletionTarget')
const updateTarget = document.querySelector('#updateTarget')
const replacementQuote = document.querySelector('#replacementQuote')
const replacementAuthor = document.querySelector('#replacementAuthor')
const specificDeleteButtons = document.querySelectorAll('.specificDelete')

update.addEventListener('click', _=> {
    fetch('/quotes', {
        method:'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            update: updateTarget.value,
            name: replacementAuthor.value,
            quote: replacementQuote.value,
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _=> {
    fetch('delete-all-matches',{
        method: 'delete',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
        name: deletionTarget.value
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.innerText = 'No target authors to delete'
        }
        else {
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})

Array.from(specificDeleteButtons).forEach((element) => {
    element.addEventListener('click', deleteQuote)
})

async function deleteQuote() {
    const author = this.parentNode.childNodes[3].innerText
    const quote = this.parentNode.childNodes[7].innerText
    try {
        const response = await fetch('specific-quote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                authorS: author,
                quoteS: quote,
            })
        })
        const data = await response.json()
        location.reload()
    }
    catch(err) {
        console.error(err)
    }
}