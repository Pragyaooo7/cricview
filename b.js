let nf1 = document.getElementById("notfound1");
let nf2 = document.getElementById("notfound2");
let pf1 = document.getElementById("playersuggestioncompare1");
let pf2 = document.getElementById("playersuggestioncompare2");

window.onload = function () {
    nf1.classList.add("hidden");
    nf2.classList.add("hidden");
    pf1.classList.add("hidden");
    pf2.classList.add("hidden");
    document.querySelector(".main-content").classList.add("hidden");
}


let form1 = document.querySelector("#formIDcompare1");
let form2 = document.querySelector("#formIDcompare2");

let pid1 = 0; // means abhi tak koi player enter nahi kiya gaya hai user dwara
let pid2 = 0; // means abhi tak koi player enter nahi kiya gaya hai user dwara


form1.addEventListener('submit', (event) => {
    event.preventDefault();
    let keyword = document.getElementById("searchbox_compare_1").value;
    let url = "https://api.cricapi.com/v1/players?apikey=d541df37-060f-4378-b7c1-9d952154cbce&offset=0&search=";
    console.log(keyword);
    for (let i = 0; i < keyword.length; i++) {
        if (keyword[i] == ' ') {
            url += "%20";
        }
        else {
            url += keyword[i];
        }
    }
    console.log(url);
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["data"].length == 0) {
            // show could'nt find the player
            nf1.classList.remove("hidden");
            pf1.classList.add("hidden");
        }
        else if (data["data"].length == 1) {
            nf1.classList.add("hidden");
            pf1.classList.add("hidden");
            pid1 = data["data"][0]['id'];
            console.log(pid1);
        }
        else {
            // multiple so make form and populate the dom
            nf1.classList.add("hidden");
            pf1.classList.add("hidden");
            let playersuggestioncompare1 = document.querySelector("#playersuggestioncompare1");
            playersuggestioncompare1.innerText = "";
            // create elements of option and keep appending as a child 
            let indx = 0;
            data["data"].forEach(function (element) {
                let option = document.createElement('div');
                option.setAttribute('class', "option");
                let input = document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', 'pid1');
                input.setAttribute('id', `item1${indx}`);
                input.setAttribute('value', element['id']);
                if (indx == 0) {
                    input.checked = true;
                }
                let label = document.createElement('label');
                label.setAttribute('for', `item1${indx}`);
                label.innerText = `${element['name']}(${element['country']})`;
                indx++;
                option.appendChild(input);
                option.appendChild(label);
                playersuggestioncompare1.append(option);
            })
            let btn = document.createElement('button');
            btn.setAttribute('id', 'choosebtn1');
            btn.innerText = 'SUBMIT';
            console.log(playersuggestioncompare1);
            let nl = document.createElement('br');
            playersuggestioncompare1.appendChild(nl);
            playersuggestioncompare1.appendChild(btn);
            pf1.classList.remove("hidden");
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                console.log("form submitted");
                let a = document.querySelectorAll('input');
                a.forEach(function (element) {
                    if (element.getAttribute('type') == 'radio' && element.checked == true) {
                        pid1 = element.value;
                        console.log(pid1);
                    }
                })
            });
        }
    })

})

