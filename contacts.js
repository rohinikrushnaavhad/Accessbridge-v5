const CONTACT_KEY="accessbridge_contacts_v2";
function contactEsc(v){return String(v||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
function getContacts(){try{const a=JSON.parse(localStorage.getItem(CONTACT_KEY)||"[]");return Array.isArray(a)?a:[]}catch(e){return[]}}
function saveContacts(a){localStorage.setItem(CONTACT_KEY,JSON.stringify(a))}
function normContact(s){return String(s||"").toLowerCase().replace(/[^\w\s]/g,"").replace(/\s+/g," ").trim()}
function cleanPhone(s){return String(s||"").replace(/[^\d+]/g,"")}
function addContact(name,p){name=String(name||"").trim();p=cleanPhone(p);if(!name||!p)return{success:false,message:"Please provide a contact name and phone number."};const a=getContacts(),n=normContact(name),e=a.find(x=>normContact(x.name)===n);if(e){e.phone=p;saveContacts(a);return{success:true,message:name+" has been updated."}}a.push({id:Date.now().toString(),name,phone:p});saveContacts(a);return{success:true,message:name+" has been saved."}}
function findContact(n){const q=normContact(n),a=getContacts();return a.find(x=>normContact(x.name)===q)||a.find(x=>normContact(x.name).includes(q))||a.find(x=>q.includes(normContact(x.name)))||null}
function callContact(n){const c=findContact(n);return c?{success:true,contact:c,tel:"tel:"+cleanPhone(c.phone)}:{success:false,message:"I could not find "+n+" in your contacts."}}
function renderContacts(){const b=document.getElementById("contactsList");if(!b)return;const a=getContacts();b.innerHTML=a.length?a.map(c=>`<div class="contact-row"><b>${contactEsc(c.name)}</b></div>`).join(""):""}
function openWhatsApp(name,msg){const c=findContact(name),number=c?cleanPhone(c.phone):cleanPhone(name);if(!number)return false;location.href="https://wa.me/"+number+"?text="+encodeURIComponent(msg);return true}
window.AccessBridgeContacts={getContacts,addContact,findContact,callContact};window.renderContacts=renderContacts;window.openWhatsApp=openWhatsApp;document.addEventListener("DOMContentLoaded",renderContacts);
