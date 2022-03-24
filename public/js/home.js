const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.getElementById('container')

open.addEventListener('click', ()=>{
  container.classList.add('active')
})

close.addEventListener('click', ()=>{
  container.classList.remove('active')
})


// const openfordelete = document.getElementById('open-for-delete')
// const closefordelete = document.getElementById('close-for-delete')
// const containerfordelete = document.getElementById('container-for-delete')

// open.addEventListener('click', ()=>{
//   containerfordelete.classList.add('activefordelete')
// })

// close.addEventListener('click', ()=>{
//   containerfordelete.classList.remove('activefordelete')
// })