form2.addEventListener('submit', (event) => {
    event.preventDefault();
    let keyword = document.getElementById("searchbox_compare_2").value;
    let url = "https://api.cricapi.com/v1/players?apikey=d541df37-060f-4378-b7c1-9d952154cbce&offset=0&search=";
    console.log(keyword);
    for (let i = 0; i < keyword.length; i++) {
        if (keyword[i] == ' ') {
            url += "%20";
        }
        else {
            url += keyword[i];
        }
    }
    console.log(url);
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        if (data["data"].length == 0) {
            // show could'nt find the player
            nf2.classList.remove("hidden");
            pf2.classList.add("hidden");
        }
        else if (data["data"].length == 1) {
            nf2.classList.add("hidden");
            pf2.classList.add("hidden");
            pid2 = data["data"][0]['id'];
            console.log(pid2);
        }
        else {
            // multiple so make form and populate the dom
            let playersuggestioncompare2 = document.querySelector("#playersuggestioncompare2");
            playersuggestioncompare2.innerText = "";
            // create elements of option and keep appending as a child
            nf2.classList.add("hidden");
            pf2.classList.add("hidden");
            let indx = 0;
            data["data"].forEach(function (element) {
                let option = document.createElement('div');
                option.setAttribute('class', "option");
                let input = document.createElement('input');
                input.setAttribute('type', 'radio');
                input.setAttribute('name', 'pid2');
                input.setAttribute('id', `item2${indx}`);
                input.setAttribute('value', element['id']);
                if (indx == 0) {
                    input.checked = true;
                }
                let label = document.createElement('label');
                label.setAttribute('for', `item2${indx}`);
                label.innerText = `${element['name']}(${element['country']})`;
                indx++;
                option.appendChild(input);
                option.appendChild(label);
                playersuggestioncompare2.append(option);
            })
            let btn = document.createElement('button');
            btn.setAttribute('id', 'choosebtn2');
            btn.innerText = 'SUBMIT';
            console.log(playersuggestioncompare2);
            let nl = document.createElement('br');
            playersuggestioncompare2.appendChild(nl);
            playersuggestioncompare2.appendChild(btn);

            pf2.classList.remove("hidden");

            btn.addEventListener('click', function (event) {
                event.preventDefault();
                console.log("form submitted");
                let a = document.querySelectorAll('input');
                a.forEach(function (element) {
                    if (element.getAttribute('type') == 'radio' && element.checked == true) {
                        pid2 = element.value;
                        console.log(pid2);
                    }
                })
            });
        }
    })
})

let compare = document.querySelector('.startcompare');
compare.addEventListener('click', function () {
    
    if (pid1 == 0 && pid2 == 0) {

    }
    else if (pid1 == 0) {

    }
    else if (pid2 == 0) {

    }
    else {
        // draw graphs 
        document.querySelector(".main-content").classList.add("hidden");
        let p1=null, p2= null;
        fetch(`https://api.cricapi.com/v1/players_info?apikey=d541df37-060f-4378-b7c1-9d952154cbce&offset=0&id=${pid1}`).then((response)=>{
            return response.json();
        }).then((data)=>{
            p1= data;
        });

        fetch(`https://api.cricapi.com/v1/players_info?apikey=d541df37-060f-4378-b7c1-9d952154cbce&offset=0&id=${pid2}`).then((response)=>{
            return response.json();
        }).then((data)=>{
            p2= data;
            // now yaha par call a function that will build all the graphs
            populate(p1, p2);
        });

    }
});

let mapp = {
    'test' : 0, 
    'odi'  :1,
    't20i' : 2, 
    'ipl' : 3
}

function populate(p1, p2) {
    console.log(p1, p2);
    // p1['data']['stats'] and p2['data']['stats'] pr traverse krke do array banao 
    // of values of p1 and p2 then accodingly taregt the div with id and 
    let batting = ["m", "runs", "avg", "sr", "100s", "50s"];
    let bowling = ["m", "wkts", "avg", "sr", "econ", "5w", "10w"];
    let p1_bat = {
        'm' : [0, 0, 0, 0], 
        'runs' : [0, 0, 0, 0], 
        'avg' : [0, 0, 0, 0], 
        'sr': [0, 0, 0, 0], 
        '100s' : [0, 0, 0, 0], 
        '50s' : [0, 0, 0, 0]
    };
    
    let p2_bat = {
        'm' : [0, 0, 0, 0], 
        'runs' : [0, 0, 0, 0], 
        'avg' : [0, 0, 0, 0], 
        'sr': [0, 0, 0, 0], 
        '100s' : [0, 0, 0, 0], 
        '50s' : [0, 0, 0, 0]
    };

    let required = new Map();
    required['m']=1, required['runs']=1, required['avg']=1, required['sr']=1, required['100s']=1, required['50s']=1;

    // populate p1_bat first 
    p1['data']['stats'].forEach((element) =>{
        if(element['fn'] == 'batting' && required[element['stat']]==true){
            let indx = mapp[element['matchtype']];
            p1_bat[element['stat']][indx] = element['value'];
        }
    })
    
    
    p2['data']['stats'].forEach((element) =>{
        if(element['fn'] == 'batting' && required[element['stat']]==true){
            let indx = mapp[element['matchtype']];
            p2_bat[element['stat']][indx] = element['value'];
        }
    })
    
    // console.log(p1_bat, p2_bat)
    required['runs']=0, required['100s']=0, required['50s']=0, required['econ']=1, required['wkts']=1, required['5w']=1, required['10w']=1;

    let p1_bowl = {
        'm' : [0, 0, 0, 0], 
        'wkts' : [0, 0, 0, 0], 
        'avg' : [0, 0, 0, 0], 
        'sr': [0, 0, 0, 0], 
        'econ' : [0, 0, 0, 0], 
        '5w' : [0, 0, 0, 0], 
        '10w' : [0, 0, 0, 0]
    };
    let p2_bowl = {
        'm' : [0, 0, 0, 0], 
        'wkts' : [0, 0, 0, 0], 
        'avg' : [0, 0, 0, 0], 
        'sr': [0, 0, 0, 0], 
        'econ' : [0, 0, 0, 0], 
        '5w' : [0, 0, 0, 0], 
        '10w' : [0, 0, 0, 0]
    };
    p1['data']['stats'].forEach((element) =>{
        if(element['fn'] == 'bowling' && required[element['stat']]==true && element['value']!='-'){
            let indx = mapp[element['matchtype']];
            p1_bowl[element['stat']][indx] = element['value'];
        }
    })

    p2['data']['stats'].forEach((element) =>{
        if(element['fn'] == 'bowling' && required[element['stat']]==true && element['value']!='-'){
            let indx = mapp[element['matchtype']];
            p2_bowl[element['stat']][indx] = element['value'];
        }
    })

    // console.log(p1_bowl, p2_bowl);
    // console.log(p1_bat, p2_bat);
    // now repeatedly call the build graph function and put them in the appropriate class in the dom 
    
    for(key in p1_bat) {
        drawChart(p1_bat, p2_bat, true, key, p1['data']['name'], p2['data']['name']);
    }
    for(key in p1_bowl) {
        drawChart(p1_bowl, p2_bowl, false, key, p1['data']['name'], p2['data']['name']);
    }
    document.querySelector(".main-content").classList.remove("hidden");
}

