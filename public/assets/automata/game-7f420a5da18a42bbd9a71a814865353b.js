function validateGame(e){for(var t=document.getElementById(e+"columns").value,n=document.getElementById(e+"rows").value,a=document.getElementsByName(e+"turn"),u=[t,n],r=["number of columns","number of rows"],l=0;l<u.length;l++)if(null==u[l]||""==u[l])return alert("Game must specify "+r[l]),!1;return t=parseInt(t),n=parseInt(n),0!=t%2?(alert("Must have an even number of columns."),!1):10>t||t>30?(alert("Must have between 10 and 30 columns."),!1):10>n||n>30?(alert("Must have between 10 and 30 rows."),!1):a[0].checked||a[1].checked?!0:(alert("Please pick whether you want to go first or second."),!1)}function validate_create(){var e="newgame_",t=document.getElementById(e+"columns").value,n=document.getElementById(e+"rows").value,a=document.getElementsByName(e+"turn"),u=validateGame(e);return u?(turn_clicked=a[0].checked?0:1,console.log("turn ",turn_clicked),create_game(t,n,turn_clicked),!1):!1}