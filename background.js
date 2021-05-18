$(function () {

    setInterval(function(){
        hideChannel();
    },2000);

  function hideChannel() {
    chrome.storage.sync.get(["channels",'mod'], function (data) {
      if(data.mod == 1) {
        $("ytd-rich-item-renderer").each(function () {
            let channelName = $($(this).find("a")[3]).text();
    
            if (data.channels.indexOf(channelName) < 0) {
              $(this).css("display", "none");
            }
          });
      } else if(data.mod == 0) {
          //  $(this).css("display", "");
           
      }

      console.log(data);
    });
  }

});
