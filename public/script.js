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
