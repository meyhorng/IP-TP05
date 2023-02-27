const form =document.querySelector('.Input_from')

const getdata=(name)=>{
    
    if((name.match(/^\s*$/) || []).length > 0) return 0;
    document.querySelector('.container').innerHTML=`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    document.querySelector('.name').value=name
    fetch(`https://api.nationalize.io?name=${name}`).then((res)=>res.json()).then(data=>{
        let tmp="";
        data.country.forEach(item=>{
            tmp+=
            `
            <div class="output">
                <div class="country">${item.country_id || "No Data"}</div>
                <div class="percentage">${Number(item.probability*100).toFixed(2) || "No Data"}%</div>
            </div>
            `
        })
        document.querySelector('.container').innerHTML=tmp;
        
    })

}


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name=document.querySelector('.name');
    getdata(name.value)
    window.localStorage.setItem('name',name.value)
    // name.value="";
    
})

window.addEventListener('load',()=>{
    const name=window.localStorage.getItem('name');
    if(name){
        getdata(name)

    }
})