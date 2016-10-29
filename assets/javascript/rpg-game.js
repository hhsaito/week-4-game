$( document ).ready(function() {

// Intial variables. Players attack and health points.

var obiWan  = { playername: 'Obi-Wan Kenobi', healthPoints: 120, attackPower: 8 },
    luke    = { playername: 'Luke Skywalker', healthPoints: 100, attackPower: 5 }, 
    sidious = { playername: 'Darth Sidious', healthPoints: 150, attackPower: 7 },
    maul    = { playername: 'Darth Maul', healthPoints: 180, attackPower: 25 };
var attacker, 
    defender,
    origvalue;
	
// On initial click the player is chosen and all others move below.
$('#initial-players div').on('click', function() {

	var clickedBtnID = $(this).attr('id');
	var clicked = $(this);
	var parentId = $(this).parent();

   	$('#attack-player').append(clicked);

   	$('#enemies').append(parentId);

   	switch (clickedBtnID) {
    case 'obi-wan':
        attacker = obiWan;
        break;
    case 'luke-sky':
        attacker = luke;
        break;
    case 'darth-sid':
        attacker = sidious;
        break;
    case 'darth-maul':
    	attacker = maul;
	}

	//set base value of attack power
	origvalue = attacker.attackPower;

	// unbind initial click
	$('#initial-players div').off('click');
});
	

// Click enemy to engage. Chosen enemy moves to defender area.

$('#enemies').on('click', '.rpg-player', function() {

	var clickedBtnID = $(this).attr('id');
	var clicked = $(this);
	var parentId = $(this).parent();

   	$('#defender').append(clicked);

   	switch (clickedBtnID) {
    case 'obi-wan':
        defender = obiWan;
        break;
    case 'luke-sky':
        defender = luke;
        break;
    case 'darth-sid':
        defender = sidious;
        break;
    case 'darth-maul':
    	defender = maul;
	}

	$('#win-or-lose').empty();

});
// Attack enemy. Attack power increases by its base each click. Player's health points are reduced by oponents power until win or loss.
	$('#attack-button').on('click', attack);


	function attack() {		    

		if ( attacker == null || defender == null ) {
			$('#win-or-lose').append('<p>No enemy here.</p>');
		}
		else if ( attacker.healthPoints > 0 && defender.healthPoints > 0 ) {
			defender.healthPoints = defender.healthPoints - attacker.attackPower;
			attacker.healthPoints = attacker.healthPoints - defender.attackPower;

			$('#defender .rpg-player p').html('<p>'+defender.healthPoints+'</p>');
			$('#attack-player .rpg-player p').html('<p>'+attacker.healthPoints+'</p>');
			$('#win-or-lose').html('<p>You have attacked ' + defender.playername + ' for ' + attacker.attackPower + ' damaged</p><p>'+ defender.playername + ' has attacked you back with ' + defender.attackPower + ' damaged</p>');

			if ( $('#enemies #initial-players').is(':empty') && defender.healthPoints <= 0 ) {
				console.log('crap');
			}
			else if ( defender.healthPoints <= 0 ) {
				$('#win-or-lose').html('<p>You have defeated ' + defender.playername + ', you can choose to fight another enemy.</p>');
				$('#defender').empty();
			}
			else if ( attacker.healthPoints <= 0 ) {
				$('#win-or-lose').html('<p>You have been defeated! Game over!</p><button id="restart-button" onClick="window.location.reload()">Restart</button>');
			}

			attacker.attackPower += origvalue;

		}
		
	}

});
