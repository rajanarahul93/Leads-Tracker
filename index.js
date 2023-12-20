let myLeads =[]
let oldLeads = []
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
if(leadsFromLocalStorage){
myLeads = leadsFromLocalStorage
render(myLeads)
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    })
})

function render(leads){
    let ListItems = ""
    for(let i = 0;i<leads.length;i++){
    ListItems += `
    <li>
    <a target = '_blank' href = '${leads[i]}'>
    ${leads[i]}
    </a>
    </li>
    `
}
document.getElementById("ul-el").innerHTML = ListItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
document.getElementById("input-btn").addEventListener("click", function(){
    myLeads.push(document.getElementById("input-el").value)
    document.getElementById("input-el").value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

