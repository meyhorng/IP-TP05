const country =document.querySelector('#country')

const getdata=(name)=>{
    
    if((name.match(/^\s*$/) || []).length > 0) return 0;
    document.querySelector('.container').innerHTML=""
    document.querySelector('.lds-roller').style.display="inline-block"
    document.querySelector('#country').value=name

    fetch(`https://universities.hipolabs.com/search?country=${name}`).then((res)=>res.json()).then(data=>{
        let tmp="";
        console.log(data);
        data.forEach(item=>{
            let domain="";
            let i=0;
            item.domains.forEach((d=>{
                domain+=`                <a class="uni_link" href="${item.web_pages[i]}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>                      
                ${d}
            </a>`;
            i++;
            }))
            tmp+=
            `
            <div class="university">
                <h1 class="uni_name"><span>${item.name}</span>
                    <br>
                    <small>(${item.country}-${item.alpha_two_code})</small></h1>
                ${domain}
            </div>
            `
            
        })
        document.querySelector('.container').innerHTML=tmp;
        document.querySelector('.lds-roller').style.display="none"
    })

}


country.addEventListener('change',(e)=>{
    getdata(country.value)
    window.localStorage.setItem('country',country.value)
    // name.value="";
    
})

window.addEventListener('load',()=>{
    const country=window.localStorage.getItem('country');
    if(country){
        getdata(country)

    }
})