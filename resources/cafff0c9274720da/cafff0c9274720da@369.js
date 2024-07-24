import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# NBA Player Table`
)}

function _searchData(Inputs,filteredStats){return(
Inputs.search(filteredStats)
)}

function _3(dropdownButton,$0,$1,nbaTable,htl){return(
htl.html`<div class='content'>
  <div class='filter-panel'>
    <div>${dropdownButton("Select Teams...",$0)}</div>
    <div>${$1}</div>
    </div>
  <div class='main-panel'>${nbaTable()}
</div>

<style>
  .content {
    height:520px;
    width:100%;
  }

  .filter-panel, .main-panel {
    padding:10px 10px;
    width:100%;
  }

  .filter-panel {
    display:flex;
    justify-content:space-between;
  }

  .main-panel {
    background-color:white;
  }
</style>`
)}

function _4(htl){return(
htl.html`<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');

  body, button, table, label {
    font-family:Roboto Condensed!important;
  }

  form> label {
    font-weight:bold!important;
  }

  th {
    border-bottom:2px black solid!important;
    background-color:white!important;
    z-index:500;
    padding:5px 0px!important;
  }


 table tr td:nth-child(2) {
  border-right:2px black solid;
}

  td {
  vertical-align:middle;
  padding:0px!important;
  font-size:15px;
}

  .player {
  width:250px;
  height:50px;
  position:relative;
  display:flex;
}

.player-img-container {
  display:flex;
  width:80px;
  left:0px;
  position:absolute;
  overflow:hidden;
}

 .player-img-container img {
  height:50px;
}

table .player-main {
  display:flex;
  flex-direction:column;
  position:absolute;
  text-wrap:nowrap;
  overflow: hidden;
  height:100%;
  width:180px;
  left:60px;
  justify-content:center;
  padding-left:15px;
}

table .player-main-name {
  font-weight:bold;
  font-size:15px;
}


 .player-main-details {
  font-size:14px;
  color: rgb(80, 80, 80);
}


.player-team {
  display:flex;
  height:100%;
  position:absolute;
  left:140px;
  overflow:hidden;
}



.player-team img {
  width:130%;
  align-self:center;
  opacity:0.15;
  z-index:0;
}




</style>`
)}

function _selectedPositions(Inputs,positions){return(
Inputs.checkbox(positions, {label: "Position", value: positions})
)}

function _6(selectedTeams){return(
selectedTeams
)}

function _playerImage(nba_stats,htl){return(
function playerImage(name) {
  var data = nba_stats.filter(d => d.name === name);
  var player_image = data[0].player_image
  var pos = data[0].pos
  var team_abbr = data[0].team_abbr
  var team_logo = data[0].team_logo
  return htl.html`<div class="player">
    <div class="player-img-container">
        <img src=${player_image} class="player-image" />
    </div>
    <div class="player-main">
        <div class="player-main-name">${name}</div>
        <div class="player-main-details">${pos} • ${team_abbr} </div>
    </div>
    <div class="player-team">
        <img src=${team_logo} class="team-img" />
    </div>
</div>`
}
)}

function _nbaTable(Inputs,searchData,playerImage){return(
() => { return Inputs.table(searchData, { height:470,
  columns: ["name", "team_abbr","pos","g","fg","fga","fg_percent","pts"],
    header: {
      name: "PLAYER",
      team_abbr: "TEAM",
      pos: "POS",
      g: "GP",
      fg: "FGM",
      fga: "FGA",
      fg_percent: "FG %",
      pts: "PTS"
    },
    align: {
    pos:"center",
    team_abbr: "center"
  },
    width: {
      name: 230
    },
    format: {
    name: x => playerImage(x)
    }
                 })}
)}

function _9(md){return(
md`Data set with Basketball Teams.`
)}

function _base_url(){return(
"https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/"
)}

function _positions(nba_stats){return(
[...new Set(nba_stats.map(d => d.pos))].sort()
)}

