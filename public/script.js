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
      if (item.name === undefined) {
        $('.error').remove()
        return $('.form-wrapper').append
        (`<h3 class="error">Invalid entry</h3>`)
      }
      $('.list').append(`<h3 class="${item.id} item-name">${item.name}</h3>`)
      $('.error').remove()
    })
    .catch(error => {
      console.log({error});
    })
};

const resetInput = () => {
  nameInput.val('');
  reasonInput.val('');
  cleanliness.prop('selectedIndex', 0)
}

const sortAlphabetically = () => {
  let names = []
  fetch('/api/v1/list')
    .then(res => res.json())
    .then(items => {
      const sorted = items.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
      $('.list').empty()
      sorted.map(item => {
        $('.list').append
        (`<h3 class="${item.id} item-name">${item.name}</h3>`)
      })
    })
    .catch(error => console.log({error}))
}

const findItem = (item, id) => {
  item.map(item => {
    $('.individual-card-wrapper').append(
      `<div class="individual-card">
        <h3 class="${id} name">Item Name: ${item.name}</h3>
        <p class="reason">Reason: ${item.reason}</p>
        <p class="cleanliness">Cleanliness Level: ${item.cleanliness}</p>
        <select class="cleanliness-dropdwn" name="cleanliness">
          <option selected disabled class="cleanliness" value="null">Update cleanliness</option>
          <option class="cleanliness" value="Sparkling">Sparkling</option>
          <option class="cleanliness" value="Dusty">Dusty</option>
          <option class="cleanliness" value="Rancid">Rancid</option>
        </select>
        <button class="${id} update-status" type="button" name="submit">Submit</button>
       </div>`)
  })
}

const updateIndividualItem = (item) => {
  $('.individual-card-wrapper').append(
  `<div class="individual-card">
    <h3 class="${item.id} name">Item Name: ${item.name}</h3>
    <p class="reason">Reason: ${item.reason}</p>
    <p class="cleanliness">Cleanliness Level: ${item.cleanliness}</p>
    <select class="cleanliness-dropdwn" name="cleanliness">
      <option selected disabled class="cleanliness" value="null">Update cleanliness</option>
      <option class="cleanliness" value="Sparkling">Sparkling</option>
      <option class="cleanliness" value="Dusty">Dusty</option>
      <option class="cleanliness" value="Rancid">Rancid</option>
    </select>
    <button class="${item.id} update-status" type="button" name="submit">Submit</button>
   </div>`)
}

getListTotal()
getPerCleanlinessTotal()
getList()

submit.click((e) => {
  e.preventDefault();
  addItem();
  resetInput()
})

sort.click(() => {
  sortAlphabetically();
})

$('.list').click((e) => {
  const id = parseInt(e.target.classList[0]);
  console.log(id);

  fetch('/api/v1/list')
    .then(res => res.json())
    .then(items => {
      const filteredItem = items.filter(item =>
        item.id === id
      )
      $('.individual-card-wrapper').empty()
      findItem(filteredItem, id)
    })
    .catch(error => console.log({error}))
})

$('.individual-card-wrapper').click((e) => {
  if (e.target.type === 'button') {
    const id = parseInt(e.target.classList[0]);

    fetch(`/api/v1/list/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cleanliness: $('.cleanliness-dropdwn').val()
      }),
    })
      .then(res => res.json())
      .then(newItem => {
        $('.individual-card-wrapper').empty()
        updateIndividualItem(newItem)
      })
      .catch(error => {error})
  } 
})

$('.door-btn').click(() => {
  $('.door-btn').text() === 'Open Door' ? $('.door-btn').text('Close Door') : $('.door-btn').text('Open Door');
  $('.door').toggleClass('open');
})




