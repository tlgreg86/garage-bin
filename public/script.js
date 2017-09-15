const nameInput = $('.name-input');
const reasonInupt = $('.reason-input');
const cleanliness = $('.drop-down');
const submit = $('.submit')

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
  `<section class="totals-wrapper">
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
      (`<h3 class="item-total">Total Items: ${items.length}</h3>`)
    })
    .catch(error => console.log({error}))
}

