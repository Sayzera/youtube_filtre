$(function() {

    chrome.storage.sync.get(['total','limit'],function(data){
        $('#eskitotal').val(data.total)
    });
    $('#saveLimit').click(function(){
        var limit = $('#limit').val();

        if(limit){
            chrome.storage.sync.set({'limit':limit},function() {
                close();
            });;
        }
    });


    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0},function() {
            var notifOptions = {
                type:'basic',
                iconUrl: 'images/icon_16.png',
                title: 'totalReset',
                message: "Uh oh!1 looks like you've reached your limit!"
              }
              
              chrome.notifications.create('totalReset123'+1,notifOptions);
        });
    }); 
});