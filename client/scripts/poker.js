 var socket = io.connect('http://localhost:3001'),
  mycards = [];


  var ui = {
    loadCards : function(mycards){
      for (var i = 0, cardLen = mycards.length; i < cardLen; i++){
        $('#c' + i).removeClass('back hidden').addClass('x' + mycards[i].val + ' ' + mycards[i].suit + ' shown'); 
      }
      
    }
  }

  socket.on('newcard', function (data) {
    console.log('client has got from server ',data.card);
    mycards.push(data.card);
    ui.loadCards(mycards);
  });

  socket.on('tableStatus', function (data) { 
    console.log('client has got tablestatus from server ',data); 
  });

  document.getElementById('submitname').onclick = function() {
    socket.emit('setPlayerName', {
      name: document.getElementById('playername').value,
      id: socket.socket.sessionid
    });
  }

  document.getElementById('deal').onclick = function() {
    console.log('about to emit dealcards');
    socket.emit('dealcards');
  }

  document.getElementById('reset').onclick = function() {
    console.log('about to reset Table');
    socket.emit('resetTable');
  }
  
  document.getElementById('bet').onclick = function() {
    console.log('about to emit a bet')
    socket.emit('bet', {
      value: 50,
      id: socket.socket.sessionid
    });
  }