let TITLE = {
    'm' : 'MATCHES PLAYED', 
    'runs' : 'RUNS SCORED', 
    'avg' : 'AVERAGE', 
    'sr' : 'STRIKE RATE', 
    '100s' : 'CENTURIES', 
    '50s' : 'HALF CENTURIES', 
    'econ' : 'ECONOMY RATE', 
    'wkts' : 'WICKETS TAKEN', 
    '5w' : '5 WICKET HAULS', 
    '10w' : '10 WICKETS HAULS'
};

google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(drawChart); 

function drawChart(p1_data, p2_data, is_bat, stat, p1, p2) {
    if(p1_data == undefined || p2_data==undefined) {
        return;
    }
    
    console.log(p1_data, p2_data);
    // console.log(is_bat);
    // console.log(stat);
    
    var data = google.visualization.arrayToDataTable([
        ['Format', p1, p2],
        ['TEST', parseFloat(p1_data[stat][0]), parseFloat(p2_data[stat][0])],
        ['ODI',  parseFloat(p1_data[stat][1]), parseFloat(p2_data[stat][1])],
        ['T20I', parseFloat(p1_data[stat][2]), parseFloat(p2_data[stat][2])],
        ['IPL',  parseFloat(p1_data[stat][3]), parseFloat(p2_data[stat][3])]
    ]);
    if(stat=='runs'){

        var formatTooltip = new google.visualization.NumberFormat({
            pattern : '#,##0'
        });
        formatTooltip.format(data, 1);
        formatTooltip.format(data, 2);
        var formatShort = new google.visualization.NumberFormat({
            pattern : 'short'
        });
    
        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1, {
                calc : function (dt, row) {
                  return formatShort.formatValue(dt.getValue(row, 1));
                },
                type : "string",
                role : "annotation"
            },
            2, {
                calc : function (dt, row) {
                  return formatShort.formatValue(dt.getValue(row, 2));
                },
                type : "string",
                role : "annotation"
            },
        ]);
    }
    var options = {
        chart: {
            title: TITLE[stat],
            subtitle: is_bat ?  'BATTING COMPARISON' : 'BOWLING COMPARISON'
        },
        bars: 'vertical',
        height: 400,
        width: 400,
        colors: is_bat ?  ['#3cd070', '#4166f5'] : ['#20B2AA','#1F75FE']
    };
    let id = is_bat ? 'battingchart_div' : 'bowlingchart_div';
    id+= stat;
    var chart = new google.charts.Bar(document.getElementById(id));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}


