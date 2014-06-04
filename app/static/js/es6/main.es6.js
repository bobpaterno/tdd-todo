(function(){

  'use strict';
  $(document).ready(init);

  function init() {
    $('.login').click(login);
  }

  function login(e) {
    alert('he');
    e.preventDefault();
  }
})();
