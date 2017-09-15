const nameInput = $('.name-input');
const reasonInput = $('.reason-input');
const cleanliness = $('.drop-down');
const submit = $('.submit');
const sort = $('.sort')

const cleanlinessStats = (array) => {
  const totals = array.reduce((accum, item) => {
		if (!accum[item.cleanliness]) {
			accum[item.cleanliness] = 1
		} else {
			accum[item.cleanliness]++
		}
  	return accum
  }, {})
  const cleanlinessTotal = (value) => {
    if (totals[value] === undefined) {
      return 0
    } else {
      return totals[value]
    }
  }
  $('.per-cleanliness-total').replaceWith(
  `<section class="per-cleanliness-total">
     <h3 class="item-total">Sparkling: ${cleanlinessTotal('Sparkling')}</h3>
     <h3 class="item-total">Dusty: ${cleanlinessTotal('Dusty')}</h3>
     <h3 class="item-total">Rancid: ${cleanlinessTotal('Rancid')}</h3>
   </section>`
 )
}

const getListTotal = () => {
  fetch('/api/v1/list')
    .then(res => res.json())
    .then(items => {
      $('.list-total').replaceWith
      (`<h3 class="list-total">Total Items: ${items.length}</h3>`)
    })
    .catch(error => console.log({error}))
}

const getPerCleanlinessTotal = () => {
  fetch('/api/v1/list')
    .then(res => res.json())
    .then(items => {
      cleanlinessStats(items)
    })
    .catch(error => console.log({error}))
}

const getList = () => {
  fetch('/api/v1/list')
    .then(res => res.json())
    .then(items => {
      return items.map(item => 
        $('.list').append
        (`<h3 class="${item.id} item-name">${item.name}</h3>`)
      )
    })
    .catch(error => console.log({error}))
}

const getCard = () => {
  fetch('/api/v1/list')
    .then(res => res.json())
    .then(items => {
      return items.map(item => 
        $('.list').append
        (`<h3 class="${item.id} item-name">${item.name}</h3>`)
      )
    })
    .catch(error => console.log({error}))
}

const addItem = () => {
  fetch('/api/v1/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameInput.val(),
      reason: reasonInput.val(),
      cleanliness: cleanliness.val()
    }),
  })
    .then(res => res.json())
    .then(item => {
      getListTotal()
      getPerCleanlinessTotal()
      return $('.list-item-container').append
      (`<h3 class="item-name">${item.name}</h3>`)
      
    });
};

getListTotal()
getPerCleanlinessTotal()
getList()

submit.click((e) => {
  e.preventDefault();
  addItem();
})