function _teams(){return(
[{value: 'ATL', label:'Atlanta Hawks'},
 {value: 'DEN', label:'Denver Nuggets'},
 {value: 'BOS', label: 'Boston Celtics'},
 {value: 'LAC', label: 'LA Clippers'},
 {value: 'GSW', label: 'GS Warriors'},
 {value: 'LAL', label: 'LA Lakers'},
 {value: 'PHO', label: 'Phoenix Suns'},
         {value: 'OKC', label: 'OKC Thunder'},
 {value:'DAL', label: 'Dallas Mavericks'}]
)}

function _13(md){return(
md`Map data to create HTML labels for checkbox inputs.`
)}

function _teamFormat(teams,base_url){return(
teams.map(d => ({ value: d.value, label: "<img style='height:30px;padding-right:5px;vertical-align:middle;'src="+base_url+d.value+".png><span style='vertical-align:middle;'>"+d.label+"</span>"}))
)}

function _selectedTeams(checkbox,teamFormat){return(
checkbox({
  options: teamFormat,
  value: ["ATL", "LAC"],
  orientation: 'vertical'
})
)}

function _dropdownButton(htl){return(
function dropdownButton(buttonName, content) {

function toggleDropdown() {
    const dropdown = document.getElementById("dropdownContent");

    // Check the current display property
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block"; // Display the dropdown if it's hidden
        // Add an event listener to the document body to detect clicks
        document.body.addEventListener('click', closeDropdownOnClickOutside);
    } else {
        dropdown.style.display = "none"; // Hide the dropdown if it's displayed
        // Remove the event listener when the dropdown is hidden
        document.body.removeEventListener('click', closeDropdownOnClickOutside);
    }
}


function closeDropdownOnClickOutside(event) {
    const dropdown = document.getElementById("dropdownContent");
    const button = document.querySelector('.dropbtn');

    // Check if the click is outside the dropdown and button
    if (!dropdown.contains(event.target) && event.target !== button) {
        dropdown.style.display = "none"; // Hide the dropdown
        document.body.removeEventListener('click', closeDropdownOnClickOutside);
    }
}
  
  const dropdownButton = htl.html`
  <div class='dropdown'>
      <button onclick=${toggleDropdown} class="dropbtn" style='height:30px;width:200px;padding:4px 2px;background-color:white;border:1px #ccc solid;border-radius:2px;'>${buttonName}</button>
    <div class='dropdown-content' id='dropdownContent' style='position:absolute;z-index:2000;background-color:white;padding:5px 0px;display:none;width:200px;border-radius:2px;box-shadow:0 6px 12px rgba(0,0,0,.175);margin-top:5px;'>
        <div style='margin:10px 5px;' class='inner-content'>${content}</div>
    </div>
  </div>`

return dropdownButton}
)}

function _17(md){return(
md`Modified version of Jeremy Ashkenas's checkbox input.`
)}

