$(function () {


  chrome.storage.sync.set({'mod': '0'});

  showChannels('channels','eklenen-kanallar');
  
  $("#channel-btn").click(function () {
    let channel_name = $("#channel-text").val();

    // kanal ekle 
    addChannelToFirebase('channels',channel_name);
    // eklenen kanalı göster
    showChannels('channels','eklenen-kanallar');
    $("#channel-text").val("");
    // inputu temizle
  });

  function addChannelToFirebase(tableName,channelName) {
    var docData = {
      channelName:channelName,
    };

    db.collection(tableName)
      .add(docData)
      .then((data) => {
        bildirim(data.id, channelName+' başarıyla eklendi');
      });
  }


  function bildirim(id,message) {
    var notifOptions = {
      type:'basic',
      iconUrl: 'images/icon_16.png',
      title: 'Sezer Bölük',
      message: message
    }
    chrome.notifications.create(id,notifOptions);
  }


  function showChannels(channelName,targetTable) {
    let temp = '';
    let counter =0;
    let tempChannel = [];
    db.collection(channelName)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temp += `
            <tr>
                <td>${++counter}</td>
                <td>${doc.data().channelName}</td>
                <td><button class="btn btn-danger btn-sml delete-channel" channel-name="${doc.data().channelName}" channel-id="${doc.id}">delete</button></td>
            </tr>
          `
          tempChannel.push(doc.data().channelName);
        });
        
    
      
        $('#'+targetTable).html(temp);
        addChannelToChromeStorage(tempChannel);
    })
    .catch((error) => {

    });

    // chromeStrogeye ekle 


  }


  $(document).on("click",".delete-channel",function() {
        let channel_id = $(this).attr('channel-id');
        let channel_name = $(this).attr('channel-name');


        deleteChannelInFirebase('channels',channel_id,channel_name);
});


async function deleteChannelInFirebase(tableName,id,channel_name) {
  await  db.collection(tableName)
    .doc(id)
    .delete()
    .then(() => {
      bildirim(id+'1',
      channel_name+ ' Başarıyla silindi');
    })
    .catch((error) => {
      bildirim(id+'1',
      channel_name+ ' Silinirken bir hata ile karşılaşıldı');
    });

    showChannels('channels','eklenen-kanallar');
     
}


function addChannelToChromeStorage(channels = []) {
  chrome.storage.sync.set({'channels': channels});
}


$('#mod-input').click(function(){
      if($('#mod-input').is(':checked')) {
        $('#mod-text').text('Geliştirici modu aktif');
        chrome.storage.sync.set({'mod': '1'});
      } else {
        chrome.storage.sync.set({'mod': '0'});
          $('#mod-text').text('Boş beleş mod aktif');
      }
});


});
