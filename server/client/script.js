const currentPage = document.querySelector('.indicator')

function WriteTxt(ele){
    ele.firstElementChild.classList.toggle('active')
    ele.parentElement.querySelector('.show-txt').firstElementChild.classList.toggle('active')
    
    currentPage.classList.toggle('left-indicate')
}

function View(ele){
    ele.firstElementChild.classList.toggle('active')
    ele.parentElement.querySelector('.write-txt').firstElementChild.classList.toggle('active')
    
    currentPage.classList.toggle('left-indicate')
}
