/**
 * Created by Junyi on 2016/9/9.
 */

function loadHead() {
  var accountId = JSON.parse(localStorage.getItem("accountId"));
  $.ajax({
    url: FACADE_URL + '/account/view/' + accountId,
    type: 'GET',
    success: function (response) {
      if (response.success) {
        var account = response.data;
        $('#account').html('<span style="color: red">' + account.userName + '</span>');

      } else {
        alert('网络异常!');
      }

    },
    error: function (err) {
      alert('网络异常!');
    }
  })
  //信息披露
  $.ajax({
    url: FACADE_URL + '/information/filter',
    data: {
      code: '0001'
    },
    type: 'POST',
    success: function (response) {
      if (response.success) {
        var data = response.data.pageData;
        localStorage.setItem("infoDisclosure", JSON.stringify(data));
        var temp = [];
        $('#infoDisclosure').html("")
        if (data && data.length > 0) {
          $.each(data, function (i, item) {
            if (temp.indexOf(item.levelOne) > -1) {
              return;
            }
            temp.push(item.levelOne);
            $('#infoDisclosure').append('<li><a onclick="showInfoDisclosure(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
          })
        }
        indexSection(data);
      } else {
        alert(response.error.message);
        if(response.error.message == 'session过期，请重新登录!'){
          window.location.href = FACADE_URL + '/login.html';
        }
      }

    },
    error: function (err) {
      alert('网络异常!');
    }
  })

  //学习园地
  $.ajax({
    url: FACADE_URL + '/information/filter',
    data: {
      code: '0002'
    },
    type: 'POST',
    success: function (response) {
      if (response.success) {
        var data = response.data.pageData;
        localStorage.setItem("infoStudy", JSON.stringify(data));
        var temp = [];
        $('#infoStudy').html("");
        if (data && data.length > 0) {
          $.each(data, function (i, item) {
            if (temp.indexOf(item.levelOne) > -1) {
              return;
            }
            temp.push(item.levelOne);
            $('#infoStudy').append('<li><a onclick="showInfoStudy(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
          })
        }
      } else {
      }
      indexSection(data);

    },
    error: function (err) {
      alert('网络异常!');
    }
  })

  //市场咨询
  $.ajax({
    url: FACADE_URL + '/information/filter',
    data: {
      code: '0003'
    },
    type: 'POST',
    success: function (response) {
      if (response.success) {
        var data = response.data.pageData;
        localStorage.setItem("infoMarket", JSON.stringify(data));
        var temp = [];
        $('#infoMarket').html("");
        if (data && data.length > 0) {
          $.each(data, function (i, item) {
            if (temp.indexOf(item.levelOne) > -1) {
              return;
            }
            temp.push(item.levelOne);
            $('#infoMarket').append('<li><a onclick="showInfoMarket(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
          })
        }
        indexSection(data);
      } else {
      }
    },
    error: function (err) {
      alert('网络异常!');
    }
  })

  //通知公告
  $.ajax({
    url: FACADE_URL + '/information/filter',
    data: {
      code: '0004'
    },
    type: 'POST',
    success: function (response) {
      if (response.success) {
        var data = response.data.pageData;
        localStorage.setItem("infoNotice", JSON.stringify(data));
        var temp = [];
        $('#infoNotice').html("");
        if (data && data.length > 0) {
          $.each(data, function (i, item) {
            if (temp.indexOf(item.levelOne) > -1) {
              return;
            }
            temp.push(item.levelOne);
            $('#infoNotice').append('<li><a onclick="showInfoNotice(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
          })
        }
        indexSection(data);
      } else {

      }

    },
    error: function (err) {
      alert('网络异常!');
    }
  })
}

function showInfoDisclosure(levelOne) {
  localStorage.setItem("infoLevelOne", JSON.stringify(levelOne));
  window.location.href = 'about.html';
}

function showInfoStudy(levelOne) {
  localStorage.setItem("infoLevelOne", JSON.stringify(levelOne));
  window.location.href = 'study.html';
}

function showInfoMarket(levelOne) {
  localStorage.setItem("infoLevelOne", JSON.stringify(levelOne));
  window.location.href = 'market.html';
}

function showInfoNotice(levelOne) {
  localStorage.setItem("infoLevelOne", JSON.stringify(levelOne));
  window.location.href = 'notice.html';
}

function indexSection(data) {
  var isIndex = window.location.pathname.indexOf("index.html");
  if (isIndex == -1) {
    return;
  } else {
    if(data && data.length > 4){
      for(var i=0;i<4;i++){
        addSection(data[i]);
      }
    }else if(data && data.length!=0){
      $.each(data,function(i,item){
        addSection(item);
      })
    }
  }
}

function addSection(item){
  var str = '<p class="f-text" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' +
    '<a href="#" onclick="goToDetail(this)" data-rel="'+ item.id+'">'+ item.name +'</a></p>'
  if(item.columnId == 1){
    $('#about').append(str)
  }else if(item.columnId == 2){
    $('#study').append(str)
  }else if(item.columnId == 3){
    $('#market').append(str)
  }else if(item.columnId == 4){
    $('#notice').append(str)
  }
}

function goToDetail(el){
  var id = $(el).attr('data-rel');
  var infoDisclosure = JSON.parse(localStorage.getItem("infoDisclosure"));
  var infoStudy = JSON.parse(localStorage.getItem("infoStudy"));
  var infoMarket = JSON.parse(localStorage.getItem("infoMarket"));
  var infoNotice = JSON.parse(localStorage.getItem("infoNotice"));
  if(id && id!=NaN){
    if(infoDisclosure && infoDisclosure.length>0){
      $.each(infoDisclosure, function (i,item) {
        if(id == item.id){
          localStorage.setItem("infoDetail",JSON.stringify(item));
          window.location.href = 'informationDetail.html';
          return false;
        }
      })
    }
    if(infoStudy && infoStudy.length>0){
      $.each(infoStudy, function (i,item) {
        if(id == item.id){
          localStorage.setItem("infoDetail",JSON.stringify(item));
          window.location.href = 'informationDetail.html';
          return false;
        }
      })
    }
    if(infoMarket && infoMarket.length>0){
      $.each(infoMarket, function (i,item) {
        if(id == item.id){
          localStorage.setItem("infoDetail",JSON.stringify(item));
          window.location.href = 'informationDetail.html';
          return false;
        }
      })
    }
    if(infoNotice && infoNotice.length>0){
      $.each(infoNotice, function (i,item) {
        if(id == item.id){
          localStorage.setItem("infoDetail",JSON.stringify(item));
          window.location.href = 'informationDetail.html';
          return false;
        }
      })
    }
  }
}

function logout() {
  if(confirm("确认要退出登陆吗?")){
    localStorage.setItem("login", false);
    localStorage.setItem("accountId", null);
    localStorage.setItem("roleId", null);
    window.location.replace(FACADE_URL + '/login.html');
  }
}