const form =document.querySelector('.Input_from')

const getdata=(name)=>{
    document.querySelector('.container').innerHTML=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    if((name.match(/^\s*$/) || []).length > 0) return 0;

    fetch(`https://api.genderize.io?name=${name}`).then((res)=>res.json()).then(data=>{
        document.querySelector('.container').innerHTML=`<p class="Name">Makara</p>
        <p class="gender">Female</p>
        <p class="percentage">50%</p>
        `
        document.querySelector('.Name').innerText=data.name || "No Store Data";
        document.querySelector('.gender').innerText=data.gender || "No Store Data";
        document.querySelector('.percentage').innerText=`${data.probability*100}%` || "No Store Data";
   
    })
}


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name=document.querySelector('.name');
    getdata(name.value)
    window.localStorage.setItem('name',name.value)
    name.value="";
    
})

window.addEventListener('load',()=>{
    const name=window.localStorage.getItem('name');
    if(name){
        getdata(name)

    }
})