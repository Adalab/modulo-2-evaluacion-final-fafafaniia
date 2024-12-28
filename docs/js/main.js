const g=document.querySelector(".js__submitBtn"),f=document.querySelector(".js__inputName"),u=document.querySelector(".js__charactersUl"),d=document.querySelector(".js__favCharactersUl"),C=document.querySelector(".js__deleteFavs");let m="",o=[],a=[];const s="https://placehold.co/210x295/80c0f5/white/?text=Disney";fetch("//api.disneyapi.dev/character?pageSize=50").then(r=>r.json()).then(r=>{o=r.data;for(const e of o)m+=`
        <li class="card">
              <h2 class="card_title">${e.name}</h2>
              <img src="${e.imageUrl||s}" alt="Foto de ${e.name}" onerror="this.onerror=null; this.src='${s}';"></img>
        </li>
        `;u.innerHTML=m,document.querySelectorAll(".card").forEach(e=>{e.addEventListener("click",h)}),S()});const h=r=>{const e=r.currentTarget.querySelector(".card_title").innerHTML,l=o.filter(t=>t.name===e);let i="";a.find(t=>t.name===e)===void 0?a.push(l[0]):a=a.filter(t=>t.name!==e);for(const t of a)i+=`
        <li class="card favCharacters">
              <h2 class="card_title">${t.name}</h2>
              <img src="${t.imageUrl||s}" alt="Foto de ${t.name}" onerror="this.onerror=null; this.src='${s}';"></img>
        </li>
        `;d.innerHTML=i,localStorage.setItem("favCharacters",JSON.stringify(a)),document.querySelectorAll(".card").forEach(t=>{t.addEventListener("click",h)})},v=r=>{r.preventDefault();const n=f.value,e=o.filter(c=>c.name.toLowerCase().includes(n.toLowerCase()));let l="";for(const c of e)l+=`
        <li class="card">
            <h2 class="card_title">${c.name}</h2>
            <img src="${c.imageUrl||s}" alt="Foto de ${c.name}" onerror="this.onerror=null; this.src='${s}';"></img>
        </li>
        `;u.innerHTML=l,document.querySelectorAll(".card").forEach(c=>{c.addEventListener("click",h)})},$=r=>{r.preventDefault(),a=[],d.innerHTML="",localStorage.removeItem("favCharacters")},S=()=>{const r=localStorage.getItem("favCharacters");if(r){a=JSON.parse(r);let n="";for(const e of a)n+=`
            <li class="card favCharacters">
                  <h2 class="card_title">${e.name}</h2>
                  <img src="${e.imageUrl||s}" alt="Foto de ${e.name}" onerror="this.onerror=null; this.src='${s}';"></img>
            </li>
          `;d.innerHTML=n}};f.addEventListener("input",v);g.addEventListener("click",v);C.addEventListener("click",$);
//# sourceMappingURL=main.js.map
