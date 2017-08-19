// Initializing all the variables
var memory_elements = "A A B B C C D D E E F F G G H H".split(" ");
var rows = 4;
var dev = "";
var memory_buffer_obj = [];
var memory_buffer_val = [];
var all_elements = [];
var game_count = 0;
var game_time = 0;
var click_count = 0;
var flip_count = 0;
var right_count = 0;
// The two varialbes below being used to store memory buffer objects temporarily in functions Matched and HideBufferElements
var temp_memory_buffer_object1, temp_memory_buffer_object2;


// Checks if the block is already flipped
function UnflippedTile(block) {
    if (block.innerHTML === "" && memory_buffer_val.length < 2) {
        return 1;
    } else {
        return 0;
    }
}

// Returns game time since the game started
function GetGameTime() {
    return game_time;
}
// Increases game time by one every second , called through a setInterval function below
function IncrementGameTime() {
    game_time++;
    ShowTime();
}
// Increments valid moves game count to check if all the cards are up
function FlipIncrease() {
    flip_count += 2;
}
//Returns Flip count
function GetFlipCount() {
    return flip_count;
}
// Increments game time by one every second
setInterval(IncrementGameTime, 1000);
// Checks if card click is first of the two pairs
function First() {
    if (memory_buffer_val.length === 0) {
        return 1;
    } else {
        return 0;
    }
}
// Displays game time
function ShowTime() {
    $(".timer_val").html(GetGameTime());
}

// Updates move count and displays score
function ClickIncrease() {
    click_count += 1;
    if (click_count <= 10) {
        $(".score_star").html("⛥⛥⛥");
    } else if (click_count > 10 && click_count < 20) {
        $(".score_star").html("⛥⛥");
    } else if (click_count >= 20) {
        $(".score_star").html("⛥");
    }
    $(".moves_val").html(click_count);
}

// Checks if the clicked element is the second of the pair
function Second() {
    if (memory_buffer_val.length === 1) {
        return 1;
    } else {
        return 0;
    }
}
// Adds the clicked elements to pair-checking array
function AddToBuffer(data, val) {
    if (memory_buffer_val.length < 3) {
        memory_buffer_obj.push(data);
        memory_buffer_val.push(val);
    }
}
// Checks if pair checking array contains the same value
function Matched() {
    if (memory_buffer_val[0] === memory_buffer_val[1]) {
        temp_memory_buffer_object1 = memory_buffer_obj[0];
        temp_memory_buffer_object2 = memory_buffer_obj[1];
        temp_memory_buffer_object1.style.backgroundColor = "gold";
        temp_memory_buffer_object2.style.backgroundColor = "gold";
        setTimeout(() => {
            temp_memory_buffer_object1.style.backgroundColor = "#fcfefa";
            temp_memory_buffer_object2.style.backgroundColor = "#fcfefa";
        }, 333);
        return 1;
    } else {
        return 0;
    }
}
// Hides the pair-checking array elements
function HideBufferElements() {
    temp_memory_buffer_object1 = memory_buffer_obj[0];
    temp_memory_buffer_object2 = memory_buffer_obj[1];
    // Added a little animation while i was at it.
    temp_memory_buffer_object1.style.backgroundColor = "#ff7b7b";
    temp_memory_buffer_object2.style.backgroundColor = "#ff7b7b";
    setTimeout(() => {
        temp_memory_buffer_object1.innerHTML = "";
        temp_memory_buffer_object2.innerHTML = "";
        temp_memory_buffer_object1.style.backgroundColor = "#fcfefa";
        temp_memory_buffer_object2.style.backgroundColor = "#fcfefa";
    }, 333);
}
// Clears the pair-checking buffer
function ClearBuffer() {
    memory_buffer_obj = [];
    memory_buffer_val = [];
}
// Returns randomized the memory array
function Randomize(arr) {
    var temp, j, it;
    for (var i = 0; i < arr.length; i++) {
        j = Math.floor(Math.random() * arr.length);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
// Resets the game by clicking the reset button
function Reset_Click() {
    game_count = 0;
    click_count = 0;
    ClearBuffer();
    $(".moves_val").html(click_count);
    Reset();
}

// Sets up the game with random card locations everytime the page reloads or reset button is clicked
function Reset() {
    var arr = Randomize(memory_elements);
    var res = "";
    game_time = 0;
    flip_count = 0;
    click_count = 0;
    memory_elements_obj = [];
    memory_elements_obj_val = [];
    $(".moves_val").html(click_count);
    //$(".score_star").html("⛥⛥⛥");
    var loop_control = 1,
        x, y;
    // Adds the cards to the container  as divs
    for (var i = 1; i <= rows; i++) {

        for (var j = loop_control; j <= rows * i; j++) {
            res += '<div class="col-xs-3 jumbotron box" onclick="Flip(this,\'' + memory_elements[j - 1] + '\')"></div>'
            dev = dev.concat(" " + memory_elements[j - 1]);
        }
        // For development purposes only
        console.log(dev);
        dev = "";

        $(".iterator:eq(" + (i - 1) + ")").html(res);
        res = ""
        loop_control += rows;


    }
    console.log("\n - - - \n")
    // Checks if the game is running the first time
    if (game_count > 0) {
        alert("Well done mate!\nScore " + $(".score_star").html() + "\nTime : " + $(".timer_val").html() + " seconds!");
        $(".score_star").html("⛥⛥⛥");
    }
}
// Executes whenever user clicks on a card/game-div.
function Flip(obj, val) {
    if (UnflippedTile(obj)) {
        obj.innerHTML = "<span class='text'>" + val + "</span>";
        if (First()) {
            AddToBuffer(obj, val);
        } else if (Second()) {
            ClickIncrease()
            AddToBuffer(obj, val);
            if (Matched()) {
                //AddToMemory();
                ClearBuffer();
                FlipIncrease();
            } else {
                HideBufferElements();
                ClearBuffer();
            }
        }
        // Resets the game if all cards are up
        var count = GetFlipCount()
        if (count >= 16) {
            game_count += 1;
            setTimeout(Reset, 1000);
        }

    }
}


// Runs the app on startup
Reset();
