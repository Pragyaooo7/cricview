let form = document.querySelector("#formID");

window.onload = function () {
    if (document.getElementById("choosePlayer").classList.contains('hidden') == false) {
        document.getElementById("choosePlayer").classList.add('hidden');
    }
    if (document.querySelector('.content').classList.contains('hidden') == false) {
        document.querySelector('.content').classList.add('hidden');
    }
    if (document.querySelector(".notfound").classList.contains('hidden') == false) {
        document.querySelector(".notfound").classList.add('hidden');
    }
}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearcontent();
    let name = document.getElementById("searchbox");
    let keyword = name.value;
    let url = "https://api.cricapi.com/v1/players?apikey=d541df37-060f-4378-b7c1-9d952154cbce&offset=0&search=";
    for (let i = 0; i < keyword.length; i++) {
        if (keyword[i] != ' ') {
            url += keyword[i];
        }
        else {
            url += "%20";
        }
    }
    // control the display of 3 things = .content 
    // #choosePlayer
    // #notfound
    let choosePlayer = document.getElementById("choosePlayer");
    let notfound = document.querySelector(".notfound");
    let content = document.querySelector('.content');
    fetch(url).then((response) => {
        return ans = response.json();
    }).then((data) => {
        console.log(data);
        if (data["data"].length == 1) {
            // single player only
            if (notfound.classList.contains("hidden") == false) {
                notfound.classList.add("hidden");
            }
            if (choosePlayer.classList.contains("hidden") == false) {
                choosePlayer.classList.add("hidden");
            }
            populate(data["data"][0]["id"]);
        }
        else if (data["data"].length == 0) {
            if (notfound.classList.contains("hidden")) {
                notfound.classList.remove("hidden");
            }
            if (content.classList.contains("hidden") == false) {
                content.classList.add("hidden");
            }
            if (choosePlayer.classList.contains("hidden") == false) {
                choosePlayer.classList.add("hidden");
            }
        }
        else {
            // add option to pick multiple options using radio input form
            if (notfound.classList.contains("hidden") == false) {
                notfound.classList.add("hidden");
            }
            if (content.classList.contains("hidden") == false) {
                content.classList.add("hidden");
            }
            // form banao naya 
            choosePlayer.innerText = "";
            // create elements of option and keep appending as a child 
            let indx = 0;
            data["data"].forEach(function (element) {
                let option = document.createElement('div');
                option.setAttribute('class', "option");
                let input = document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', 'pid');
                input.setAttribute('id', `item${indx}`);
                input.setAttribute('value', element['id']);
                if (indx == 0) {
                    input.checked = true;
                }
                let label = document.createElement('label');
                label.setAttribute('for', `item${indx}`);
                label.innerText = `${element['name']}(${element['country']})`;
                indx++;
                option.appendChild(input);
                option.appendChild(label);
                choosePlayer.append(option);
            })
            let btn = document.createElement('button');
            btn.setAttribute('id', 'choosebtn');
            btn.innerText = 'SUBMIT';
            console.log(choosePlayer);
            let nl = document.createElement('br');
            choosePlayer.appendChild(nl);
            choosePlayer.appendChild(btn);
            choosePlayer.classList.remove('hidden');
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                console.log("form submitted");
                let a = document.querySelectorAll('input');
                a.forEach(function (element) {
                    if (element.getAttribute('type') == 'radio' && element.checked == true) {
                        populate(element.value);
                    }
                })
            });
        }
    })
});


function populate(pid) {
    let battingTable = document.querySelector("#battingtable");
    let bowlingTable = document.querySelector("#bowlingTable");
    fetch(`https://api.cricapi.com/v1/players_info?apikey=d541df37-060f-4378-b7c1-9d952154cbce&offset=0&id=${pid}`).then((response) => {
        return response.json();
    }).then((data) => {
        // now traverse the stats array and populate the table using classes given to them 
        // first let us do the batting part 
        console.log(data);
        document.getElementById("playerdp").setAttribute('src', data['data']['playerImg']);
        if (data['data']['stats'] == undefined) {
            return;
        }
        data["data"]['stats'].forEach(element => {
            // ye ek object hai with attribute fn, matchtype (format), stat, value  
            if (element['fn'] == "batting") {
                let row = document.getElementById(element['matchtype'] + "BattingRow");
                // now traverse this row children and place the value at the child jaha stat uski class me ata ho
                // console.log(element['matchtype'] + "BattingRow");
                Array.from(row.children).forEach(function (elem) {
                    if (elem.classList.contains(element['stat'])) {
                        elem.innerText = "";
                        elem.innerText = element['value'];
                    }
                })
            }

            if (element['fn'] == "bowling") {
                let row = document.getElementById(element['matchtype'] + "BowlingRow");
                // now traverse this row children and place the value at the child jaha stat uski class me ata ho
                Array.from(row.children).forEach(function (elem) {
                    if (elem.classList.contains(element['stat'])) {
                        elem.innerText = "";
                        elem.innerText = element['value'];
                    }
                })
            }
        });
    });
    if (document.querySelector('.content').classList.contains('hidden')) {
        document.querySelector('.content').classList.remove('hidden');
    }
}


function clearcontent() {
    let cells = document.querySelectorAll('td');
    cells.forEach(function (cell) {
        let clearcell = !(cell.classList.contains("test") || cell.classList.contains("odi") || cell.classList.contains("t20i") || cell.classList.contains("ipl"));
        if (clearcell) {
            cell.innerText = '-';
        }
    })
}

