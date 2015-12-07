$(document).ready(function(){
	$('.typeahead').typeahead({
	  minLength: 1,
	  highlight: true
	},
	{
	  name: 'my-dataset',
	  source: substringMatcher(areas)
	});
	$( "#address" ).change(function() {
    	$("#tweetContent").append(" Area:").append($("#areaVal").val());
    	$("#tweetContent").append(" Address:").append($("#address").val());
	});
	$( "#skills" ).change(function() {
    	$("#tweetContent").append(" Area:").append($("#areaVal").val());
    	$("#tweetContent").append(" Skills:").append($("#skills").val());
	});
	$( "#helpType" ).change(function() {
    	$("#tweetContent").append(" Area:").append($("#areaVal").val());
    	$("#tweetContent").append(" ").append($("#helpType").val()).append(":");
	});
	$( "#requireOffer" ).change(function() {
    	$("#tweetContent").append(" ").append($("#requireOffer").val());
	});
	
	$( "#phone" ).change(function() {
		$("#tweetContent").append(" Phone:").append($("#phone").val());
	});
});

var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;
	    matches = [];
	    substrRegex = new RegExp(q, 'i');
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push(str);
	      }
	    });
	    cb(matches);
	  };
	};

var areas = ["Adambakkam", "Adyar", "Alandur", "Alwarpet", "Alwarthirunagar", "Ambattur", "Aminjikarai", "Anakaputhur", "Anna Nagar", "Annanur", "Arumbakkam", "Ashok Nagar", "Avadi", "Ayanavaram", "Besant Nagar", "Basin Bridge", "Chepauk", "Chetput", "Chintadripet", "Chitlapakkam", "Choolai", "Choolaimedu", "Chrompet", "Egmore", "Ekkaduthangal", "Ennore", "Foreshore Estate", "Fort St. George", "George Town", "Gopalapuram", "Government Estate", "Guindy", "Guduvanchery", "IIT Madras", "Injambakkam", "ICF", "Iyyapanthangal", "Jafferkhanpet", "Karapakkam", "Kattivakkam", "Kazhipattur", "K.K. Nagar", "Keelkattalai", "Kelambakkam", "Kilpauk", "Kodambakkam", "Kodungaiyur", "Kolathur", "Korattur", "Korukkupet", "Kottivakkam", "Kotturpuram", "Kottur", "Kovalam", "Kovilambakkam", "Koyambedu", "Kundrathur", "Madhavaram", "Madhavaram Milk Colony", "Madipakkam", "Madambakkam", "Maduravoyal", "Manali", "Manali New Town", "Manapakkam", "Mandaveli", "Mangadu", "Mannadi", "Mathur", "Medavakkam", "Meenambakkam", "Minjur", "Mogappair", "MKB Nagar", "Mount Road", "Moolakadai", "Moulivakkam", "Mugalivakkam", "Mylapore", "Nandanam", "Nanganallur", "Navalur", "Neelankarai", "Nemilichery", "Nesapakkam", "Nolambur", "Noombal", "Nungambakkam", "Ottery", "Padi", "Pakkam", "Palavakkam", "Pallavaram", "Pallikaranai", "Pammal", "Park Town", "Parry's Corner", "Pattabiram", "Pattaravakkam", "Pazhavanthangal", "Peerkankaranai", "Perambur", "Peravallur", "Perumbakkam", "Perungalathur", "Perungudi", "Pozhichalur", "Poonamallee", "Porur", "Pudupet", "Purasaiwalkam", "Puthagaram", "Puzhal", "Puzhuthivakkam", "Raj Bhavan", "Ramavaram", "Red Hills", "Royapettah", "Royapuram", "Saidapet", "Saligramam", "Santhome", "Selaiyur", "Shenoy Nagar", "Sholavaram", "Sholinganallur", "Sithalapakkam", "Sowcarpet", "St.Thomas Mount", "Tambaram", "Teynampet", "Tharamani", "T. Nagar", "Thirumangalam", "Thirumullaivoyal", "Thiruneermalai", "Thiruninravur", "Thiruvanmiyur", "Tiruverkadu", "Thiruvotriyur", "Tirusulam", "Tiruvallikeni", "Tondiarpet", "United India Colony", "Urapakkam", "Vandalur", "Vadapalani", "Valasaravakkam", "Vallalar Nagar", "Vanagaram", "Velachery", "Veppampattu", "Villivakkam", "Virugambakkam", "Vyasarpadi", "Washermanpet", "West Mambalam"];