const smoothScrollAnchor = decument.querySelectorAll("a[href^='#']")

for (let index = 0; index < smoothScrollAnchor.length; index++) {
    const e = smoothScrollAnchor[index];
    
    e.addEventListener("click", function(){
        e.preventDefault();
        if(decument.getElementById(this.get.attribute("href").replace("#", "")))
    })
}