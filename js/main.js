/*--- Cache ---*/
$skill = $("#skill");
$list = $(".list > tbody");


/*--- Listeners ---*/
$("#submit").click(addSkill);
$skill.keydown(e => {
    if (e.keyCode == 13) addSkill();
});
$(".list > tbody").on("click", "button", removeSkill);


/*--- Functions ---*/

// Add a skill
function addSkill(){
    // Fetch input
    let skill = $skill.val();
    $skill.val(``);
    
    // Do nothing if empty input
    if (!skill.length) return;
    
    // Template new row
    let newRow = `<tr>
                    <td><button>X</button></td>
                    <td>${skill}</td>
                  </tr>`;

    // Append the string for the new row to the tbody element
    $list.append(newRow);

    save();
}

// Remove a skill
function removeSkill() {
    let row = $(this).closest("tr");
    row.fadeOut(500, () => {
        row.remove();
        save();
    });
}


/*--- Storage ---*/
let restore = localStorage.getItem("saved");

function save() {
    let margin = $list.children().length > 0 ? "-3vmin 0" : "0";
    $(".list").css("margin", margin);
    localStorage.setItem("saved", $list.html());
}

$(document).ready(() => {
    if (restore) $list.html(restore);
    save();
});