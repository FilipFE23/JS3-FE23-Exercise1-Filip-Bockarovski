let homeDOM = document.getElementsByTagName('a')[0]
let aboutDOM = document.getElementsByTagName('a')[1]
let contactDOM = document.getElementsByTagName('a')[2]

let contentDOM = document.getElementById('content')
let loaderDOM = document.getElementById('loader')

let loadingTimeout

window.addEventListener('popstate', () => {
  switch(history.state.page){
    case 0:
      fetchPage('home.html')
      break
    case 1:
      fetchPage('about.html')
      break
    case 2:
      fetchPage('contact.html')
      break
  }
})

homeDOM.addEventListener('click', (e) => {
  history.pushState({page:0},'','/home')
  fetchPage('home.html')
})

aboutDOM.addEventListener('click', (e) => {
  history.pushState({page:1},'','/about')
  fetchPage('about.html')
})

contactDOM.addEventListener('click', (e) => {
  history.pushState({page:2},'','/contact')
  fetchPage('contact.html')
})

function fetchPage(filename) {
  loadingTimeout = setTimeout(() => {
    contentDOM.classList.add('hidden')
    loaderDOM.classList.remove('hidden')
  }, 300)
  if(typeof filename != 'string') return
  fetch(filename).then((results)=> {
    return results.text()
  }).then((data) => {
    clearTimeout(loadingTimeout)
    contentDOM.innerHTML = data
    loaderDOM.classList.add('hidden')
    contentDOM.classList.remove('hidden')
  })
}