function _checkbox(html,Event,input){return(
function checkbox(config = {}) {

  
  let {
    value: formValue,
    title,
    description,
    submit,
    orientation = "horizontal",
    disabled,
    options
  } = Array.isArray(config) ? { options: config } : config;
  options = options.map(o =>
    typeof o === "string" ? { value: o, label: o } : o
  );

  const buttons = html`<div class='action-buttons' style='padding:0px 2px;margin-bottom:12px;display:flex;justify-content:space-between;'>
    <button id="selectAllBtn" style='width:50%;border-radius:2px 0px 0px 2px;border:1px #ccc solid;border-right:none!important;height:25px;'>Select All</button>
    <button id="clearAllBtn" style='width:50%;border-radius:0px 2px 2px 0px;border:1px #ccc solid;height:25px;'>Clear All</button>
  </div>`;

 const selectAllBtn = buttons.querySelector('#selectAllBtn');
selectAllBtn.addEventListener('click', () => {
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = true;
  });
  updateFormValue(); 
});

const clearAllBtn = buttons.querySelector('#clearAllBtn');
clearAllBtn.addEventListener('click', () => {
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  updateFormValue(); 
});

const updateFormValue = () => {
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  const selectedValues = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  form.value = selectedValues;

  // Trigger the input event to signal the value change
  form.dispatchEvent(new Event('input', { bubbles: true }));
};


  
  const form = input({
    type: "checkbox",
    title,
    description,
    submit,
    getValue: input => {
      if (input.length)
        return Array.prototype.filter
          .call(input, i => i.checked)
          .map(i => i.value);
      return input.checked ? input.value : false;
    },
    form: html`
      <form>
        ${buttons}
        ${options.map(({ value, label }, i) => {
          const input = html`<input type=checkbox name=input ${
            (formValue || []).indexOf(value) > -1 ? "checked" : ""
          } style="vertical-align: top;" />`;
          input.setAttribute("value", value);
          if (disabled) input.setAttribute("disabled", disabled);
          const tag = html`<label style="display:${orientation === 'horizontal' ? `inline-block` : `block`};margin: 5px 10px 3px 0; font-size: 0.85em;">
           ${input}
           ${label}
          </label>`;
          return tag;
        })}
      </form>
    `
  });

  
  form.output.remove();
  
  return form;
}
)}

function _20(md){return(
md`Custom styling. Includes styling to create bold labels for selected checkbox values.`
)}

function _nba_stats(__query,FileAttachment,invalidation){return(
__query(FileAttachment("nba_full_stats.csv"),{from:{table:"nba_full_stats"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _filteredStats(nba_stats,selectedTeams,selectedPositions){return(
nba_stats.filter(d => selectedTeams.includes(d.team_abbr) & selectedPositions.includes(d.pos))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["nba_full_stats.csv", {url: new URL("./files/d5e8cffb480d7046be4c90c4a38cb6dcaca3d52afc144c045cbffc65ca719d6387228295e8f268c363dd48074a596dc5eaf6cdaf0b4236fc17fbf1fa636e73a8.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof searchData")).define("viewof searchData", ["Inputs","filteredStats"], _searchData);
  main.variable(observer("searchData")).define("searchData", ["Generators", "viewof searchData"], (G, _) => G.input(_));
  main.variable(observer()).define(["dropdownButton","viewof selectedTeams","viewof selectedPositions","nbaTable","htl"], _3);
  main.variable(observer()).define(["htl"], _4);
  main.variable(observer("viewof selectedPositions")).define("viewof selectedPositions", ["Inputs","positions"], _selectedPositions);
  main.variable(observer("selectedPositions")).define("selectedPositions", ["Generators", "viewof selectedPositions"], (G, _) => G.input(_));
  main.variable(observer()).define(["selectedTeams"], _6);
  main.variable(observer("playerImage")).define("playerImage", ["nba_stats","htl"], _playerImage);
  main.variable(observer("nbaTable")).define("nbaTable", ["Inputs","searchData","playerImage"], _nbaTable);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("base_url")).define("base_url", _base_url);
  main.variable(observer("positions")).define("positions", ["nba_stats"], _positions);
  main.variable(observer("teams")).define("teams", _teams);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("teamFormat")).define("teamFormat", ["teams","base_url"], _teamFormat);
  main.variable(observer("viewof selectedTeams")).define("viewof selectedTeams", ["checkbox","teamFormat"], _selectedTeams);
  main.variable(observer("selectedTeams")).define("selectedTeams", ["Generators", "viewof selectedTeams"], (G, _) => G.input(_));
  main.variable(observer("dropdownButton")).define("dropdownButton", ["htl"], _dropdownButton);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("checkbox")).define("checkbox", ["html","Event","input"], _checkbox);
  const child1 = runtime.module(define1);
  main.import("input", child1);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("nba_stats")).define("nba_stats", ["__query","FileAttachment","invalidation"], _nba_stats);
  main.variable(observer("filteredStats")).define("filteredStats", ["nba_stats","selectedTeams","selectedPositions"], _filteredStats);
  return main;
}
