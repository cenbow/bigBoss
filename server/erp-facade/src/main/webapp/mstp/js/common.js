/**
 * Created by Junyi on 2016/9/9.
 */
var accountId = JSON.parse(localStorage.getItem("accountId"));
var userName = "", roleName = "";
function loadHead() {
    var login = JSON.parse(localStorage.getItem("login"));
    var roleId = JSON.parse(localStorage.getItem("roleId"));
    if (!login || !roleId) {
        window.location.replace(FACADE_URL + '/login.html');
    }

    if (!userName || !roleName) {
        if (roleId == 1) {
            roleName = "超级管理员"
        } else if (roleId == 2) {
            roleName = "普通管理员"
        } else {
            roleName = "普通用户"
        }
        $.ajax({
            url: FACADE_URL + '/account/view/' + accountId,
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    var account = response.data;
                    userName = account.userName;
                    addAccountHtml(roleName, userName)
                } else {
                    alert('网络异常!');
                }

            },
            error: function (err) {
                alert('网络异常!');
            }
        })
    } else {
        addAccountHtml(roleName, userName)
    }


    if (roleId != 1) {
        $("#headAction").html(' <div onclick="publish()"><img src="../images/publish.png" style="width: 20px;height: 20px;"> </div>')
    }
    else {
        $("#headAction").html(' <div onclick="changeHoutai()"><img src="../images/change.png" style="width: 20px;height: 20px;"> </div>')
    }

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
                        if (item.levelOne) {
                            temp.push(item.levelOne);
                            $('#infoDisclosure').append('<li><a onclick="showInfoDisclosure(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
                        }

                    })
                }
                indexSection(data);
            } else {
                alert(response.error.message);
                if (response.error.message == 'session过期，请重新登录!') {
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

                        if (item.levelOne) {
                            temp.push(item.levelOne);
                            $('#infoStudy').append('<li><a onclick="showInfoStudy(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
                        }

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

    //市场资讯
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
                        if (item.levelOne) {
                            temp.push(item.levelOne);
                            $('#infoMarket').append('<li><a onclick="showInfoMarket(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
                        }
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
                        if (item.levelOne) {
                            temp.push(item.levelOne);
                            $('#infoNotice').append('<li><a onclick="showInfoNotice(' + item.levelOne + ')" >' + item.levelOneName + '</a></li>')
                        }
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
function addAccountHtml(roleName, userName) {
    $('#account').html('<span style="color: red"> ' + roleName + '：' + userName + '</span>');
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
        if (data && data.length > 4) {
            var index = 0;
            for (var i = 0; i < data.length; i++) {
                if (index < 5) {
                    if (data[i].status == 1) {
                        addSection(data[i]);
                        index++;
                    }
                } else {
                    return;
                }
            }
        } else if (data && data.length != 0) {
            $.each(data, function (i, item) {
                if (item.status == 1) {
                    addSection(item);
                }
            })
        }
    }
}

function addSection(item) {
    var strWithOutCompany = '<p class="f-text" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' +
        '<a href="#" onclick="goToDetail(this)" data-rel="' + item.id + '">' + item.name + ' </a></p>';
    var str = '<p class="f-text" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' +
        '<a href="#" onclick="goToDetail(this)" data-rel="' + item.id + '">' + '[' + item.companyName + ']&nbsp;' + item.name + ' </a></p>';
    if (item.columnId == 1) {
        $('#about').append(str)
    } else if (item.columnId == 2) {
        $('#study').append(strWithOutCompany)
    } else if (item.columnId == 3) {
        $('#market').append(strWithOutCompany)
    } else if (item.columnId == 4) {
        $('#notice').append(strWithOutCompany)
    }
}

function goToDetail(el) {
    var id = $(el).attr('data-rel');
    var infoDisclosure = JSON.parse(localStorage.getItem("infoDisclosure"));
    var infoStudy = JSON.parse(localStorage.getItem("infoStudy"));
    var infoMarket = JSON.parse(localStorage.getItem("infoMarket"));
    var infoNotice = JSON.parse(localStorage.getItem("infoNotice"));
    if (id && id != NaN) {
        if (infoDisclosure && infoDisclosure.length > 0) {
            $.each(infoDisclosure, function (i, item) {
                if (id == item.id) {
                    localStorage.setItem("infoDetail", JSON.stringify(item));
                    window.location.href = 'informationDetail.html';
                    return false;
                }
            })
        }
        if (infoStudy && infoStudy.length > 0) {
            $.each(infoStudy, function (i, item) {
                if (id == item.id) {
                    localStorage.setItem("infoDetail", JSON.stringify(item));
                    window.location.href = 'informationDetail.html';
                    return false;
                }
            })
        }
        if (infoMarket && infoMarket.length > 0) {
            $.each(infoMarket, function (i, item) {
                if (id == item.id) {
                    localStorage.setItem("infoDetail", JSON.stringify(item));
                    window.location.href = 'informationDetail.html';
                    return false;
                }
            })
        }
        if (infoNotice && infoNotice.length > 0) {
            $.each(infoNotice, function (i, item) {
                if (id == item.id) {
                    localStorage.setItem("infoDetail", JSON.stringify(item));
                    window.location.href = 'informationDetail.html';
                    return false;
                }
            })
        }
    }
}

function logout() {
    if (confirm("确认要退出登陆吗?")) {
        localStorage.setItem("login", false);
        localStorage.setItem("accountId", null);
        localStorage.setItem("roleId", null);
        window.location.replace(FACADE_URL + '/login.html');
    }
}

function gotoAccount() {
    window.location.href = 'account.html';
}

function changeHoutai() {
    window.location.href = FACADE_URL + '/index.html'
}

function publish() {
    window.location.href = 'publish.html';
}

function showPage(id) {
    localStorage.setItem("infoLevelOne", JSON.stringify(0));
    var target = "";
    if (id == 1) {
        target = 'about.html';
    } else if (id == 2) {
        target = 'study.html';
    } else if (id == 3) {
        target = 'market.html';
    } else if (id == 4) {
        target = 'notice.html';
    }
    window.location.href = target;
}

