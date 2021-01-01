// Fetching data from html tags and storing them in variables
let billAmount = document.querySelector("#bill-amount");
let cashAmount = document.querySelector("#cash-amount");
let displayCash = document.querySelector(".txt-cash");
let btnChange = document.querySelector("#btn-calculate");
let cashChange = document.querySelector("#cash-change");
let btnReset = document.querySelector("#btn-reset");

// Shows cash input only when the bill amount is entered
function displayCashHandler(data) {
    if (data.target.value.length > 0) {
        displayCash.style.display = "block";
    } else {
        displayCash.style.display = "none";
    }
}

// Calculate the change with minimum number of notes
function calculateChange() {
    console.log("bill: "+billAmount.value);
    console.log("cash: "+cashAmount.value);
    if(billAmount.value == "" || cashAmount.value == ""){
        cashChange.innerText = "Invalid input, please try again.";
    } else if (billAmount.value == cashAmount.value) {
        cashChange.innerText = "No change to be returned";
    } else if (parseInt(billAmount.value) > parseInt(cashAmount.value)) {
        cashChange.innerHTML = `Insufficient cash! User must pay an addition of <b class="amt-bold">₹${billAmount.value - cashAmount.value}</b>`;
    } else {
        var notes = {
            1: 0,
            5: 0,
            10: 0,
            20: 0,
            100: 0,
            500: 0,
            2000: 0,
        }
        var cashDiff = cashAmount.value - billAmount.value;
        var changeVal = cashDiff;
        var deno = Object.keys(notes).reverse();
        for (var i = 0; i < deno.length; i++) {
            while (cashDiff >= deno[i]) {
                notes[deno[i]] += 1;
                cashDiff -= deno[i];
            }
            if (cashDiff == 0) {
                break;
            }
        }
        let dataText =  `<div class="amt-bold">Return the change of <b class="amt-bold">₹${changeVal}</b> as follows</div><br/>
        <table>
        <thead>
        <tr>
        <th>Denomination</th>
        <th>No. of Notes</th>
        </tr>
        </thead>
        <tbody>`;
        deno.map(deno => {
            if (notes[deno] > 0) {
                dataText += `<tr>
                <td>₹${deno}</td>
                <td>${notes[deno]}</td> 
                </tr>`;
            }
        })
        dataText += `</tbody>
        </table>`;
        console.log(dataText);
        cashChange.innerHTML = dataText;
    }
}
// Bill amount on change listener
billAmount.addEventListener('input', displayCashHandler);
// Triggers to calculates the change
btnChange.addEventListener('click', calculateChange);
// Reset ouput data trigger
btnReset.addEventListener('click',function(){cashChange.innerText = "";});