let screen = document.querySelector('#text');
let date = document.querySelector('#date');
let btn_add = document.querySelector('#add');
let maindiv = document.querySelector('.remove');


// Function to save items to localStorage
function saveToLocalStorage(newdiv,newdiv2,delet)
{
    // retrieve existing item from local storage
    const items=JSON.parse(localStorage.getItem('items'))||[];

    let item={
        text:newdiv.innerText,
        date:newdiv2.innerText,
        btn:delet.innerText,
        allclasses:
        {
            newdivclass:newdiv.className,
            newdiv2class:newdiv2.className,
            deletclass:delet.className
        }
    };

    // push new items in array
    items.push(item);

    // now we need to update th local storage bcz something is goin to add we need to update the ls
    localStorage.setItem('items',JSON.stringify(items));
}

// Function to remove item from localStorage
function removeFromLocalStorage(itemToRemove)
{
    let items=JSON.parse(localStorage.getItem('items'))||[];

    items=items.filter(item=>
        item.text!==itemToRemove.text||item.date!==itemToRemove.date
    );
    localStorage.setItem('items',JSON.stringify(items));
}

// Event listener for adding a new to-do item
btn_add.addEventListener('click', () => {
    if (screen.value === "" || date.value === "") {
        alert('Please enter a to-do item and date');
    } else {
        // Create new elements
        let newdiv = document.createElement("div");
        let newdiv2 = document.createElement("div");
        let delet = document.createElement('button');
        
        // Set classes
        newdiv.classList.add('divs', 'text');
        newdiv2.classList.add('divs', 'date');
        delet.classList.add('del');
        
        // Set content
        newdiv.innerText = screen.value;
        newdiv2.innerText = date.value;
        delet.innerText = 'Remove';

        // Clear input fields
        screen.value = '';
        date.value = '';

        // Save to localStorage
        saveToLocalStorage(newdiv, newdiv2, delet);

        // Append new elements to the DOM
        maindiv.append(newdiv, newdiv2, delet);

        // Add click event to remove the item
        delet.addEventListener('click', () => {
            // Remove the item from the DOM
            newdiv.remove();
            newdiv2.remove();
            delet.remove();

           
        });
    }
});


// Load stored data when the page loads
function loadfromlocalstorage()
{
    const items=JSON.parse(localStorage.getItem('items'))||[];
    
   items.forEach((item)=>
 {
    
    // Create new elements
    let newdiv = document.createElement("div");
    let newdiv2 = document.createElement("div");
    let delet = document.createElement('button');
   
    newdiv.innerText=item.text;
    newdiv.className=item.allclasses.newdivclass;

    newdiv2.innerText=item.date;
    newdiv2.className=item.allclasses.newdiv2;

    delet.innerText=item.btn;
    delet.className=item.allclasses.deletclass;

    maindiv.append(newdiv,newdiv2,delet);

    delet.addEventListener('click',()=>
    {
        newdiv.remove();
        newdiv2.remove();
        delet.remove();

         // Remove item from localStorage
        removeFromLocalStorage({
            text: newdiv.innerText,
            date: newdiv2.innerText
        });
    });
 });

}

document.addEventListener('DOMContentLoaded',loadfromlocalstorage);
