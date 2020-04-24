// const mongoose = require('mongoose');
// const axios = require('axios');


// const Toilet = require('./models/toilet');

// const { dbUrl } = require('./config')

// console.log('Start fetching toilets')
// axios.get('https://api.hel.fi/servicemap/v2/search/?page=1&page_size=200&only=unit.location%2Cunit.name%2Cunit.municipality%2Cunit.accessibility_shortcoming_count%2Cunit.contract_type&geometry=true&q=yleis%C3%B6vessat&language=fi').then(res => {
//   const toilets = res.data.results.map(t => {
//     return { name: t.name.fi, location: t.location }
//   }).filter(t => t.location !== undefined)
//   console.log('Toilets successfully fetched and parsed')


//   mongoose.connect(dbUrl, {useNewUrlParser: true}).then(() => {
//     console.log('Database connection successfull')


//     console.log('Start saving toilets')
//     toilets.forEach(t => {
//       console.log('saving toilet', t)
//       const toilet = new Toilet({ name: t.name, location: t.location })
//       toilet.save()
//     })
//     console.log('toilets successfully saved')
//   });
// })



